import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');
const words = ['yank', 'mother', 'bravo', 'oompaa']; // A list of words to be guessed

const ClassicThemeOneScreen = ({ navigation }) => {


    //use states
    const [playerGuess, setPlayerGuess] = useState('');
    const [colouredFeedback, setColouredFeedback] = useState(new Array(lengthOfWordToBeGuessed).fill(''));
    const [message, setMessage] = useState('');
    const [wordGuessedCorrectly, setWordGuessedCorrectly] = useState(false);
    const [currentWordToBeGuessed, setCurrentWordToBeGuessed] = useState('');
    const [lengthOfWordToBeGuessed, setLengthOfWordToBeGuessed] = useState(0);
    const [wrongLettersGuessed, setWrongLettersGuessed] = useState([]);
    const [previousWordGuessed, setPreviousWordGuessed] = useState('Guess a word!');
    const [hint, setHint] = useState('');

    //responsive sizes
    const titleFontSize = width * 0.1;
    const previouslyGuessedWordFontSize = width * 0.05;
    const buttonTextFontSize = width * 0.06;
    const cellWidth = width * 0.15;
    const cellHeight = height * 0.08;
    const cellTextSize = width * 0.06;
    const getNextWordButtonWidth = width * 0.8;
    const getNextWordButtonHeight = height * 0.04;
    const guessButtonWidth = width * 0.39;
    const guessButtonHeight = height * 0.04;
    const guessButtonMarginTop = height * 0.045;
    const GuessButtonMargin = width * 0.01
    const keyboardMarginTop = height * 0.03;
    const keyWidth = width * 0.09;
    const keyHeight = height * 0.07;
    const keyTextSize = width * 0.06;
    const backspaceKeyWidth = width * 0.13;
    const returnToClassicThemesButtonWidth = width * 0.94;
    const returnToClassicThemesButtonHeight = height * 0.05;
    const returnToClassicThemesButtonMarginTop = height * 0.01;

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
            setWordGuessedCorrectly(true);
            Alert.alert(
              "Result",
              "Congratulations, You got the correct answer!",
              [
                {
                  text: "Next Word",
                  onPress: () => getNextWord(),
                }
              ],
              {cancelable: true}
            )
            } else {
              Alert.alert(
                "Error",
                "Try again",
                [
                  {
                    text: "OK",
                    onPress: () => console.log('Error acknowledged(Wrong Guess)'),
                  }
                ],
                {cancelable: true}
              )
            setPreviousWordGuessed(playerGuess);
            }
        } else {
          Alert.alert(
            "Error",
            "Guess must be " + lengthOfWordToBeGuessed + " letters!",
            [
              {
                text: "OK",
                onPress: () => console.log('Error acknowledged(Insufficient letters)'),
              }
            ],
            {cancelable: true}
          )
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
        setPreviousWordGuessed('');
        setWordGuessedCorrectly(false);
        setPlayerGuess('');
        setColouredFeedback('');
        setMessage('');
        setHint('');

        setCurrentWordToBeGuessed(newWord);
        setLengthOfWordToBeGuessed(newWord.length);
        setWrongLettersGuessed([]);
    }

  //assigns colour to the cells depending on the letters in it
  const getColouredFeedback = (guess) => {
    const outcome = [];
    const wordCopy = [...currentWordToBeGuessed]; // Make a copy of the word to track remaining unmatched letters
  
    // First pass: Mark greens (correct letter, correct position)
    for (let i = 0; i < lengthOfWordToBeGuessed; i++) {
      if (guess[i] === wordCopy[i]) {
        outcome[i] = 'green';
        wordCopy[i] = null; // Remove the letter from the word copy, as it is already matched
      } else {
        outcome[i] = null; // Initialize empty if not green
      }
    }
    
    // Second pass: Mark yellows (correct letter, wrong position)
    for (let i = 0; i < lengthOfWordToBeGuessed; i++) {
      if (outcome[i] === null) { // Only check for yellow if it's not already green
        const letter = guess[i];
        const indexInWord = wordCopy.indexOf(letter);
  
        if (indexInWord !== -1) {
          outcome[i] = 'yellow';
          wordCopy[indexInWord] = null; // Remove this letter from wordCopy
        } else {
          outcome[i] = 'red'; // If the letter doesn't exist in the word anymore, mark as red
        }
      }
    }
  
    return outcome;
  };

  const getRandomLetterForHint = () => {
    return Math.floor(Math.random() * (currentWordToBeGuessed.length))
  }

  const getHint = () => {
    Alert.alert(
      "Hint",
      currentWordToBeGuessed[getRandomLetterForHint()],
      [
        {
          text: "OK",
          onPress: () => console.log("Hint acknowledged")
        }
      ],
      {cancelable: true}
    )
  }


  const getAnswer = () => {
    Alert.alert(
      "Answer",
      currentWordToBeGuessed,
      [
        {
          text: "OK",
          onPress: () => console.log("Answer acknowledged")
        }
      ],
      {cancelable: true}
    )
  }

  //handles the logic for the on screen keyboard
  const handleKeyPressInOnScreenKeyboard = (key) => {
    if (key === 'backspace') {
      setPlayerGuess((guess) => guess.slice(0, -1)); // Remove last character
    } else if (playerGuess.length < lengthOfWordToBeGuessed) {
      setPlayerGuess((guess) => guess + key);
    }
  };

  const currentWordRef = useRef(currentWordToBeGuessed);  // Initialize the ref

  useEffect(() => {
    currentWordRef.current = currentWordToBeGuessed;  
  }, [currentWordToBeGuessed]);

  //function to expose the word for testing purposes
  const getCurrentWord = () => {
    return currentWordRef.current; 
  };

  // Expose this function to tests
  if (process.env.NODE_ENV === 'test') {
    window.getCurrentWord = getCurrentWord;  
  }


  //function for the layout of the onscreen keyboard
  const OnScreenKeyboard = () => {
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];

    return (
      <View style={[styles.keyboard, {marginTop: keyboardMarginTop}]}  testID="keyboard" >
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyboardRow}>
            {row.map((letter) => (
              <TouchableOpacity
                key={letter}
                onPress={() => handleKeyPressInOnScreenKeyboard(letter)}
                style={[
                  styles.key,
                  {width: keyWidth},
                  {height: keyHeight},
                  wrongLettersGuessed.includes(letter) && { backgroundColor: 'red' },
                ]}
                disabled={wrongLettersGuessed.includes(letter)}
                testID="key"
              >
                <Text style={{fontSize: keyTextSize}}>{letter}</Text>
              </TouchableOpacity>
            ))}
            {rowIndex === rows.length - 1 && (
              <TouchableOpacity
                onPress={() => handleKeyPressInOnScreenKeyboard('backspace')}
                style={[
                  styles.key,
                  {width: backspaceKeyWidth},  
                  {height: keyHeight},
                ]}
              >
                <Text style={styles.keyText}>Backspace</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  };




    return (
    <LinearGradient colors={['#ff9a8b', '#ff6a88', '#d9a7c7', '#957DAD']} style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={[styles.title, { fontSize: titleFontSize }]}> Classic Theme One</Text>
            <Text style={[styles.title, { fontSize: previouslyGuessedWordFontSize }]}> Previously Guessed: </Text>
            <Text style={[styles.title, { fontSize: previouslyGuessedWordFontSize }]}> {previousWordGuessed}</Text>
            <View style={styles.row} data-testid="feedback-row">
                {Array.from({ length: lengthOfWordToBeGuessed }, (_, index) => (
                <View
                    key={index}
                    style={[
                        styles.cell,
                        colouredFeedback[index] && { backgroundColor: colouredFeedback[index] },
                        {width: cellWidth},
                        {height: cellHeight},
                    ]}
                    testID={'feedback-cell'}
                >
                    <Text style={{fontSize: cellTextSize}}>
                        {playerGuess[index] || ''} {/* Show guessed letters */}
                    </Text>
                </View>
                ))}
            </View>
            <TouchableOpacity style={[styles.submitButton, {height: getNextWordButtonHeight}, {width: getNextWordButtonWidth}]} onPress={getNextWord} testID="get-next-word-button">
                <Text>Get Next Word</Text>
            </TouchableOpacity>
            <View style={[styles.secondContainer, {marginTop: guessButtonMarginTop}]}>
              <TouchableOpacity style={[styles.guessButton, {height: guessButtonHeight}, {width: guessButtonWidth}, {margin: GuessButtonMargin}]} onPress={handleGuess} testID="guess-button">
                  <Text>Guess</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.guessButton, {height: guessButtonHeight}, {width: guessButtonWidth}, {margin: GuessButtonMargin}]} onPress={clearGuess} testID="clear-guess-button">
                  <Text>Clear Guess</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.secondContainer, {marginTop: guessButtonMarginTop}]}>
              <TouchableOpacity style={[styles.guessButton, {height: guessButtonHeight}, {width: guessButtonWidth}, {margin: GuessButtonMargin}]} onPress={getHint} testID="get-hint-button">
                  <Text>Hint</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.guessButton, {height: guessButtonHeight}, {width: guessButtonWidth}, {margin: GuessButtonMargin}]} onPress={getAnswer} testID="reveal-ans-button">
                  <Text>Reveal Answer</Text>
              </TouchableOpacity>
            </View>
            <OnScreenKeyboard/>
            <TouchableOpacity style={[styles.guessButton, {height: returnToClassicThemesButtonHeight}, {width: returnToClassicThemesButtonWidth}, {marginTop: returnToClassicThemesButtonMarginTop}]} onPress={() => navigation.navigate('ClassicScreen')}>
              <Text>Return to classic Themes</Text>
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
  secondContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    margin: 5,
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',

  },
  submitButton: {
    alignItems: 'center', 
    borderWidth: 1,
    justifyContent: 'center',
  },
  guessButton: {
    alignItems: 'center', 
    borderWidth: 1,
    justifyContent: 'center',
  },
  keyboard: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 5,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  key: {
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

});

export default ClassicThemeOneScreen;