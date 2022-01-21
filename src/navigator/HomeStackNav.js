import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DisplayMapShopListScreen from '../screens/DisplayMapShopListScreen';
import DetailsOfShop from '../screens/DetailsOfShop'
const Tab = createStackNavigator();
export default function HomeStackNav(){
    return(
        <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Display Map Shop List" component={DisplayMapShopListScreen}/>
            <Tab.Screen name="About Garage" component={DetailsOfShop}/>
        </Tab.Navigator>
    )
}