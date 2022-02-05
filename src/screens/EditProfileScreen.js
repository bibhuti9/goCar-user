import React, { useEffect, useState } from 'react';
import { View, LogBox, Text, Switch, FlatList, SafeAreaView, Dimensions, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, SwitchBase } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Icon, Label, Textarea } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userUID = auth().currentUser;

export default function EditProfileScreen({ route, navigation }) {


    const [Loader, setLoader] = useState(false);
    const [userData, setUserData] = useState(route.params['userData']);


    const saveShopBasicInfrmation = async () => {
        console.log(userUID.uid)
        setLoader(true);
        await firestore()
            .collection('userProfile')
            .doc(userUID.uid)
            .update({
                name: userData.name,
                address: userData.address,
                email: userData.email,
                optionalPhoneNo: userData.optionalPhoneNo,
            })
            .then(() => { 
                setLoader(true);
                console.log('Data Updated!');
                navigation.goBack()
            })
            .catch((error) => { console.log(error) })
    }
    return (
        <View style={{
            flex: 1,
            margin: 10,
        }}>
            {Loader == true ? (
                <Spinner
                    visible={true}
                    textContent={'Data is Uploading!...'}
                    textStyle={"#000000"}
                />
            ) : null}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', flex: 3, }}>
                    <TextInput
                        style={{
                            borderRadius: 10,
                            width: '80%',
                            color: '#000000',
                            marginVertical: 10,
                        }}
                        value={userData?.name}
                        mode="outlined"
                        label="Name"
                        onChangeText={(value) => {
                            setUserData((preStat) => ({ ...preStat, name: value }));
                        }}
                    >
                    </TextInput>
                    <TextInput
                        style={{
                            borderRadius: 10,
                            width: '80%',
                            color: '#000000',
                            marginVertical: 10,
                        }}
                        value={userData?.email}
                        mode="outlined"
                        label="Email"
                        onChangeText={(value) => {
                            setUserData((preStat) => ({ ...preStat, email: value }));
                        }}
                    ></TextInput>
                    <TextInput
                        style={{
                            borderRadius: 10,
                            width: '80%',
                            color: '#000000',
                            marginVertical: 10,
                        }}
                        value={userData?.optionalPhoneNo}
                        mode="outlined"
                        label="Phone Number"
                        onChangeText={(value) => {
                            setUserData((preStat) => ({ ...preStat, optionalPhoneNo: value }));
                        }}
                    ></TextInput>
                    <TextInput
                        style={{
                            borderRadius: 10,
                            width: '80%',
                            color: '#000000',
                            marginVertical: 10,
                        }}
                        value={userData?.address}
                        mode="outlined"
                        label="Address"
                        onChangeText={(value) => {
                            setUserData((preStat) => ({ ...preStat, address: value }));
                        }}
                    ></TextInput>
                </View>
                <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginVertical:60
                }}>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            padding: 10,
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#856bf8',
                            marginVertical: 30,
                            elevation: 5,
                        }}
                        onPress={async () => {
                            console.log(userData);
                            saveShopBasicInfrmation();
                            saveshopinfromation();
                        }}
                    ><Text style={{ color: '#ffffff', }}>Edit</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    storeTimeStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#856bf8'
    },
    LabelStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    textArea: {
        justifyContent: "flex-start",
        height: 80,
        borderColor: 'black',
        marginVertical: 20,
        borderRadius: 10,
        padding: 10,
        color: '#000000',
        fontSize: 17,
        width: '80%'
    },

})