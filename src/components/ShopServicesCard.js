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
} from 'react-native';

import { PIMARY_COLOR } from '@env';
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

export default function ShopServicesCard(garageUID) {
  const [checked, setChecked] = useState('first');
  const [cards, setCards] = useState([]);
  const [rnsheet, setRnsheet] = useState([]);
  const refRBSheet = useRef();

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
  useEffect(() => {
    firestore()
      .collection('srServices')
      .where('srUserId', '==', garageUID['garageUID'])
      .onSnapshot(cardData => {
        setCards(cardData.docs.map((values) => ({ ...values.data(), ['id']: values.id })))
      });
  }, []);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return cards.map(value => {
    return (
      <>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Delete" onPress={handleDelete} />
        </Dialog.Container>
        <Card style={{ marginVertical: 4 }}>
          <Card.Content style={{ flexDirection: 'row' }}>
            <Title>{value.name}</Title>
            <Button color="#e16e39">Warnty:{value.warnty}Year</Button>
          </Card.Content>
          <Card.Cover source={{ uri: value.images }} />
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
            <Button color="#e16e39">Price:{value.price}</Button>
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
                <Text>{rnsheet.name}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Price</Text>
                <Text>{rnsheet.price}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Pick Up Type</Text>
                <Text>{rnsheet.pickUpType}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Warranty</Text>
                <Text>{rnsheet.warnty}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Text style={{ fontWeight: 'bold' }}>Time Taken</Text>
                <Text>{rnsheet.tmTaken}</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 35,
                marginHorizontal: 20,
              }}>
                <Text style={{ fontWeight: 'bold' }}>TOTAL PRICE</Text>
                <Text style={{ fontWeight: 'bold' }}>{rnsheet.price}</Text>
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
                        let date = new Date();
                        firestore()
                          .collection('orders')
                          .add({
                            servicesUID: rnsheet.id,
                            srUserId: rnsheet.srUserId,
                            userUID: userUID.uid,
                            createdAt: date.getTime(),
                            paymentMode: checked=="first"? 'Cash On Delivery' : 'Net Payment'
                          }).then(() => {
                            refRBSheet.current.close();
                            showMessage({
                              message: "Booked Sucessfully!",
                              description: "This services is booked sucessfully",
                              type: "success",
                              icon: "success"
                            });
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
});
