import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  // Import the navigation container
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import MainMenuScreen from './Screens/MainMenuScreen.js'; //import MainMenuScreen
import ClassicScreen from './Screens/ClassicScreen.js'; //import MainMenuScreen
import ClassicThemeOneScreen from './Screens/ClassicThemeOneScreen.js'; //import ClassicThemeOneScreen
import ClassicThemeTwoScreen from './Screens/ClassicThemeTwoScreen.js'; //import ClassicThemeTwoScreen
import ClassicThemeThreeScreen from './Screens/ClassicThemeThreeScreen.js'; //import ClassicThemeThreeScreen
import TimeChallengeThemeOneScreen from './Screens/TimeChallengeThemeOneScreen.js'; //import TimeChallengeThemeOneScreen
import TimeChallengeThemeTwoScreen from './Screens/TimeChallengeThemeTwoScreen.js'; //import TimeChallengeThemeTwoScreen
import TimeChallengeThemeThreeScreen from './Screens/TimeChallengeThemeThreeScreen.js'; //import TimeChallengeThemeThreeScreen
import TimeChallengeScreen from './Screens/TimeChallengeScreen.js'; //import TimeChallengeScreen
import ProgressionScreen from './Screens/ProgressionScreen.js'; //import ProgressionScreen
import GuideScreen from './Screens/GuideScreen.js'; //import GuideScreen
import { EventProvider } from './EventContext';
import React, {useState, useEffect} from 'react';
import { Audio } from 'expo-av';  // Import Audio from expo-av
const Stack = createStackNavigator(); //Initalise stack navigator

export default function App() {
  const [sound, setSound] = useState();

  const playBackgroundMusic = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./audio/background.wav'), 
      {
        shouldPlay: true,  
        isLooping: true,  
      }
    );
    setSound(sound);
  };

  // Use useEffect to play background music when the app starts
  useEffect(() => {
    playBackgroundMusic();

    return () => {
      sound?.unloadAsync();  // Unload the sound when the app is closed or the component unmounts
    };
  }, []);

  return (
    <EventProvider>
      <NavigationContainer>{/* Navigation container that holds all screens */}
        <Stack.Navigator initialRouteName="MainMenuScreen">
          <Stack.Screen name="MainMenuScreen" component={MainMenuScreen} options={{headerShown: false}} />
          <Stack.Screen name="ClassicScreen" component={ClassicScreen} options={{headerShown: false}} />
          <Stack.Screen name="TimeChallengeScreen" component={TimeChallengeScreen} options={{headerShown: false}} />
          <Stack.Screen name="ProgressionScreen" component={ProgressionScreen} options={{headerShown: false}} />
          <Stack.Screen name="GuideScreen" component={GuideScreen} options={{headerShown: false}} /> 
          <Stack.Screen name="ClassicThemeOneScreen" component={ClassicThemeOneScreen} options={{headerShown: false}} /> 
          <Stack.Screen name="ClassicThemeTwoScreen" component={ClassicThemeTwoScreen} options={{headerShown: false}} />
          <Stack.Screen name="ClassicThemeThreeScreen" component={ClassicThemeThreeScreen} options={{headerShown: false}} />
          <Stack.Screen name="TimeChallengeThemeOneScreen" component={TimeChallengeThemeOneScreen} options={{headerShown: false}} /> 
          <Stack.Screen name="TimeChallengeThemeTwoScreen" component={TimeChallengeThemeTwoScreen} options={{headerShown: false}} /> 
          <Stack.Screen name="TimeChallengeThemeThreeScreen" component={TimeChallengeThemeThreeScreen} options={{headerShown: false}} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
    
  );
}

