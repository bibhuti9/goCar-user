import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DisplayMapShopListScreen from '../screens/DisplayMapShopListScreen';
import DetailsOfShop from '../screens/DetailsOfShop'
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ServicesListScreen from '../screens/ServicesListScreen';
const Tab = createStackNavigator();
export default function HomeStackNav(){
    return(
        <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Display Map Shop List" component={DisplayMapShopListScreen}/>
            <Tab.Screen name="About Garage" component={DetailsOfShop}/>
            <Tab.Screen name="profile" component={ProfileScreen}/>
            <Tab.Screen name='EditProfileScreen' component={EditProfileScreen}/>
            <Tab.Screen name='ServicesListScreen' component={ServicesListScreen}/>            
        </Tab.Navigator>
    )
}