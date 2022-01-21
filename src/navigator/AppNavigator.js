import React,{useState,useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Text,Image, View, StyleSheet, SafeAreaView} from 'react-native';
import {create} from 'react-test-renderer';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import AuthNavigator from './AuthNavigator';

const Tab = createStackNavigator();
export default function AppNavigator() {

    const [refresh,setRefresh]= useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setRefresh(false);   
        },3000)
    },[])
  return (
    <SafeAreaView style={{flex:1}}>
    { 
    refresh ?
    ( <LinearGradient
      start={{x: 0, y: 0}}
      // end={{x: 1, y: 1 }}
      colors={['#5ac9fb', '#FFFFFF']}
      style={style.viewStyle}>
          <LottieView style={{
              height: 200,
              width: 200,
            }}  source={require('../assets/img/car-service.json')} autoPlay loop />
      <Text style={{fontSize:30,fontWeight:'800'}}>GoCar</Text>
    </LinearGradient>
    )
    :
    (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName='AuthNavigator'>
          <Tab.Screen name='AuthNavigator' component={AuthNavigator}/>
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
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
});
