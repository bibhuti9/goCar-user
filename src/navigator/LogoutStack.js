import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen';
import VerificationScreen from '../screens/VerificationScreen';

const Tab = createStackNavigator()
export default function LogoutStack(){
    return (
        <Tab.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
            <Tab.Screen name='LoginScreen' component={LoginScreen} />
            <Tab.Screen name='VerificationScreen' component={VerificationScreen} />
        </Tab.Navigator>
    )
}