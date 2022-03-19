import React, {useEffect, useState} from 'react';
import {Button, Text, StyleSheet, View,Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import FlashMessage from "react-native-flash-message";


import HomeBottomStack from './HomeBottomStack';
import LogoutStack from './LogoutStack';
const Tab = createStackNavigator();
export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('logged in effect: ' + loggedIn);
    console.log('user: ' + user);
  }, [loggedIn]);
  async function onAuthStateChanged(user) {
    console.log('Authentication state changed...');
    console.log('previous Logged In: ' + loggedIn);
    if (user) {
      // Here we get the user validate Id

      setLoggedIn(true);
      console.log('user ID: ' + user.uid);
    } else setLoggedIn(false);

    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('After Logged In: ' + loggedIn);
    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return loggedIn ? (
    <>
      <HomeBottomStack />
    </>

  ) : (
    <SafeAreaView style={{flex:1,}}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{x: 0, y: 1 }}
          colors={['#5ac9fb','#FFFFFF']}
          style={{
            flex:1,
            backgroundColor: '#b2ed99',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{flex:1}}>
          <Image style={{
            height: 130,
            width: 130,
            marginTop:80,
          }} source={require('../assets/logo.png')} />
          </View>        
          <View style={{
            flex:1,
            height:200,
            width:'90%',
            padding:20,
            borderRadius:20,
            backgroundColor:'#ffffff',
            justifyContent:'flex-end'
          }}>
            <LogoutStack/>
          </View>     
      </LinearGradient> 
      <FlashMessage position="top" floating/>
      </SafeAreaView> 
  );
}
const style = StyleSheet.create({
  viewStyle: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginScreenStyle: {
    flex: 1,
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
});
