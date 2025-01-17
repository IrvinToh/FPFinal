import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import the navigation container
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import MainMenuScreen from './Screens/MainMenuScreen.js'; //import MainMenuScreen
import ClassicScreen from './Screens/ClassicScreen.js'; //import MainMenuScreen
import ClassicTopicOneScreen from './Screens/ClassicTopicOneScreen.js'; //import MainMenuScreen
import TimeChallengeScreen from './Screens/TimeChallengeScreen.js'; //import MainMenuScreen
import ProgressionScreen from './Screens/ProgressionScreen.js'; //import MainMenuScreen
import GuideScreen from './Screens/GuideScreen.js'; //import MainMenuScreen


const Stack = createStackNavigator(); //Initalise stack navigator

export default function App() {
  return (

    <NavigationContainer>{/* Navigation container that holds all screens */}
      <Stack.Navigator initialRouteName="MainMenuScreen">
        <Stack.Screen name="MainMenuScreen" component={MainMenuScreen} options={{headerShown: false}} />
        <Stack.Screen name="ClassicScreen" component={ClassicScreen} options={{headerShown: false}} />
        <Stack.Screen name="TimeChallengeScreen" component={TimeChallengeScreen} options={{headerShown: false}} />
        <Stack.Screen name="ProgressionScreen" component={ProgressionScreen} options={{headerShown: false}} />
        <Stack.Screen name="GuideScreen" component={GuideScreen} options={{headerShown: false}} /> 
        <Stack.Screen name="ClassicTopicOneScreen" component={ClassicTopicOneScreen} options={{headerShown: false}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

