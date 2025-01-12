import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Import the navigation container
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import MainMenuScreen from './Screens/MainMenuScreen.js'; //import MainMenuScreen

const Stack = createStackNavigator(); //Initalise stack navigator

export default function App() {
  return (

    <NavigationContainer>{/* Navigation container that holds all screens */}
      <Stack.Navigator initialRouteName="MainMenuScreen">
        <Stack.Screen name="MainMenuScreen" component={MainMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//test comment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
