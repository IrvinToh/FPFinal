import { LinearGradient } from 'expo-linear-gradient';
import React, {useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const answers = [
  "The purpose of this game is to enhance the English vocabulary and also provide simple entertainment at the same time for people.",
  "In this game mode, there are several topics to choose from. Choose a topic of your preference. your preference. Once the topic is chosen, words of different lengths belonging to the chosen topic are required to be guessed.A grid of cells with its length corresponding to the length of the current word to be guessed is shown. To guess the word, type into each cell a letter of the alphabet using the keyboard provided to form a word guess. Then, click on the “Guess” button to submit the word guess. After submitting the guess, each cell in the grid containing a letter would be highlighted in a colour. Yellow colour would mean the letter exists in the current word to be guessed but is not in the correct position. Green colour would mean the letter exists in the  current word to be guessed and is also in the correct position. Red colour would mean the letter does not exist in the current word to be guessed." ,
  "In this game mode, there are several topics to choose from. Choose a topic of your preference. Once the topic is chosen, words of different lengths belonging to the chosen topic are required to be guessed. A grid of cells with its length corresponding to the length of the current word to be guessed is shown. Additionally, the current word to be guessed is also shown but the letters in it are shuffled. users would have to rearrange the letters to form the current word to be guessed.    To guess the word, type into each cell a letter of the alphabet using the keyboard provided to form a word guess. Then, click on the “Guess” button to submit the word guess. After submitting the guess, each cell in the grid containing a letter would be highlighted in a colour. Yellow colour would mean the letter exists in the current word to be guessed but is not in the correct position. Green colour would mean the letter exists in the  current word to be guessed and is also in the correct position. Red colour would mean the letter does not exist in the current word to be guessed. The user would only have a finite number of lives, with one life taken for each wrong guess. The round is over when the lives are exhausted. Additionally, a time limit is also imposed. The user has to guess as many words as possible in this time limit. Once the time is up, the round is over. Lastly, for every correct guess, one point is awarded to the user. Extra time will be added to the timer too.",
  "When you click into the progression screen, a progression bar would be shown, displaying the amount of progress you have made in terms of words guessed from the classic mode. Additionally, the words you have guessed are displayed below the progression bar. Click on each word to reveal its description."
];
const GuideScreen = ({ navigation }) => {
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  //Function to reveal answer when the question is clicked on
  const showAnswer = (index) => {
    setSelectedAnswer(answers[index]);
    setAnswerModalVisible(true);
  };


  return (
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Guide</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.qnsContainer}>
          <Text style={styles.qns} onPress={() => showAnswer(0)}>What is the purpose of this game?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qnsContainer} onPress={() => showAnswer(1)}>
          <Text style={styles.qns}> How does the classic mode work?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qnsContainer} onPress={() => showAnswer(2)}>
          <Text style={styles.qns}> How does the time challenge mode work?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qnsContainer} onPress={() => showAnswer(3)}>
          <Text style={styles.qns}> How does progression work?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qnsContainer} onPress={() => navigation.navigate('MainMenuScreen')}> 
          <Text style={styles.qns}>Return</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={answerModalVisible}
        onRequestClose={() => setAnswerModalVisible(false)}>
        <View style={styles.answerModalContainer}>
          <View style={styles.answerModalContent}>
            <Text style={styles.ans}>{selectedAnswer}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAnswerModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontWeight: 'bold',
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
  answerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  answerModalContent: {
    backgroundColor: '#360c85',
    padding: 20,
    borderRadius: 10,
    width: width * 0.95,
  },
  ans: {
    fontSize: width * 0.04,
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0072ff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  
});

export default GuideScreen;