import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useEffect } from 'react';
import { useEventContext } from '../EventContext';
import { ProgressBar } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

const words = ['giraffe', 'elephant','chameleon', 'rabbit', 'panda', 'whale', 'bear', 'cheetah', 'lion', 'tiger']; // A list of words to be guessed
const definitions = [
  'Tallest living animal, has long legs and a highly elongated neck',
  'has a trunk, and two large ivory tusks jutting from the upper jaw',
  'able to change color and project its long tongue', 
  'has long ears, long hind legs and a short, fluffy tail', 
  'black and white',
  'Large marine mammal',
  'has claws and some of its species hibernate',
  'credited with being the fastest terrestrial animal',
  'A big cat, known sometimes as the king of the jungle',
  'belongs to the cat family, has black stripes'
]

const words2 = ['basketball', 'tennis','gootball', 'cricket', 'gencing', 'volleyball', 'archery', 'bowling', 'taekwondo', 'golf']; // A list of words to be guessed
const definitions2 = [
  'A sport in which two opposing teams of five players strive to put a ball through a hoop.',
  ' A sport played by two players (or four in doubles), who alternately strike the ball over a net using racquets',
  'a game in which two teams each contend to get a round ball into the other team\'s goal primarily by kicking the ball.', 
  'A game played outdoors with bats and a ball between two teams of eleven, popular in England and many Commonwealth countries.', 
  'The art or sport of duelling with swords',
  'A game played on a rectangular court between two teams of two to six players which involves striking a ball back and forth over a net',
  'The practice or sport of shooting arrows with a bow.',
  'A game played by rolling a ball down an alley and trying to knock over a triangular group of ten pins',
  'A martial arts form from Korea, known for its elaborate kicking techniques.',
  'A ball game in which the objective is to hit a ball into each of a series of holes in the minimum number of strokes'
]

const words3 = ['japan', 'china','france', 'mongolia', 'russia', 'india', 'indonesia', 'australia', 'germany', 'italy']; // A list of words to be guessed
const definitions3 = [
  'A country located in asia and famous for its animated films',
  'A country with one of the greatest population in the world',
  'A country located in Western Europe and is home to the Eiffel Tower', 
  'A landlocked country bordered by Russia and China', 
  'Largest by land area',
  'Located in South Asia, it is home to the Taj Mahal, a famous tourist spot',
  'Located in South-east Asia, it is home to a famous touist spot known as Bali.',
  'Famous for its kangaroos',
  'Located in central Europe and is also the birthplace of famous composers like Beethoven',
  'Located in Southern Europe, it is home to the famous city of Venice.'
]


const ProgressionScreen = ({ navigation }) => {

  //Responsive sizes
  const innerContainerWidth = width * 0.9;
  const innerContainerHeight = height * 0.2;
  const progressionFont = width * 0.13;
  const screenPaddingTop = height * 0.1;
  const descriptionTextFont = width * 0.07;
  const wordTextFont = width * 0.1;
  const definitionTextFont = width * 0.05;

  const { wordToBeSaved, savedWords, saveWordToProgress } = useEventContext();
  const [interactedWords, setInteractedWords] = useState(null);

  
  //determines which parameter to be passed into the function and call it
  useEffect(() => {
    if (wordToBeSaved) {
      if(words.includes(wordToBeSaved)) {
        saveWordToProgress(wordToBeSaved, words, definitions);
      }
      else if(words2.includes(wordToBeSaved)) {
        saveWordToProgress(wordToBeSaved, words2, definitions2);
      }
      else if(words3.includes(wordToBeSaved)) {
        saveWordToProgress(wordToBeSaved, words3, definitions3);
      }
    }

    Alert.alert(
      "Instructions",
      "Click on a word to reveal its description.",
      [
        {
          text: "Got it",
          onPress: () => console.log('Instruction acknowledged'),
        }
      ],
      { cancelable: true }
    );
  }, [wordToBeSaved, saveWordToProgress]);

  
  //handle interacted word state
  const handleInteractedWords = (interactedWord) => {
    setInteractedWords(prevInteractedWord => prevInteractedWord === interactedWord ? null : interactedWord);
  }

  //Get progress function 
  const getProgress = () => {
    const totalWords = words.length + words2.length + words3.length;
    const guessedWords = savedWords.length;
    return guessedWords / totalWords; 
  };

  //calculate progress percentage function
  const getProgressPercentage = () => {
    const totalWords = words.length + words2.length + words3.length;
    const guessedWords = savedWords.length;
    return (guessedWords / totalWords) * 100;
  };

  



  return (
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={[styles.container, {paddingTop: screenPaddingTop}]}>
      <View style = {[styles.progressContainer, {height: innerContainerHeight}, {width: innerContainerWidth}]}>
        <Text style = {[styles.progressionWord, {fontSize: progressionFont}]}>Progression</Text>
      </View>
      <View style={styles.secondContainer}>
        <Text style={[styles.descriptionText, { fontSize: descriptionTextFont }]}>
          {Math.round(getProgressPercentage()) === 0
          ? "Start by guessing a word!" 
          : `You are ${Math.round(getProgressPercentage())}% there!`} 
        </Text>

      </View>
      <View>
        <ProgressBar style={styles.progressBar} progress={getProgress()} color="#360c85" />
      </View>
      <ScrollView style={{ flex: 1}}>

        {savedWords.map((item, index) => (
          <TouchableOpacity style={styles.wordDisplay} key={index} onPress={() => handleInteractedWords(item.word)}>
            <View key={index} style = {[styles.innerContainer, {height: innerContainerHeight}, {width: innerContainerWidth}]}>
              <Text style={interactedWords === item.word ? [{fontSize: definitionTextFont}, styles.wordDefText]: [{fontSize: wordTextFont},  styles.wordDefText]}>{interactedWords === item.word ? item.definition : item.word}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('MainMenuScreen')}>
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
    
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#360c85',

  },
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
  },
  progressionWord: {
    fontWeight: 'bold',
  },
  descriptionText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  wordDefText: {
    fontWeight: 'bold',
    borderWidth: 2,
    borderRadius: 20,
    height: height * 0.15, 
    width: width * 0.8,
    padding: 5,
    backgroundColor: 'white',

    
  },
  progressBar: {
    width: width * 0.95,
    height: height * 0.05,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
  },
  returnButton: {
    width: width * 0.95,
    height: height * 0.05,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#360c85', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButtonText: {
    fontSize: width * 0.05,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProgressionScreen;