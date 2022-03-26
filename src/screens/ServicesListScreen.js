import React, { useEffect, useState, useRef } from 'react';
import { RadioButton, Avatar, Button } from 'react-native-paper';

import { Text, Card, Title, Paragraph } from 'react-native-paper';
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
import { Icon } from 'native-base';


import RNUpiPayment from 'react-native-upi-payment';
import LottieView from 'lottie-react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { showMessage } from 'react-native-flash-message';


import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const userUID = auth().currentUser;
const { width, height } = Dimensions.get('window');

import ShowSuccessMsh from '../components/ShowSuccessMsg';

export default function ServicesListScreen({ route, navigation }) {
  const [checked, setChecked] = useState('first');
  const refRBSheet = useRef();

  const [data, setData] = useState([{ "id": "HEBMJAZw8Tt9UFhOgaQQ", "srUserId": "2PqGdTcVmjP5CKaklnibKByGd0q2", "srcatName": "Wheel", "srcreatedAt": 1647683645477, "sressentialService": "This is a car wheel service ", "srimages": "https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/product%2Ffront-view-male-mechanic-working.jpg?alt=media&token=03880ef1-e508-49c0-838f-09a54de6a99f", "srisDeleted": false, "srisDisplay": true, "srname": "Car wheel", "srpickUpType": "Free", "srprice": "2000", "srtmTaken": "0 Day,1 Hours,0 Minutes", "srwarnty": "4" }, { "id": "gw4eS030yfDrUdSsFfdJ", "srUserId": "2PqGdTcVmjP5CKaklnibKByGd0q2", "srcatName": "Wheel", "srcreatedAt": 1647684450462, "sressentialService": "Tyre condition & tyre depth Tyre pressure and adjust", "srimages": "https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/product%2Ffront-view-male-mechanic-working.jpg?alt=media&token=03880ef1-e508-49c0-838f-09a54de6a99f", "srisDeleted": false, "srisDisplay": true, "srname": "Car wheels ", "srpickUpType": "Paid", "srprice": "8000", "srtmTaken": "0 Day,0 Hours,0 Minutes", "srwarnty": "5" }]);
  const [visible, setVisible] = React.useState(false)
  const [modelView, setModelView] = useState([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  useEffect(() => {
    var chategory = route.params['chategory'];
    if (chategory == "All") {
      firestore()
        .collection('srServices')
        .onSnapshot(service => {
          setData(
            service.docs.map(values => ({ ...values.data(), ['id']: values.id })),
          );
        });
    } else {
      firestore()
        .collection('srServices')
        .where('srcatName', '==', chategory)
        .onSnapshot(service => {
          setData(
            service.docs.map(values => ({ ...values.data(), ['id']: values.id })),
          );
        });
    }
  }, []);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

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
        <View style={style.modalBackGround}>
          <Animated.View
            style={[style.modalContainer, { transform: [{ scale: scaleValue }] }]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Show SuccessMsg */}
      {/* Model */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ModalPoup visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <View style={style.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={require('../assets/lottie/x.png')}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image
              style={{
                height: 200,
                width: 200,
                resizeMode: 'contain',
                alignSelf: 'center'
              }}
              source={{ uri: modelView?.srimages }} />
            <View style={{
              marginHorizontal: 20,
              borderRadius: 10,
              padding: 10,
            }}>
              <View style={style.modelView}>
                <Text style={{ fontWeight: 'bold' }}>Name</Text>
                <Text>{modelView?.srname}</Text>
              </View>
              <View style={style.modelView}>
                <Text style={{ fontWeight: 'bold' }}>Price</Text>
                <Text>{modelView?.srprice}</Text>
              </View>
              <View style={style.modelView}>
                <Text style={{ fontWeight: 'bold' }}>Category</Text>
                <Text>{modelView?.srcatName}</Text>
              </View>
              <View style={style.modelView}>
                <Text style={{ fontWeight: 'bold' }}>Warnty</Text>
                <Text>{modelView?.srwarnty} Year</Text>
              </View>
              <View style={style.modelView}>
                <Text style={{ fontWeight: 'bold' }}>Pick Up Type</Text>
                <Text>{modelView?.srpickUpType} Year</Text>
              </View>
              <View style={style.modelView}>
                <Text style={{ fontWeight: 'bold' }}>Description:</Text>
              </View>
            </View>
            <Text style={{ marginLeft: 20 }}>{modelView?.sressentialService}</Text>
          </View>
        </ModalPoup>
      </View>
      {/* Header */}
      <View style={style.headerICON}>
        {/* Left Drawer */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          marginHorizontal: 2
        }} onPress={() => navigation.goBack()}>
          <Icon
            type="FontAwesome5"
            name="angle-left"
            style={{
              fontSize: 28,
              color: '#312f2f',
              marginHorizontal: 8,
            }}></Icon>
          <Text style={{
            fontSize: 20,
            alignSelf: 'center'
          }}>Back</Text>
        </TouchableOpacity>
        {/* Right User Profile LOGO */}
      </View>
      <ShowSuccessMsh setShowSuccessMsg={setShowSuccessMsg} showSuccessMsg={showSuccessMsg} />
      {data.length == 0
        ? (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            height: 500,
          }}>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'center', marginHorizontal: 10, fontSize: 20 }}>No Any Releated Services!</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#f4bf56',
              borderRadius: 10,
              padding: 10,
              marginVertical: 30,
            }} onPress={() => navigation.goBack()}>
              <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
                Find Other Services!
              </Text>
            </TouchableOpacity>

          </View>
        )
        : data.map(value => {
          return (
            <View style={[style.categoryCard, style.elevation]}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Image */}
                <View style={{ flex: 2, }}>
                  <Image style={{
                    flex: 1,
                    width: 150,
                    height: 150,
                    resizeMode: 'center',
                    borderRadius: 30
                  }} source={{ uri: value.srimages }} />
                </View>
                {/* Details */}
                <View style={{
                  flex: 2,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  padding: 10
                }}>
                  <View style={style.cardLabel}>
                    <Text style={{ fontWeight: 'bold' }}>Name</Text>
                    <Text>{value.srname}</Text>
                  </View>
                  <View style={style.cardLabel}>
                    <Text style={{ fontWeight: 'bold' }}>Price</Text>
                    <Text>{value.srprice}</Text>
                  </View>
                  <View style={style.cardLabel}>
                    <Text style={{ fontWeight: 'bold' }}>Pick Up Type</Text>
                    <Text>{value.srpickUpType}</Text>
                  </View>
                  <View style={style.cardLabel}>
                    <Text style={{ fontWeight: 'bold' }}>Warranty</Text>
                    <Text>{value.srwarnty} Year</Text>
                  </View>
                </View>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: 3,
              }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#f4bf56',
                    borderRadius: 10,
                    padding: 10,
                    width: 100,
                  }}
                  onPress={() => {
                    setModelView(value);
                    refRBSheet.current.open();
                  }}
                >
                  <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
                    Booked
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    width: 100,
                    borderWidth: 1,
                  }} onPress={() => {
                    setModelView(value);
                    setVisible(true)
                  }}>
                  <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
            flex: 3,
            marginHorizontal: 20,
            backgroundColor: '#d2e3eb',
            borderRadius: 10,
            padding: 10
          }}>
            <View style={[style.cardLabel, { marginVertical: 0 }]}>
              <Text style={{ fontWeight: 'bold' }}>Name</Text>
              <Text>{modelView.srname}</Text>
            </View>
            <View style={[style.cardLabel, { marginVertical: 0 }]}>
              <Text style={{ fontWeight: 'bold' }}>Price</Text>
              <Text>{modelView.srprice}</Text>
            </View>
            <View style={style.cardLabel}>
              <Text style={{ fontWeight: 'bold' }}>Pick Up Type</Text>
              <Text>{modelView.srpickUpType}</Text>
            </View>
            <View style={style.cardLabel}>
              <Text style={{ fontWeight: 'bold' }}>Warranty</Text>
              <Text>{modelView.srwarnty}</Text>
            </View>
            <View style={style.cardLabel}>
              <Text style={{ fontWeight: 'bold' }}>Time Taken</Text>
              <Text>{modelView.srtmTaken}</Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 35,
              marginHorizontal: 20,
            }}>
              <Text style={{ fontWeight: 'bold' }}>TOTAL PRICE</Text>
              <Text style={{ fontWeight: 'bold' }}>{modelView.srprice}</Text>
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
                          vpa: 'vishal7984@paytm', // or can be john@ybl or mobileNo@upi
                          payeeName: 'Vishal Gupta',
                          amount: modelView.srprice,
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
                            servicesUID: modelView.id,
                            srUserId: modelView.srUserId,
                            oruserUID: userUID.uid,
                            orcreatedAt: date.getTime(),
                            paymentMode: checked == "first" ? 'Cash On Delivery' : 'Net Payment',
                            orstatus: 'PANDING'
                          }).then(() => {
                            console.log('Serviced Booked')
                            refRBSheet.current.close();
                            setShowSuccessMsg(true);
                            firestore()
                              .collection('srBasicInfromation')
                              .doc(modelView.srUserId)
                              .onSnapshot(srUser => {

                                // fetch('http://2783-103-206-138-156.ngrok.io/send-noti', {
                                //   method: 'post',
                                //   headers: {
                                //     'Content-Type': 'application/json'
                                //   },
                                //   body: JSON.stringify({
                                //     token: srUser.data().deviceToken,
                                //   })
                                // })
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
    </ScrollView >
  );
}

const style = StyleSheet.create({
  headerICON: {
    flexDirection: 'row',
    margin: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: .5,
    paddingVertical: 4,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5
  },
  categoryCard: {
    marginHorizontal: 5,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
    flex: 1,
    alignItems: 'center',
    padding: 2,
  },
  elevation: {
    elevation: 2,
    shadowColor: '#52006A',
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
  modelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  }
});

