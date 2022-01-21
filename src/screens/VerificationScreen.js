import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Touchable,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';

import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export default function VerificationScreen({route, navigation}) {
  const [otp, setOtp] = useState('');
  const [otpLength, setOtpLength] = useState(6);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [confirm, setConfirm] = useState();
  const [mobNo, setMobNo] = useState(route.params.mobNo);
  const [msgToken, setMsgToken] = useState();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken(); //<---- Add this
      console.log('Authorization status:', authStatus);
    }
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      setMsgToken(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };
  useEffect(() => {
    requestUserPermission();
    console.log('fcm tocken end');
  }, []);

  const [region, setRegion] = useState({
    latitude: 21.1503,
    longitude: 72.825,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
        console.log('lattitude' + position.coords.latitude);
        console.log('Longititude' + position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  useEffect(() => {
    console.log(' phone: ' + mobNo);
    signWithPhone();
  }, [mobNo]);

  async function signWithPhone() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(mobNo);
      setConfirm(confirmation);
      console.log('confirmation : ' + Object.values(confirmation));
    } catch (e) {
      console.log(e);
    }
  }
  async function confirmCode() {
    try {
      await confirm.confirm(otp);
      {
        /* Start */
      }
      // Here we set the phone number of the user
      //for this we can get the number after the login
      const userUID = auth().currentUser;
      console.log(userUID);
    
      //Store infromation into datanase   
      console.log('before go firestore');
     firestore()
     .collection('userProfile')
     .doc(userUID.uid)
     .get()
     .then(async (documentSnapshot)=>{
      console.log('after go firestore');
        if (!documentSnapshot.exists) {
            await firestore()
            .collection('userProfile')
            .doc(userUID.uid)
            .set({
              name:'',
              email:'',
              logo:'https://firebasestorage.googleapis.com/v0/b/gocar-5550c.appspot.com/o/icons%2Fprofile.png?alt=media&token=c0b46f82-2d95-40f8-893e-53ea2ae16ff9',
              address:'',
              phoneNo:mobNo,
              latitude:region.latitude,
              longitude:region.longitude,
              deviceToken:msgToken,
              userUID:userUID.uid
            }).then(()=>{console.log('user Profile is setted')})
          }else{
              console.log('User Exists')
          }
     })

    

      {
        /* End */
      }
    } catch (error) {
      console.log('Wrong OTP from here');
      console.log(error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text>Mobile No:</Text>
        <Text>{route.params.mobNo}</Text>
      </View>
      <TextInput
        style={{
          borderBottomWidth: 1,
          // borderWidth:1,
          width: '50%',
        }}
        placeholder="Enter OTP"
        maxLength={6}
        textAlign="center"
        keyboardType="numeric"
        placeholderTextColor="#9e9c99"
        onChangeText={data => {
          setOtp(data);
          data.length == otpLength
            ? setSubmitDisabled(true)
            : setSubmitDisabled(false);
        }}
      />
      <Text note>
        Didn't get the OTP?
        <Text style={{color: '#FF601D', textDecorationLine: 'underline'}}>
          {' '}
          Resend
        </Text>
      </Text>

      <TouchableOpacity
        style={{
          width: '50%',
          padding: 10,
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#856bf8',
          marginVertical: 30,
          elevation: 5,
        }}
        disabled={!submitDisabled}
        onPress={() => confirmCode()}>
        <Text style={{color: '#ffffff'}}>Submit OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
