import { LinearGradient } from 'expo-linear-gradient';
import React, {useState,useRef, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const ClassicScreen = ({ navigation }) => {

  //responsive fontsizes
  const titleFontSize = width * 0.15;
  const buttonTextFontSize = width * 0.06;
  const themeContainerWidth = width * 0.9;
  const themeContainerHeight = height * 0.4;

  const [scaleOne] = useState(new Animated.Value(1));
    const [scaleTwo] = useState(new Animated.Value(1));
    const [scaleThree] = useState(new Animated.Value(1));
    const [scaleFour] = useState(new Animated.Value(1));
    
    const imageScaleValue = useRef(new Animated.Value(1)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(imageScaleValue, {
            toValue: 1.1, 
            duration: 2000, 
            useNativeDriver: true,
          }),
          Animated.timing(imageScaleValue, {
            toValue: 1, 
            duration: 2000, 
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);
  
    const onPressInOne = () => {
      Animated.spring(scaleOne, {
        toValue: 1.1, 
        useNativeDriver: true,
      }).start();
    };
  
    const onPressOutOne = () => {
      Animated.spring(scaleOne, {
        toValue: 1, 
        useNativeDriver: true,
      }).start();
    };
  
    const onPressInTwo = () => {
      Animated.spring(scaleTwo, {
        toValue: 1.1, 
        useNativeDriver: true,
      }).start();
    };
  
    const onPressOutTwo = () => {
      Animated.spring(scaleTwo, {
        toValue: 1, 
        useNativeDriver: true,
      }).start();
    };
  
    const onPressInThree = () => {
      Animated.spring(scaleThree, {
        toValue: 1.1, 
        useNativeDriver: true,
      }).start();
    };
  
    const onPressOutThree = () => {
      Animated.spring(scaleThree, {
        toValue: 1, 
        useNativeDriver: true,
      }).start();
    };
    const onPressInFour = () => {
      Animated.spring(scaleFour, {
        toValue: 1.1, 
        useNativeDriver: true,
      }).start();
    };
  
    const onPressOutFour = () => {
      Animated.spring(scaleFour, {
        toValue: 1, 
        useNativeDriver: true,
      }).start();
    };

  return (
    // LinearGradient to set background for the screen
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={styles.container}>
      {/* Title text*/}
      <View>
        <Text style={[styles.titleOne, { fontSize: titleFontSize }]}> Classic</Text>
        <Text style={[styles.titleTwo, { fontSize: titleFontSize }]}> Themes</Text>
      </View>
      
      <View style={[styles.innerContainer, {height: themeContainerHeight}, {width: themeContainerWidth}]}> 
        {/* TouchableOpacity for theme 1 */}
        <TouchableOpacity 
          style={[styles.buttonOne, { transform: [{ scale: scaleOne }] }]}
          onPressIn={onPressInOne} 
          onPressOut={onPressOutOne}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('ClassicThemeOneScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Animals</Text>
        </TouchableOpacity>
        {/* TouchableOpacity for theme 2 */}
        <TouchableOpacity 
          style={[styles.buttonTwo, { transform: [{ scale: scaleTwo }] }]}
          onPressIn={onPressInTwo} 
          onPressOut={onPressOutTwo}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('ClassicThemeTwoScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Sports</Text>
        </TouchableOpacity>
        {/* TouchableOpacity for theme 3 */}
        <TouchableOpacity 
          style={[styles.buttonThree, { transform: [{ scale: scaleThree }] }]}
          onPressIn={onPressInThree} 
          onPressOut={onPressOutThree}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('ClassicThemeThreeScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Countries</Text>
        </TouchableOpacity>
        {/* TouchableOpacity for returning to MainMenuScreen */}
        <TouchableOpacity 
          style={[styles.buttonFour, { transform: [{ scale: scaleFour }] }]}
          onPressIn={onPressInFour} 
          onPressOut={onPressOutFour}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('MainMenuScreen')}>  
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Return</Text>
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
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#360c85',
    marginTop: '5%',
  },
  titleOne: {
    fontWeight: 'bold',
    marginRight: 115,
  },
  titleTwo: {
    fontWeight: 'bold',
    marginLeft: 45,
  },
  buttonOne: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: '4%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#209e26',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

  },
  buttonTwo: { 
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: '4%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ab0ddb',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

  },
  buttonThree: { 
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: '4%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#cf7208',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

  },
  buttonFour: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: '4%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#b6bf0a',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto',
  },
});

export default ClassicScreen;