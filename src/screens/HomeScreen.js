import React, {useState, useEffect} from 'react';
import {ICON_YELLOW_COLOR} from '@env';

import {Text, Icon, Label} from 'native-base';
import {
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

// Components
import CardStoresList from '../components/cardStoresList';
import TrendingCardList from '../components/trendingCardList';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function HomeScreen({navigation}) {
  const moveToDisplayMap = chategory => {
    navigation.navigate('ServicesListScreen', {chategory});
  };

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
          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Label style={{fontSize: 25, fontWeight: 'bold'}}>Hii</Label>
            <Text style={{fontStyle: 'italic'}}>Well Come To GO Car</Text>
          </View>
          {/* New Services Offer (Scroll View Horizontal) */}
          <View style={{marginHorizontal: 10, marginVertical: 15}}>
            <TrendingCardList />
          </View>

          {/* Category */}
          <View style={style.thirdCardStyle}>
            <Text style={{fontStyle: 'italic', fontSize: 20}}>
              What You Looking’sFor
            </Text>
            {/* First List */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Battery Replacement')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FBattery%20Replacement.png?alt=media&token=fe283d86-2c0d-4959-af2f-18d3e1445271',
                  }}
                />
                <Text>Battery Replacement</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Brakes')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FBrakes.png?alt=media&token=ae7b1a0a-104f-4c12-9f34-475130b089cd',
                  }}
                />
                <Text>Brakes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Car Wash')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FCar%20Wash.png?alt=media&token=3a0e3366-b0c2-49dc-aa39-5481d98e9cb2'}}
                />
                <Text>Car Wash</Text>
              </TouchableOpacity>
            </View>
            {/* Second List */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Diagnostic')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FDiagnostic.png?alt=media&token=64e88c57-cad0-41b2-b75e-b1ba8ee06547'}}
                />
                <Text>Diagnostic</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Oil Changes')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2FOil%20Changes.png?alt=media&token=e8eea861-c80b-40d7-897b-6932c8f120e9'}}
                />
                <Text>Oil Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Chain')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fchain.png?alt=media&token=e7d85f03-ea9d-442e-8eb9-873c47f727c6'}}
                />
                <Text>Chain</Text>
              </TouchableOpacity>
            </View>
            {/* Third List */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Document')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fdocument.png?alt=media&token=7f96b660-f416-4f3a-922b-9a33cfac3839'}}
                />
                <Text>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Tow Truck')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Ftow-truck.png?alt=media&token=263e7f32-bf77-4716-b4d7-7a7447d210d8'}}
                />
                <Text>Tow Truck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.categoryCard, style.elevation]}
                onPress={() => moveToDisplayMap('Wheel')}>
                <Image
                  style={{height: 60, width: 60, borderWidth: 1}}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/category_img%2Fwheel.png?alt=media&token=1ac4d74a-fc80-44e0-a57f-a0d29dadca03'}}
                />
                <Text>Wheel</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Services Offer */}
          <View
            style={[
              style.thirdCardStyle,
              {
                marginHorizontal: 30,
                marginVertical: 20,
              },
            ]}>
            <Text
              style={{
                alignSelf: 'center',
                fontStyle: 'italic',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Services
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{alignSelf: 'center'}}>
                <Text>Custom</Text>
                <Text>Medium</Text>
                <Text>Standard</Text>
              </View>
              <View style={{alignSelf: 'center'}}>
                <Image
                  style={{height: 80, width: 80}}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/gocar-5550c.appspot.com/o/icons%2F24-hours%201.png?alt=media&token=a6165846-2242-4394-8859-e227231719fc',
                  }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#f4bf56',
                    borderRadius: 10,
                    padding: 5,
                  }}>
                  <Text style={{fontStyle: 'italic', textAlign: 'center'}}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Stores List */}
          <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
            <Text style={{fontStyle: 'italic'}}>Store</Text>
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
    justifyContent: 'space-between',
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
    flex: 1,
    alignItems: 'center',
    padding: 2,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#52006A',
  },
});
