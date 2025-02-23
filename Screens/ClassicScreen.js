import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ClassicScreen = ({ navigation }) => {

  //responsive fontsizes
  const titleFontSize = width * 0.1;
  const buttonTextFontSize = width * 0.06;

  return (
    // LinearGradient to set background for the screen
    <LinearGradient colors={['#ff9a8b', '#ff6a88', '#d9a7c7', '#957DAD']} style={styles.container}>
      <View style={styles.innerContainer}> 
        {/* Title text*/}
        <Text style={[styles.title, { fontSize: titleFontSize }]}> Classic Themes</Text>
        {/* TouchableOpacity for theme 1 */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassicThemeOneScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Animals</Text>
        </TouchableOpacity>
        {/* TouchableOpacity for theme 2 */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassicThemeTwoScreen')}> 
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Sports</Text>
        </TouchableOpacity>
        {/* TouchableOpacity for theme 3 */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ClassicThemeThreeScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Countries</Text>
        </TouchableOpacity>
        {/* TouchableOpacity for returning to MainMenuScreen */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainMenuScreen')}>
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Return to Main Menu</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

//Styling for the UI elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
    width: '100%', 
    paddingHorizontal: 20, 
  },
  title: {
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 3, 
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: '2%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',

  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default ClassicScreen;