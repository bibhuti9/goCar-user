import React from 'react';
import { StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ICON_COLOR } from '@env';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNav from './HomeStackNav';
import OrderScreen from '../screens/OrderScreen';
import { Icon } from 'native-base';

const DrawerTab = createDrawerNavigator();
export default function HomeBottomStack() {
    return (
        <>
            <StatusBar
                backgroundColor="#5ac9fb" />
            <DrawerTab.Navigator tabBarOptions={{
                style: {
                    padding: 10,
                    borderRadius: 20,
                    shadowColor: '#5ac9fb',
                    marginHorizontal: 20,
                }
            }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch (route.name) {
                            case "HomeStack":
                                iconName = 'home'
                                break;
                            default:
                                iconName = focused
                                    ? "information-circle"
                                    : "information-circle-outline";
                        }
                        return <Feather name={iconName} size={size} color="#5ac9fb" />;
                    },
                })}
                initialRouteName="Home">
                <DrawerTab.Screen options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            type="FontAwesome5"
                            name="home"
                            style={{
                                fontSize: 23,
                                color: ICON_COLOR,
                            }}></Icon>
                    ),
                }} name="Home" component={HomeStackNav} />
                <DrawerTab.Screen options={{
                    title: 'Order',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            type="FontAwesome5"
                            name="shopping-bag"
                            style={{
                                fontSize: 23,
                                color: ICON_COLOR,
                            }}></Icon>
                    ),
                }} name="order" component={OrderScreen} />

            </DrawerTab.Navigator>
            
        </>
    )
}