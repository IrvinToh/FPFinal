import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const ClassicScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#ff9a8b', '#ff6a88', '#d9a7c7', '#957DAD']} style={styles.container}>
      <View>
        
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
});

export default ClassicScreen;