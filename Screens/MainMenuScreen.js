import React from 'react';
import { View, Text, Button } from 'react-native';

const MainMenuScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Guess the Word!</Text>
      <Button
        title="Classic"
        onPress={() => navigation.navigate('GameModeOne')}  // Navigate to the classic screen
      />
      <Button
        title="Time challenge"
        onPress={() => navigation.navigate('GameModeTwo')}  // Navigate to the time challenge screen
      />
    </View>
  );
};

export default MainMenuScreen;