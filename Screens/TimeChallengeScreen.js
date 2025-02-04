import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TimeChallengeScreen = ({ navigation }) => {

  //responsive fontsizes
  const titleFontSize = width * 0.1;
  const buttonTextFontSize = width * 0.06;

  return (
    <LinearGradient colors={['#ff9a8b', '#ff6a88', '#d9a7c7', '#957DAD']} style={styles.container}>
      <View>
        <Text style={[styles.title, { fontSize: titleFontSize }]}>Time Challenge Themes</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TimeChallengeThemeOneScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Theme 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassicScreen')}> 
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Theme 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassicScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Theme 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainMenuScreen')}>
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Return to Main Menu</Text>
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
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 3, 
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    margin: '2%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',

  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default TimeChallengeScreen;