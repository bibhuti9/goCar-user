import React, { useEffect, useState, useRef } from 'react';
import { PIMARY_COLOR } from "@env"
import {
    View,
    Text,
    ImageBackground,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const userUID = auth().currentUser;

const CustomDrawer = props => {

    const [userData, setUserData] = useState([]);
    const [totalOrder,setTotalOrder]=useState(0);

    const createTwoButtonAlert = () =>
    Alert.alert('Alert', 'Are You Sure To Logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logOut() },
    ]);



    useEffect(() => {
        console.log(userUID?.uid);
        firestore()
            .collection('userProfile')
            .doc(userUID?.uid)
            .onSnapshot(data => {
                console.log(data);
                setUserData(data.data());
            });

        firestore()
            .collection('orders')
            .where('userUID', '==', userUID.uid)
            .onSnapshot(data => {
                setTotalOrder(data.size);
            });
    }, []);
    useEffect(() => {
        console.log(userData)
    }, [userData]);

    async function logOut() {
        try {
            setUserData({});
            await auth().signOut();
            console.log('Logout');
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground
                    source={require('../assets/img/menu-bg.jpeg')}
                    style={{ padding: 20 }}>
                    <Image
                        source={{ uri: userData?.logo }}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            marginBottom: 5,
                        }}>
                        {userData?.name}
                    </Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={createTwoButtonAlert} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
