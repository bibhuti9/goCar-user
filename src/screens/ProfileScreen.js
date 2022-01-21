import React, { useEffect, useState, useRef } from 'react';
import { PIMARY_COLOR } from "@env"
import {
  View,
  LogBox,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { Icon, Label } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { showMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';

import ShopCards from '../components/ShopServicesCard';

const userUID = auth().currentUser;
const { width, height } = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default function ProfileScreen({ navigation }) {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert', 'Are You Sure To Logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logOut() },
    ]);
  function PickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      var imagePath = image.path;
      var ImageName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
      console.log(ImageName);
      try {
        var reference = storage().ref(ImageName);
        const task = reference.putFile(imagePath);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        task.then(async () => {
          console.log('Image uploaded to the bucket!');
          var TmpURL = await reference.getDownloadURL().then(Value => {
            // console.log(`Image URL ${Value}`);
            // Setup the user infromation into the firebase
            firestore()
              .collection('srBasicInfromation')
              .doc(userUID.uid)
              .update({
                logo: Value,
              });
            setUserData({ logo: Value });
            showMessage({
              message: 'Profile Updated ! ',
              type: 'success',
              icon: 'success',
              position: 'right',
            });
          });
        });
      } catch (e) {
        console.log('Error from Image upload ' + e);
      }
    });
  }
  async function logOut() {
    try {
      setUserData({});
      await auth().signOut();
      console.log('Logout');
    } catch (e) {
      console.error(e);
    }
  }
  const [userData, setUserData] = useState([]);
  const [option, setOption] = useState(true);

  useEffect(() => {
    firestore()
      .collection('srBasicInfromation')
      .doc(userUID.uid)
      .onSnapshot(basicInfromation => {
        firestore()
          .collection('srShopInfromation')
          .doc(userUID.uid)
          .onSnapshot((shopBasicInfromation) => {
            let tmp = {
              ...basicInfromation.data(),
              ...shopBasicInfromation.data()
            };
            setUserData(tmp)
          })
      });
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);


  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Edit Profile', { userData });
          }}>
          <Icon
            type="FontAwesome5"
            name="user-edit"
            style={{ fontSize: 20, color: '#856bf8' }}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          transparent
          onPress={createTwoButtonAlert}
          style={{ marginHorizontal: 15 }}>
          <Text style={{ color: '#856bf8' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        {/* Profile View */}
        <View
          style={{
            borderRadius: 150,
            height: height * 0.2,
            width: width * 0.4,
          }}>
          {userData?.logo ? (
            <Image
              style={{
                height: height * 0.2,
                borderRadius: 300 / 2,
                width: width * 0.38,
              }}
              source={{ uri: userData?.logo }}
            />
          ) : (
            <Image
              style={{
                height: height * 0.2,
                borderRadius: 300 / 2,
                width: width * 0.38,
              }}
              source={require('../assets/img/profile.png')}
            />
          )}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: -0,
              right: -0,
              width: 45,
              height: 45,
              borderRadius: 300 / 2,
              backgroundColor: '#856bf8',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              PickImage();
            }}>
            <Icon
              type="AntDesign"
              name="camera"
              style={{
                fontSize: 25,
                color: '#000000',
              }}></Icon>
          </TouchableOpacity>
        </View>
      </View>
      {/* Show the  Total Customer Request & Total Panding into the line*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          padding: 10,
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          elevation: 8,
          borderColor: '#856bf8',
        }}
        disabled={true}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => { setOption(true) }}>
            <Icon
              type="FontAwesome5"
              name="store-alt"
              style={{
                fontSize: 25,
                color: PIMARY_COLOR,
                alignSelf: 'center',
              }}></Icon>
            <Text>Store Infromation</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => { setOption(false) }}>
            <Icon
              type="FontAwesome5"
              name="hand-holding-medical"
              style={{
                fontSize: 25,
                color: PIMARY_COLOR,
                alignSelf: 'center',
              }}></Icon>
            <Text>Services</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Show the Barber Profile Infromation*/}
      <View
        style={{
          flex: 1,
          margin: 10,
        }}>
        {
          option ?
            (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Label style={styles.labelStyle}>Name: {userData?.name}</Label>
                <Label style={styles.labelStyle}>Email: {userData?.email}</Label>
                <Label style={styles.labelStyle}>
                  Phone Number: {userData?.optionalPhoneNo}
                </Label>
                <Label style={styles.labelStyle, {
                  borderBottomWidth: 1,
                  textAlign: 'center',
                  marginTop: 10,
                  color: PIMARY_COLOR,
                  fontWeight: '700',
                  fontSize: 20,
                }}>Store Opening Time</Label>
                <View style={styles.storeTimeStyle}>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 5,
                      alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Monday</Label>
                      </View>
                      {userData?.monday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.monday['C']}A.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.monday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Tuesday</Label>
                      </View>
                      {userData?.tuesday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.tuesday['C']}P.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.tuesday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Wednesday</Label>
                      </View>
                      {userData?.wednesday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.wednesday['O']}A.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.wednesday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Thursday</Label>
                      </View>
                      {userData?.thursday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.thursday['O']}A.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.thursday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Friday</Label>
                      </View>
                      {userData?.friday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.friday['O']}A.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.friday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Saturday</Label>
                      </View>
                      {userData?.saturday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.saturday['O']}A.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.saturday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Label style={{ alignSelf: 'center' }}>Sunday</Label>
                      </View>
                      {userData?.sunday?.OC ? (
                        <View style={styles.LabelStyle}>
                          <Text>{userData?.sunday['O']}A.M</Text>
                          <Label>To</Label>
                          <Text>{userData?.sunday['C']}P.M</Text>
                        </View>
                      ) : (
                        <View style={styles.LabelStyle}>
                          <Label style={{ color: 'red' }}>Close</Label>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <Label style={styles.labelStyle}>
                  Description: {userData?.description}
                </Label>
                <Label style={styles.labelStyle}>Address: {userData?.address}</Label>
              </ScrollView>

            ) :
            (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* <ShopServicesCard/> */}
              </ScrollView>
            )
        }

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  storeTimeStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#856bf8',
  },
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
  profile: {
    flex: 1,
    alignItems: 'center',
  },
  infromation: {
    flex: 1,
    alignItems: 'center',
  },
});
