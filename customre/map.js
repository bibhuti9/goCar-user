import React, { useEffect, useState } from 'react';
import { View, LogBox, Text, FlatList, SafeAreaView, Dimensions, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import MapView, {Marker,Callout,Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


const userUID = auth().currentUser;

const { width, height } = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function HomeScreen(props) {


  const ReturnStoreLocation =async ()=>{
    await coordinates.map((value)=>{
      return <Marker coordinate={value}/>
    })
  }

    const [region, setRegion] = useState({
        latitude: 21.1503,
        longitude: 72.8250,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    const [coordinates,] = useState([
      {
        latitude: 21.1503,
        longitude: 72.8250,
      },
      {
        latitude: 21.1431,
        longitude: 72.8431,
      },
    ]);


    const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'InstaHair App needs permission to access you location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        console.log(typeof Geolocation);

        // Geolocation.getCurrentPosition(
        //   (position) => {
        //     setRegion({
        //       latitude: position.coords.latitude,
        //       longitude: position.coords.longitude,
        //       latitudeDelta: 0,
        //       longitudeDelta: 0,
        //     });
        //     console.log('lattitude'+position.coords.latitude)
        //     console.log('Longititude'+position.coords.longitude);
        //   },
        //   (error) => {
        //     // See error code charts below.
        //     console.log(error.code, error.message);
        //   },
        //   {
        //     enableHighAccuracy: true,
        //     timeout: 15000,
        //     maximumAge: 10000,
        //   },
        // );
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(()=>{
    Geolocation.getCurrentPosition(
          (position) => {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            });
            console.log('lattitude'+position.coords.latitude)
            console.log('Longititude'+position.coords.longitude);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
  },[])



    const [data, setData] = useState([]);
    const [mapType,setMapType]=useState('standard');
    return (


        <View style={{flex:1}}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>{setMapType('standard')}}>
              <Text>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>{setMapType('satellite')}}>
              <Text>Settelite</Text>
            </TouchableOpacity>
            </View>
          <View
            style={{
              height: height * 0.5,
              width: width,
              backgroundColor: 'gray',
            }}>

            <MapView
              style={styles.map}
              // region={region}

              initialRegion={{
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
              }}
              mapType={mapType}
              enableHighAccuracy={true}
              showsCompass={true}
              showsMyLocationButton={true}
              showsMyLocationButton={true}
              // region={region}
              followsUserLocation={true}
              showsUserLocation={true}
              onUserLocationChange={
                event => {
                  //  console.log(event.nativeEvent.coordinate['latitude'])
                  setRegion({
                    latitude: event.nativeEvent.coordinate['latitude'],
                    longitude:event.nativeEvent.coordinate['longitude']
                  });
                }
              }
              onRegionChangeComplete={region => {
                    // setRegion(region)
                    console.log(region)
                  }
                }
              // customMapStyle={mapStyle}
            >
              {
                coordinates.map((value)=>{
                  return <Marker coordinate={value}>
                    <MapView.Callout style={{
                      height:100,
                      width:100,
                    }}> 
                        <TouchableOpacity style={{
                          alignItems:'center',
                          justifyContent:'center'
                        }} onPress={this}>
                        <Text>Vibhu House!</Text>
                        </TouchableOpacity>
                    </MapView.Callout>
                  </Marker>
                })
              }
            </MapView>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
