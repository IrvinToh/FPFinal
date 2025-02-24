import { LinearGradient } from 'expo-linear-gradient';
import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Image, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const MainMenuScreen = ({ navigation }) => {

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


  //responsive fontsizes
  const titleWidth = width * 0.9;
  const titleHeight = height * 0.3;
  const buttonTextFontSize = width * 0.06;

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Animated.Image 
          source={require('../images/ImageTwo.png')} 
          resizeMode="contain" 
          style = {[{width: titleWidth}, {height: titleHeight}, {transform: [{scale: imageScaleValue}]}]}
        />
        <TouchableOpacity
          style={[styles.buttonOne, { transform: [{ scale: scaleOne }] }]}
          onPressIn={onPressInOne} 
          onPressOut={onPressOutOne}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('ClassicScreen')}  // Navigate to the classic screen

        >
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Classic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonTwo, { transform: [{ scale: scaleTwo }] }]}
          onPressIn={onPressInTwo} 
          onPressOut={onPressOutTwo}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('TimeChallengeScreen')}  // Navigate to the time challenge screen
        >
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Time Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonThree, { transform: [{ scale: scaleThree }] }]}
          onPressIn={onPressInThree} 
          onPressOut={onPressOutThree}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('ProgressionScreen')}  // Navigate to the progression screen
        >
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Progression</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonFour, { transform: [{ scale: scaleFour }] }]}
          onPressIn={onPressInFour} 
          onPressOut={onPressOutFour}
          activeOpacity={1.0}
          onPress={() => navigation.navigate('GuideScreen')}  // Navigate to the guide screen
        >
          <Text style={[styles.buttonText, {fontSize: buttonTextFontSize}]}>Guide</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
    
  );
};

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
  buttonOne: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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
    margin: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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
    margin: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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
    margin: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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

export default MainMenuScreen;