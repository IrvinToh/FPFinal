import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const MainMenuScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#ff9a8b', '#ff6a88', '#d9a7c7', '#957DAD']} style={styles.container}>
      <View>
        <Text style={styles.title}>Guess the Word!</Text>
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
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 3, 
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    margin: '2%',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    fontSize: 25,

  },
});

export default MainMenuScreen;