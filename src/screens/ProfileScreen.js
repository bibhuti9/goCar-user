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
  Platform,
} from 'react-native';
import Share from 'react-native-share';
import { Icon, Label } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { showMessage } from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';
import ShopCards from '../components/ShopServicesCard';


const url = '';
const title = 'GO Car';
const message = 'This is my Profile click to See..';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});
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
              .collection('userProfile')
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
      .collection('userProfile')
      .doc(userUID.uid)
      .onSnapshot(data => {
        setUserData(data.data());
      });
  }, []);
  useEffect(() => {
    console.log(userData)
  }, [userData]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#95dbfa'
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={{
          flex: 1,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: '#f4bf56',
          elevation: 10,
        }}>
          <View style={{
            flex: 1,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            backgroundColor: PIMARY_COLOR,
            elevation: 5,
          }}>
            {/* Edit & logout */}
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
                  navigation.navigate('EditProfileScreen', { userData });
                }}>
                <Icon
                  type="FontAwesome5"
                  name="user-edit"
                  style={{ fontSize: 20, color: '#000000' }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                transparent
                onPress={createTwoButtonAlert}
                style={{ marginHorizontal: 15 }}>
                <Text style={{ color: '#000000' }}>Logout</Text>
              </TouchableOpacity>
            </View>
            {/* Logo */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 50,
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

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Label>TOTAL ORDER</Label>
            <Label style={{ alignSelf: 'center' }}>50</Label>
          </View>
        </View>
        {/* Total Buy */}
        {/* Infromation */}
        <View style={{
          flex: 1,
          marginTop: 30,
          marginHorizontal: 20,
          padding: 10
        }}>
          <View style={styles.cardLabel}>
            <Text style={{ fontWeight: 'bold' }}>Name</Text>
            <Text>{userData?.name}</Text>
          </View>
          <View style={styles.cardLabel}>
            <Text style={{ fontWeight: 'bold' }}>Email</Text>
            <Text>{userData?.email}</Text>
          </View>
          <View style={styles.cardLabel}>
            <Text style={{ fontWeight: 'bold' }}>Phone No</Text>
            <Text>{userData?.optionalPhoneNo}</Text>
          </View>
          <View style={styles.cardLabel}>
            <Text style={{ fontWeight: 'bold' }}>Address</Text>
            <Text>{userData?.address}</Text>
          </View>
          {/* Referal */}
          <View style={[styles.thirdCardStyle, {
            marginVertical: 20,
          }]}>
            <Text style={{ alignSelf: 'center', fontStyle: 'italic', fontSize: 20, fontWeight: '700' }}>EARN UP TO 500</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignSelf: 'center' }}>
                <Image style={{ height: 100, width: 120 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/referal%2Fsunday.jpg?alt=media&token=b1ea85ba-1e47-48da-a413-29c49f320575' }} />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <TouchableOpacity onPress={()=>Share.open(options)} style={styles.ToucuableStype }>
                  <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>NOW</Text>
                  <Icon
                    type="FontAwesome5"
                    name="bullhorn"
                    style={{ fontSize: 20, marginHorizontal: 3, color: '#000000' }}></Icon>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
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
  ToucuableStype: {
    borderWidth: 1, flexDirection: 'row', backgroundColor: '#f4bf56', borderRadius: 10, padding: 10
  },
  thirdCardStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
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
  cardLabel: {
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: .5,
    paddingVertical: 4
  },
});
