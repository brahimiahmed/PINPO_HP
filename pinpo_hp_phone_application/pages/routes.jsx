import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './login';
import HomeScreen from './home';
import AboutScreen from './about';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginStack = createNativeStackNavigator();
const HomeTab = createBottomTabNavigator();

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="Home" component={HomeTabScreen} />
        </LoginStack.Navigator>
    );
}

export const HomeTabScreen = () => {
    return (
        <HomeTab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarStyle:{ paddingBottom:10, height:60 }, }}>
            <HomeTab.Screen name="Other" component={HomeScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <HomeTab.Screen name="About" component={AboutScreen} options={{
                tabBarLabel: 'About',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }} />
        </HomeTab.Navigator>
    );
}

export default LoginStackScreen;