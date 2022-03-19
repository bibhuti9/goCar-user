import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ICON_COLOR } from '@env';
import { StatusBar,Text } from 'react-native';

import OrderScreen from '../screens/OrderScreen';
import CustomDrawer from './CustomDrawer'

import HomeStackNav from './HomeStackNav';

import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Drawer = createDrawerNavigator();

export default function HomeBottomStack() {
    return (
        <>
            <StatusBar
                backgroundColor="#5ac9fb" />
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: '#aa18ea',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        marginLeft: -25,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 15,
                    },
                }}>
                <Drawer.Screen
                    name="Home"
                    component={HomeStackNav}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                type="FontAwesome5"
                                name="home"
                                style={{
                                    fontSize: 23,
                                    color: ICON_COLOR,
                                }}></Icon>
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Order"
                    component={OrderScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                type="FontAwesome5"
                                name="shopping-bag"
                                style={{
                                    fontSize: 23,
                                    color: ICON_COLOR,
                                }}></Icon>
                        ),
                    }}
                />
            </Drawer.Navigator>
        </>
    );
};
