import React, { useEffect, useState } from 'react';
import { View, LogBox, Text, FlatList, SafeAreaView, Dimensions, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Linking, Platform } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Icon, Thumbnail } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


const userUID = auth().currentUser;

const { width, height } = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function MapScreen({route, navigation }) {

  const [store, setStore] = useState([]);
  
  var character = route.params['chategory'];

  useEffect(() => {
    firestore()
      .collection('srBasicInfromation')
      .onSnapshot((stores) => {

        setStore(stores.docs.map((values) =>
          ({ ...values.data(), ['id']: values.id })
        ))
      })
  }, [])

  useEffect(()=>{
    console.log(store)
  },[store])

  const [region, setRegion] = useState({
    latitude: 21.1503,
    longitude: 72.8250,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Get the user current location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
        console.log('lattitude' + position.coords.latitude)
        console.log('Longititude' + position.coords.longitude);
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
  }, []) //End

  const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };

  

  const [data, setData] = useState([]);
  const [mapType, setMapType] = useState('standard');
  const [change, setChange] = useState(true);

  return (
    <>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',

      }}>
        <TouchableOpacity style={{
          borderRadius: change ? 20 : null,
          backgroundColor: change ? '#000000' : null,
          padding: 5,
          paddingHorizontal: 10,
        }}
          onPress={() => { setChange(true) }}>
          <Text style={{
            color: change ? '#FFFFFF' : '#000000',
          }}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          borderRadius: change ? null : 20,
          padding: 5,
          paddingHorizontal: 10,
          backgroundColor: change ? null : '#000000',
        }}
          onPress={() => { setChange(false) }}>
          <Text style={{ color: change ? '#000000' : '#FFFFFF', }}>Garage's</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1,
      }}>
        {
          change ?
            (
              <View style={{ flex: 1,marginTop: 10 }}>
                <View
                  style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: 'gray',
                  }}>
                  <MapView
                    style={styles.map}
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
                    followsUserLocation={true}
                    showsUserLocation={true}
                    onUserLocationChange={
                      event => {
                        setRegion({
                          latitude: event.nativeEvent.coordinate['latitude'],
                          longitude: event.nativeEvent.coordinate['longitude']
                        });
                      }
                    }
                    onRegionChangeComplete={region => {
                      // setRegion(region)
                      console.log(region)
                    }
                    }
                  >
                    {
                      store.map((value) => {
                        return (
                          <Marker
                            onPress={() => {
                              navigation.navigate('About Garage',value);
                            }}
                            coordinate={{
                              latitude: value.latitude,
                              longitude: value.longitude,
                            }}
                          >
                            <View>
                              <View>
                                <View style={styles.bubble}>
                                  <Thumbnail source={{ uri: value.logo }} />
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />
                              </View>
                            </View>
                          </Marker>
                        )
                      })
                    }
                  </MapView>
                </View>
              </View>
            )
            :
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10, flex: 1 }}>
              {
                store.map((value, index) => {
                  return (
                    <View style={styles.secondLable}>
                      <View style={{ flexDirection: 'row' }}>
                        <View>
                          <Text>
                            Name: {value.name}
                          </Text>
                          <Text style={{
                            marginVertical: 5,
                            alignSelf: 'center',
                            width: 150
                          }}>About: {value.description}</Text>
                          <Text style={{marginVertical:10}}>
                            {value.address}
                          </Text>
                        </View>
                        <Image style={{
                          height: 100,
                          width: 150,
                          flex: 1,
                          resizeMode: 'contain',
                          borderWidth:1,
                        }} source={{ uri: value.logo }} />
                      </View>
                      <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                        <TouchableOpacity
                          style={{
                            height: 30,
                            width:100,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            flexDirection: 'row',
                            marginVertical: 10,
                            backgroundColor: '#f4bf56',
                          }}
                              onPress={()=>navigation.navigate('About Garage',value)}
                        >
                          <Icon
                          type="FontAwesome5"
                          name="user"
                          style={{
                            fontSize: 18,
                            color: '#312f2f',
                          }}></Icon>
                          <Text style={{marginLeft:5}}>ABOUT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            flexDirection: 'row',
                            marginVertical: 10,
                          }}
                          onPress={() => { dialCall(value.phoneNo) }}
                        ><Icon
                          type="FontAwesome5"
                          name="phone-alt"
                          style={{
                            fontSize: 18,
                            color: '#312f2f',
                          }}></Icon>
                          <Text style={{marginLeft:5}}>{value.phoneNo}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
        }
      </View>
    </>
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
  secondLable: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical:3,
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

  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,


  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
});
