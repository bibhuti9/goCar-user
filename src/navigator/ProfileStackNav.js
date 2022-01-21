import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
const Tab = createStackNavigator()
export default function ProfileStack(){
    return (
        <Tab.Navigator initialRouteName='Profile'>
            <Tab.Screen name='Profile' options={{headerShown: false}}component={ProfileScreen} />
            {/* <Tab.Screen name='Edit Profile' component={EditProfileScreen}/> */}
        </Tab.Navigator>
    )
}