import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFont from 'react-native-vector-icons/FontAwesome';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotScreen from '../screens/ForgotScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <IconEntypo name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <IconEntypo name="shopping-cart" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <IconFont name="user-circle-o" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
                <Stack.Screen name="Forgot" options={{ headerShown: false }} component={ForgotScreen} />
                <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
