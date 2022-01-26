import React, {useEffect, useState, useRef} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {PIMARY_COLOR} from '@env';
import {Linking, Platform} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Dialog from 'react-native-dialog';

import {Text} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Icon, Label} from 'native-base';

const userUID = auth().currentUser;
const {width, height} = Dimensions.get('window');

export default function ShopServicesCard(garageUID) {
  const book = () => {
    Linking.openURL('https://paytm.me/QkF-Sj4');
  };

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
        let tmp = [];
        cardData.docs.map(value => {
          tmp = [...tmp, value.data()];
        });
        setCards(tmp);
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
        <Card style={{marginVertical: 4}}>
          <Card.Content style={{flexDirection: 'row'}}>
            <Title>{value.name}</Title>
            <Button color="#e16e39">Warnty:{value.warnty}Year</Button>
          </Card.Content>
          <Card.Cover source={{uri: value.images}} />
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
              backgroundColor: '#f39c9a',
              width: 100,
            },
          }}>
          <View style={{marginVertical: 20, marginHorizontal: 10}}>
            <View style={styles.cardLabel}>
              <Label style={{fontSize: 22}}>Name:</Label>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  marginHorizontal: 10,
                }}>
                {rnsheet.name}
              </Text>
            </View>
            <View style={styles.cardLabel}>
              <Label>Price:</Label>
              <Text style={{alignSelf: 'center', marginHorizontal: 3}}>
                {rnsheet.price}
              </Text>
            </View>
            <View style={styles.cardLabel}>
              <Label>Pick Up Type:</Label>
              <Text style={{alignSelf: 'center', marginHorizontal: 10}}>
                {rnsheet.pickUpType}
              </Text>
            </View>
            <View style={styles.cardLabel}>
              <Label>Warrnty: </Label>
              <Text style={{alignSelf: 'center', marginHorizontal: 10}}>
                {rnsheet.warnty} Year
              </Text>
            </View>
            <View>
              <Label>Cash On Delivery </Label>
              <Icon
              type="FontAwesome5"
              name="badge-check"
              style={{
                fontSize: 25,
                color: '',
                alignSelf: 'center',
              }}></Icon>
            </View>
            

            <View style={{marginVertical: 100, alignSelf: 'center',width:'90%'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f4bf56',
                  borderRadius: 10,
                  padding: 5,
                  marginRight: 10,
                }}
                onPress={() => {
                  
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
    marginVertical: 5,
    backgroundColor: PIMARY_COLOR,
    elevation: 8,
    borderRadius: 5,
    padding: 5,
  },
});
