import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const words = ['yank', 'mother', 'bravo', 'charlie']; // A list of words to be guessed

const ClassicTopicOneScreen = ({ navigation }) => {


    //use states
    const [playerGuess, setPlayerGuess] = useState('');
    const [colouredFeedback, setColouredFeedback] = useState(['', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [wordGuessedCorrectly, setWordGuessedCorrectly] = useState(false);
    const [currentWordToBeGuessed, setCurrentWordToBeGuessed] = useState('');
    const [lengthOfWordToBeGuessed, setLengthOfWordToBeGuessed] = useState(0);
    const [wrongLettersGuessed, setWrongLettersGuessed] = useState([]);
    const [previousWordGuessed, setPreviousWordGuessed] = useState('Guess a word!');

    //responsive fontsizes
    const titleFontSize = width * 0.1;
    const previouslyGuessedWordFontSize = width * 0.05;
    const buttonTextFontSize = width * 0.06;
    const cellWidth = width * 0.13;
    const cellHeight = height * 0.1;
    const cellTextSize = width * 0.1;

    //to pick a word from the list of words to be guessed
    const getRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)].toLowerCase();
    }

    useEffect(() => {
        const newWord = getRandomWord();
        setCurrentWordToBeGuessed(newWord);
        setLengthOfWordToBeGuessed(newWord.length);
      }, []); 

    //Determines whether the players got their guesses right
    const handleGuess = () => {
        if (playerGuess.length === lengthOfWordToBeGuessed) {
            const playerGuessSmallLetters = playerGuess.toLowerCase();
            const newColouredFeedback = getColouredFeedback(playerGuessSmallLetters);
            setColouredFeedback(newColouredFeedback);
            if (playerGuessSmallLetters === currentWordToBeGuessed) {
            setMessage('Congratulations! You guessed it right.');
            setWordGuessedCorrectly(true);
            } else {
            setMessage('Try again!');
            setPreviousWordGuessed(playerGuess);
            }
        } else {
            setMessage('Guess must be ' + lengthOfWordToBeGuessed + ' letters!');
        }
    };

    //function for clearing the player's guess
    const clearGuess = () => {
        setPlayerGuess('');
    }

    //to pick a new word from the list of words to be guessed
    const getNextWord = () => {
        let newWord = getRandomWord();
        while (newWord === currentWordToBeGuessed) 
        { 
        newWord = getRandomWord(); 
        }
        setPreviousWordGuessed(playerGuess);
        setWordGuessedCorrectly(false);
        setPlayerGuess('');
        setColouredFeedback('');
        setMessage('');

        setCurrentWordToBeGuessed(newWord);
        setLengthOfWordToBeGuessed(newWord.length);
        setWrongLettersGuessed([]);
    }

  //assigns colour to the cells depending on the letters in it
  const getColouredFeedback = (guess) => {
    const outcome = [];
    for (let i = 0; i < lengthOfWordToBeGuessed; i++) {
      if (guess[i] === currentWordToBeGuessed[i]) {
        outcome.push('green');  // Correct letter in the right position
      } else if (currentWordToBeGuessed.includes(guess[i])) {
        outcome.push('yellow'); // Correct letter, wrong position
      } else {
        outcome.push('red');  // Incorrect letter
        setWrongLettersGuessed((previousLetters) => [...previousLetters, guess[i]]);
      }
    }
    return outcome;
  };




    return (
    <LinearGradient colors={['#ff9a8b', '#ff6a88', '#d9a7c7', '#957DAD']} style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={[styles.title, { fontSize: titleFontSize }]}> Classic Theme One</Text>
            <Text style={[styles.title, { fontSize: previouslyGuessedWordFontSize }]}> PreviouslyGuessedWord</Text>
            <View style={styles.row}>
                {Array.from({ length: lengthOfWordToBeGuessed }, (_, index) => (
                <View
                    key={index}
                    style={[
                        styles.cell,
                        colouredFeedback[index] && { backgroundColor: colouredFeedback[index] },
                        {width: cellWidth},
                        {height: cellHeight},
                    ]}
                >
                    <Text style={{fontSize: cellTextSize}}>
                        {playerGuess[index] || ''} {/* Show guessed letters */}
                    </Text>
                </View>
                ))}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={getNextWord}>
                <Text>Get Next Word</Text>
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
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  submitButton: {
    height: 40,
    margin: 5,
    alignItems: 'center', 
  },
});

export default ClassicTopicOneScreen;