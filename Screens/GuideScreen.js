import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const GuideScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Guide</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.qnsContainer}>
          <Text style={styles.qns}> How does the classic mode work?</Text>
        </View>
        <View style={styles.qnsContainer}>
          <Text style={styles.qns}> How does the time challenge mode work?</Text>
        </View>
        <View style={styles.qnsContainer}>
          <Text style={styles.qns}>What is the purpose of this game?</Text>
        </View>
      </ScrollView>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  title: {
    fontSize: width * 0.17, 
  },
  scrollContent: {
    flexGrow: 1,           
    justifyContent: 'flex-start',  
    alignItems: 'center',  
    padding: 10,      
  },
  qnsContainer: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 6,
    width: width * 0.95,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#360c85',
    marginBottom: 10,
  },
  qns: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
  },
  
});

export default GuideScreen;