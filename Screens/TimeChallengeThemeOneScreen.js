import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');
const words = ['yank', 'mother', 'bravo', 'oompaa']; // A list of words to be guessed

const TimeChallengeThemeOneScreen = ({ navigation }) => {


    //use states
    const [playerGuess, setPlayerGuess] = useState('');
    const [colouredFeedback, setColouredFeedback] = useState(new Array(lengthOfWordToBeGuessed).fill(''));
    const [message, setMessage] = useState('');
    const [wordGuessedCorrectly, setWordGuessedCorrectly] = useState(false);
    const [currentWordToBeGuessed, setCurrentWordToBeGuessed] = useState('');
    const [lengthOfWordToBeGuessed, setLengthOfWordToBeGuessed] = useState(0);
    const [wrongLettersGuessed, setWrongLettersGuessed] = useState([]);
    const [jumbledWord, setJumbledWord] = useState('');
    const [timer, setTimer] = useState(60);
    const [timerStatus, setTimerStatus] = useState(false);
    const [lives, setLives] = useState(5);
    const [round, setRound] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, sethighScore] = useState(0);
    const [startRoundButtonIsVisible, setStartRoundButtonIsVisible] = useState(true);

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
    const jumbledWordFontSize = width * 0.05;
    const upperContainerFontSize = width * 0.05;
    const subsetContainerWidth = width * 0.375;
    const subsetContainerHeight = height * 0.1;


    //resets the states to prepare for a new round
    const startRound = () => {
      setRound(true);
      setPlayerGuess('');
      setColouredFeedback(['', '', '', '', '']);
      setMessage('');
      setWordGuessedCorrectly(false);
      setLives(5); // Reset lives on start
      setTimer(60); // Reset timer on start
      setTimerStatus(true);
      setScore(0);
      setStartRoundButtonIsVisible(false);
      
    }

    //function to end the current round
    const endRound = () => {
      setRound(false);
      setTimerStatus(false);
      setMessage('Round over!');
      setJumbledWord('');
    }

    //to pick a word from the list of words to be guessed
    const getRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)].toLowerCase();
    }

    //shuffle words
    const jumbleWords = (word) => {
        let wordSplited = word.split('');
        for(let i=wordSplited.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [wordSplited[i], wordSplited[j]] = [wordSplited[j], wordSplited[i]];
        }
        return wordSplited.join('');
    }

    useEffect(() => {
      if(round) {
        const newWord = getRandomWord();
        const shuffledWord = jumbleWords(newWord);
        setJumbledWord(shuffledWord);
        setCurrentWordToBeGuessed(newWord);
        setLengthOfWordToBeGuessed(newWord.length);
        setTimerStatus(true);
      }
    }, [round]); 

    //This function handles the timer function
    useEffect(() => {
      if (timerStatus && timer > 0) {
        const interval = setInterval(() => {
          setTimer((previousTimer) => previousTimer - 1); // Decrease timer by 1 each second
        }, 1000);
    
        return () => clearInterval(interval);
      } else if (timer === 0) {
        endRound(); 
      }
    }, [timer, timerStatus]); 

    //This function triggers the end of the round when the players use up their lives
    useEffect(() => {
      if (lives === 0) {
        endRound();
      }
    }, [lives]); 

    //Determines whether the players got their guesses right
    const handleGuess = () => {
        if (playerGuess.length === lengthOfWordToBeGuessed) {
            const playerGuessSmallLetters = playerGuess.toLowerCase(); 
            const newColouredFeedback = getColouredFeedback(playerGuessSmallLetters);
            setColouredFeedback(newColouredFeedback);
            //Player guess is compared with the current word to be guessed
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
            setTimer(previousTimer => previousTimer + 5);
            setScore(previousScore => previousScore + 1);
          } else {
              // If playerGuess does not match current word to be guessed
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
            }
        } else {
          //If length of playerGuess does not match length of current word to be guessed
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
          setLives(previousLives => previousLives -1);
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
        setWordGuessedCorrectly(false);
        setPlayerGuess('');
        setColouredFeedback('');

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
        <Text style={[styles.title, { fontSize: titleFontSize }]}>Theme One</Text>
        {startRoundButtonIsVisible && (
          <TouchableOpacity style={[styles.startRoundButton, {height: getNextWordButtonHeight}, {width:getNextWordButtonWidth}]} onPress={startRound}>
            <Text>Start Round</Text>
          </TouchableOpacity>
        )}
        <View style={styles.upperContainer}>
          <View style={[styles.leftSubsetContainer, {width:subsetContainerWidth}, {height:subsetContainerHeight}]}>
            <Text style={{fontSize: upperContainerFontSize}}>Timer: {timer}s</Text>
          </View>
          <View style={[styles.rightSubsetContainer, {width:subsetContainerWidth}, {height:subsetContainerHeight}]}>
            <Text style={{fontSize: upperContainerFontSize}}>Lives: {lives}</Text>
            <Text style={{fontSize: upperContainerFontSize}}>Score: {score}</Text>
          </View> 
        </View>
        <View style={styles.scrambledWordContainer}>
          <Text style={{fontSize:jumbledWordFontSize}}>Unscramble this word</Text>
          <Text style={{fontSize:jumbledWordFontSize}}>{jumbledWord}</Text>
        </View>
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
        <OnScreenKeyboard/>
        <TouchableOpacity style={[styles.guessButton, {height: returnToClassicThemesButtonHeight}, {width: returnToClassicThemesButtonWidth}, {marginTop: returnToClassicThemesButtonMarginTop}]} onPress={() => navigation.navigate('TimeChallengeScreen')}>
          <Text>Return to Time Challenge Themes</Text>
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
      borderWidth: 2,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    submitButton: {
      alignItems: 'center', 
      borderWidth: 2,
      justifyContent: 'center',
    },
    guessButton: {
      alignItems: 'center', 
      borderWidth: 2,
      justifyContent: 'center',
    },
    keyboard: {
      flexDirection: 'column',
      justifyContent: 'center',
      borderWidth: 2,
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
      borderWidth: 2,
    },
    upperContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'Space-between',
    },
    leftSubsetContainer: {
      borderWidth: 2,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '5%',
    },
    rightSubsetContainer: {
      flexDirection: 'column',
      borderWidth: 2,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrambledWordContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '15%',
    },
    startRoundButton: {
      alignItems: 'center',
      borderWidth: 2,
      justifyContent: 'center',
      marginBottom: '2%',
    }
  
  });

export default TimeChallengeThemeOneScreen;