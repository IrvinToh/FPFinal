import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const MainMenuScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Guess the Word!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ClassicScreen')}  // Navigate to the classic screen
      >
        <Text style={styles.buttonText}>Classic</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TimeChallengeScreen')}  // Navigate to the time challenge screen
      >
        <Text style={styles.buttonText}>Time Challenge</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProgressionScreen')}  // Navigate to the progression screen
      >
        <Text style={styles.buttonText}>Progression</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GuideScreen')}  // Navigate to the guide screen
      >
        <Text style={styles.buttonText}>Guide</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {

  },
});

export default MainMenuScreen;