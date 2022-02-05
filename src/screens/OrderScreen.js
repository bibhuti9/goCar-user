import React, { useState, useEffect } from 'react';
import { ICON_YELLOW_COLOR } from '@env';

import {
    Text,
    Icon,
    Label,
} from 'native-base';
import { Image, LogBox, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Components
import OrderList from '../components/OrderList'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function OrderScreen({navigation}) {
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
                    <View style={{ marginHorizontal: 10, marginVertical: 15,}}>
                        <OrderList navigation={navigation}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
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
