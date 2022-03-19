import React, { useState, useEffect } from 'react';
import { ICON_YELLOW_COLOR } from '@env';

import {
  Text,
  Icon,
  Label,
} from 'native-base';
import { Image, LogBox, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Components
import CardStoresList from '../components/cardStoresList';
import TrendingCardList from '../components/trendingCardList'


import RNUpiPayment from 'react-native-upi-payment';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function HomeScreen({ navigation }) {

  const moveToDisplayMap = (chategory) => {
    navigation.navigate('Display Map Shop List', { chategory });
  }

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
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };
  useEffect(() => {
  
    requestUserPermission();
    console.log('fcm tocken end');
  }, []);

  return (
    <View>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={style.headerICON}>
            {/* Left Drawer */}
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                type="FontAwesome5"
                name="bars"
                style={{
                  fontSize: 23,
                  color: '#312f2f',
                }}></Icon>
            </TouchableOpacity>
            {/* Right User Profile LOGO */}
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
              <Icon
                type="FontAwesome5"
                name="user"
                style={{
                  fontSize: 23,
                  color: '#312f2f',

                }}></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Label style={{ fontSize: 25, fontWeight: 'bold' }}>Hii</Label>
            <Text style={{ fontStyle: 'italic' }}>Well Come To GO Car</Text>
          </View>
          {/* New Services Offer (Scroll View Horizontal) */}
          <View style={{ marginHorizontal: 10, marginVertical: 15, }}>
            <TrendingCardList />
          </View>

          {/* Category */}
          <View style={style.thirdCardStyle}>
            <Text style={{ fontStyle: 'italic', fontSize: 20, }}>What You Looking’sFor</Text>
            {/* First List */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[style.categoryCard, style.elevation]} onPress={() => moveToDisplayMap('Charger')}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fbattery.png?alt=media&token=25e1dd52-ffa6-44c5-a97f-d8c8500500a8' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FcarChain.png?alt=media&token=e9f0d351-8464-4660-993a-fb5f2e642e73' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FcarDiscBrake.png?alt=media&token=072c9513-9d91-4f02-ae9e-871afbeb507f' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FdemageCarPickUpWithKrane.png?alt=media&token=b8240e5e-7350-4a95-b68c-d62dd7862dc8' }}
                />
              </TouchableOpacity>
            </View>
            {/* Second List */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fengine.png?alt=media&token=b94ccb92-60fb-48df-8efb-af1b402bd47c' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fmechanical.png?alt=media&token=1580fc4e-0f52-463d-944e-745edf6d89ce' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fgasoline.png?alt=media&token=a4dffc34-49c6-4b9c-a020-aa4988042b66' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FpickCarWithBigBus.png?alt=media&token=a7afeba7-b1bf-4eb5-9ddc-ee520005cee0' }}
                />
              </TouchableOpacity>
            </View>
            {/* Third List */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FpickCarWithBigBus.png?alt=media&token=a7afeba7-b1bf-4eb5-9ddc-ee520005cee0' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FpickCarWithBigBus.png?alt=media&token=a7afeba7-b1bf-4eb5-9ddc-ee520005cee0' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fwheel.png?alt=media&token=b25a58f8-ea1c-4e86-b39d-bb53dfcd9cbb' }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[style.categoryCard, style.elevation]}>
                <Image style={{ height: 60, width: 60, borderWidth: 1, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Foil.png?alt=media&token=67d62178-27ee-4eb7-81a7-14bcd187c558' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Services Offer */}
          <View style={[style.thirdCardStyle, {
            marginHorizontal: 30,
            marginVertical: 20,
          }]}>
            <Text style={{ alignSelf: 'center', fontStyle: 'italic', fontSize: 20, fontWeight: '700' }}>Services</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignSelf: 'center' }}>
                <Text>Custom</Text>
                <Text>Medium</Text>
                <Text>Standard</Text>
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Image style={{ height: 80, width: 80 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/gocar-5550c.appspot.com/o/icons%2F24-hours%201.png?alt=media&token=a6165846-2242-4394-8859-e227231719fc' }} />
                <TouchableOpacity style={{ backgroundColor: '#f4bf56', borderRadius: 10, padding: 5 }}><Text style={{ fontStyle: 'italic', textAlign: 'center' }}>See More</Text></TouchableOpacity>
              </View>
            </View>

          </View>
          {/* Stores List */}
          <View style={{ marginHorizontal: 20, flexDirection: 'row' }}>
            <Text style={{ fontStyle: 'italic' }}>
              Store
            </Text>
            <CardStoresList route={navigation} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  headerICON: {
    flexDirection: 'row',
    margin: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between'
  },
  thirdCardStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  categoryCard: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#52006A',
  },
})