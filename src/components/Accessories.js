import React, { useEffect, useState, useRef } from 'react';
import { RadioButton, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';

import LottieView from 'lottie-react-native';
import { PIMARY_COLOR, URL } from '@env';
import { Linking, Platform } from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Dialog from 'react-native-dialog';
import { showMessage } from 'react-native-flash-message';


import { Text } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Icon, Label } from 'native-base';

const userUID = auth().currentUser;
const { width, height } = Dimensions.get('window');

export default function Accessories(garageUID) {
  const [checked, setChecked] = useState('first');
  const [cards, setCards] = useState([]);
  const [rnsheet, setRnsheet] = useState([]);
  const refRBSheet = useRef();
  const [garageToken, setGarageToken] = useState("");
  const [visible, setVisible] = React.useState(false)

  useEffect(() => {
    firestore()
      .collection('srAccessories')
      .where('srUserId', '==', garageUID['garageUID'])
      .onSnapshot(cardData => {
        setCards(cardData.docs.map((values) => ({ ...values.data(), ['id']: values.id })))
      });
  }, []);
  useEffect(() => {
    firestore()
      .collection('srBasicInfromation')
      .doc(garageUID['garageUID'])
      .onSnapshot(srUser => {
        setGarageToken(srUser.data().deviceToken);
      })
  }, []);

  // Model

  const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  return cards.map(value => {
    return (
      <>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ModalPoup visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require('../assets/lottie/x.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <LottieView
                style={{ height: 120, width: 120 }}
                source={require('../assets/lottie/93181-success.json')} autoPlay />
            </View>

            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
              Congratulations Orderd was successful
            </Text>
            <TouchableOpacity style={{
              alignSelf: 'center',
              backgroundColor: '#f4bf56',
              borderRadius: 20,
              padding: 10,
              marginRight: 10,
              width: '70%',
              alignItems: 'center'
            }} onPress={() => setVisible(false)}>
              <Text>
                Got It
              </Text>
            </TouchableOpacity>
          </ModalPoup>
        </View>

        <Card style={{ marginVertical: 4 }}>
          <Card.Content>
            <Title>{value.asname}</Title>
          </Card.Content>
          <Card.Cover source={{ uri: value.asimages }} />
          <Card.Actions>
            <TouchableOpacity
              style={styles.TouchableOpacityStyle}
              onPress={() => {
                setRnsheet(value);
                refRBSheet.current.open();
              }}>
              <Text
                style={{
                  fontStyle: 'italic',
                  textAlign: 'center',
                  fontSize: 20,
                }}>
                Booked
              </Text>
            </TouchableOpacity>
            <Button color="#e16e39">Price:{value.asprice}</Button>
            <Button color="#e16e39">Warnty:{value.aswarnty}Year</Button>
          </Card.Actions>
        </Card>
        <RBSheet
          height={height * 0.72}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              shadowColor: '#d8534f',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              elevation: 20,
            },
            draggableIcon: {
              backgroundColor: '#f4bf56',
              width: 100,
            },
          }}>
          <View style={{ marginVertical: 20, marginHorizontal: 10, flex: 1, }}>
            <View style={{
              flex: 2,
              marginHorizontal: 20,
              backgroundColor: '#d2e3eb',
              borderRadius: 10,
              padding: 10
            }}>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Name</Text>
                <Text>{rnsheet.asname}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Price</Text>
                <Text>{rnsheet.asprice}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Warranty</Text>
                <Text>{rnsheet.aswarnty}</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 35,
                marginHorizontal: 20,
              }}>
                <Text style={{ fontWeight: 'bold' }}>TOTAL PRICE</Text>
                <Text style={{ fontWeight: 'bold' }}>{rnsheet.asprice}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              marginHorizontal: 20,
              borderRadius: 10,
              padding: 10,
            }}>
              <TouchableOpacity style={{
                flexDirection: 'row',
              }} onPress={() => setChecked('first')}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                /><Text style={{ alignSelf: 'center', fontSize: 20 }}>Cash On Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setChecked('second')}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                /><Text style={{ alignSelf: 'center', fontSize: 20 }}>Net Payment</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f4bf56',
                  borderRadius: 10,
                  padding: 5,
                  marginRight: 10,
                  width: '90%'
                }}
                onPress={() => {
                  Alert.alert('Alert', 'Are You Sure To Booked', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK', onPress: () => {
                        if (checked == 'second') {
                          RNUpiPayment.initializePayment({
                            vpa: 'swainbibhuti362@okaxis', // or can be john@ybl or mobileNo@upi
                            payeeName: 'Bibhuti Swain',
                            amount: '1',
                            transactionRef: 'aasf-332-aoei-fn'
                          }, () => {

                          }, () => {
                            showMessage({
                              message: "Payment Denied",
                              description: "Please Try Again..",
                              type: "danger",
                              icon: "danger"
                            });
                            console.log('Payment Denied');
                          });
                        } else {
                          let date = new Date();
                          firestore()
                            .collection('orders')
                            .add({
                              servicesUID: rnsheet.id,
                              srUserId: rnsheet.srUserId,
                              oruserUID: userUID.uid,
                              orcreatedAt: date.getTime(),
                              paymentMode: checked == "first" ? 'Cash On Delivery' : 'Net Payment',
                              orstatus: 'PANDING'
                            }).then(() => {
                              console.log('Serviced Booked')
                              refRBSheet.current.close();
                              setVisible(true);
                              fetch('http://2783-103-206-138-156.ngrok.io/send-noti', {
                                method: 'post',
                                headers: {
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                  token: garageToken,
                                })
                              })
                            }).catch((error) => {
                              showMessage({
                                message: "Something Wents Wrong!",
                                description: "Please Try Again",
                                type: "info",
                                icon: "danger"
                              });
                              console.log(error);
                            })
                        }
                      }
                    },
                  ]);
                }}>
                <Text
                  style={{
                    fontStyle: 'italic',
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  Booked
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </>
    );
  });
}

const styles = StyleSheet.create({
  LabelStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    fontSize: 30,
  },
  labelStyle: {
    marginVertical: 10,
  },
  TouchableOpacityStyle: {
    backgroundColor: '#f4bf56',
    borderRadius: 10,
    padding: 5,
    width: 80,
    marginRight: 10,
  },
  cardLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: .5,
    paddingVertical: 4
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
