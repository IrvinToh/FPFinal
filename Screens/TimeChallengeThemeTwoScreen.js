import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import { useEventContext } from '../EventContext';

const { width, height } = Dimensions.get('window');
const words = ['Basketball', 'Tennis','Football', 'Cricket', 'Fencing', 'Volleyball', 'Archery', 'Bowling', 'Taekwondo', 'Golf']; // A list of words to be guessed

const TimeChallengeThemeTwoScreen = ({ navigation }) => {
  const { highScoreOne, manageHighScore} = useEventContext();

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
  const [startRoundButtonIsVisible, setStartRoundButtonIsVisible] = useState(true);
  const [roundOver, setRoundOver] = useState(false);
  const [countDownModalIsVisible, setCountDownModalIsVisible] = useState(true);
  const [countDown, setCountDown] = useState(5);
  //responsive sizes
  const titleFontSize = width * 0.1;

  const cellWidth = width * 0.1;
  const cellHeight = height * 0.06;
  const cellTextSize = width * 0.06;
  const guessButtonMarginTop = height * 0.045;
  const keyboardMarginTop = height * 0.03;
  const keyHeight = height * 0.08;
  const keyTextSize = width * 0.06;
  const backspaceKeyWidth = width * 0.2;
  const returnToClassicThemesButtonWidth = width * 0.94;
  const returnToClassicThemesButtonHeight = height * 0.05;
  const returnToClassicThemesButtonMarginTop = height * 0.01;
  const jumbledWordFontSize = width * 0.05;
  const upperContainerFontSize = width * 0.05;
  const subsetContainerWidth = width * 0.375;
  const subsetContainerHeight = height * 0.1;
  const roundOverPanelWidth = width * 0.7;
  const roundOverPanelHeight = height * 0.4;
  const roundOverPanelTextSizeMain = width * 0.1;
  const roundOverPanelTextSize = width * 0.06;
  const roundOverPanelButtonWidth = width * 0.6;
  const roundOverPanelButtonHeight = height * 0.05;


  //resets the states to prepare for a new round
  const startRound = () => {
    setRound(true);
    setPlayerGuess('');
    setColouredFeedback(['', '', '', '', '']);
    setMessage('');
    setWordGuessedCorrectly(false);
    setLives(5); 
    setTimer(60); 
    setTimerStatus(true);
    setScore(0);
    setStartRoundButtonIsVisible(false);
    setRoundOver(false);
    
  }

  //function to end the current round
  const endRound = () => {
    setRound(false);
    setTimerStatus(false);
    setJumbledWord('');
    setRoundOver(true);

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

  //handles the displaying of the countdown modal
  useEffect(() => {
    if(countDownModalIsVisible && countDown > 0) {
      const countDownInt = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1);
      }, 1000);
  
      return () => clearInterval(countDownInt);
    } else if (countDown === 0) {
      setCountDownModalIsVisible(false);
      startRound();
    }
  }, [countDown, countDownModalIsVisible]); 
  
  //useEffect hook to get new word
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

  useEffect(() => {
    manageHighScore(score);
  }, [score]);

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
            setLives(previousLives => previousLives -1);
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
    let newJumbledWord = jumbleWords(newWord);
    setWordGuessedCorrectly(false);
    setPlayerGuess('');
    setColouredFeedback('');

    setCurrentWordToBeGuessed(newWord);
    setLengthOfWordToBeGuessed(newWord.length);
    setWrongLettersGuessed([]);
    setJumbledWord(newJumbledWord);
  }

  //assigns colour to the cells depending on the letters in it
  const getColouredFeedback = (playerGuess) => {
    const overallColourFeedback = [];
    const wordToBeGuessed = [...currentWordToBeGuessed]; 
  
    //Check for whether each letter in playerGuess matches corresponding letter in wordToBeGuessed
    //Highlights green if condition is fulfilled
    for (let i = 0; i < lengthOfWordToBeGuessed; i++) {
      if (playerGuess[i] === wordToBeGuessed[i]) {
        overallColourFeedback[i] = 'green';
        wordToBeGuessed[i] = null; 
      } else {
        overallColourFeedback[i] = null; 
      }
    }
    
    //check at each index position in coverallColourFeedback for colours assigned
    //If letter exists in wordToBeGuessed, yellow colour is assigned.
    //If letter does not exist in wordToBeGuessed, red colour is assigned. 
    for (let i = 0; i < lengthOfWordToBeGuessed; i++) {
      if (overallColourFeedback[i] === null) { 
        const letter = playerGuess[i];
        const indexInWord = wordToBeGuessed.indexOf(letter);
  
        if (indexInWord !== -1) {
          overallColourFeedback[i] = 'yellow';
          wordToBeGuessed[indexInWord] = null; 
        } else {
          overallColourFeedback[i] = 'red'; 
        }
      }
    }
  
    return overallColourFeedback;
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
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={styles.container}>
      <Modal 
        visible = {countDownModalIsVisible}
        transparent = {true}
        animationType="fade"
        onRequestClose={() => setCountDownModalIsVisible(false)}
      >
        <View style={styles.countDownModalContainer}>
          <Text style={styles.countDownText}>{countDown}</Text>
        </View>
      </Modal>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { fontSize: titleFontSize }]}>Sports</Text>
        <View style={styles.upperContainer}>
          <View style={[styles.leftSubsetContainer, {width:subsetContainerWidth}, {height:subsetContainerHeight}]}>
            <Text style={{fontSize: upperContainerFontSize}}>⏰ {timer}s</Text>
          </View>
          <View style={[styles.rightSubsetContainer, {width:subsetContainerWidth}, {height:subsetContainerHeight}]}>
            <Text style={{fontSize: upperContainerFontSize}}>❤️ {lives}</Text>
            <Text style={{fontSize: upperContainerFontSize}}>Score: {score}</Text>
          </View> 
        </View>
        <View style={styles.scrambledWordContainer}>
          <Text style={[{fontSize:jumbledWordFontSize}, {color: 'white'}]}>Unscramble this word</Text>
          <Text style={[{fontSize:jumbledWordFontSize}, {color: 'white'}]}>{jumbledWord}</Text>
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
        <TouchableOpacity style={styles.submitButton} onPress={getNextWord} testID="get-next-word-button">
          <Text style={[{color:'white'}, {fontSize: width * 0.05}]}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.secondContainer}>
          <TouchableOpacity style={styles.guessButton} onPress={handleGuess} testID="guess-button">
            <Text style={styles.guessButtonText}>Guess</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guessButton} onPress={clearGuess} testID="clear-guess-button">
            <Text style={styles.guessButtonText}>Clear Guess</Text>
          </TouchableOpacity>
        </View>
        <OnScreenKeyboard/>
        <TouchableOpacity style={[styles.guessButton, {height: returnToClassicThemesButtonHeight}, {width: returnToClassicThemesButtonWidth}, {marginTop: returnToClassicThemesButtonMarginTop}]} onPress={() => navigation.navigate('TimeChallengeScreen')}>
          <Text style={styles.guessButtonText}>Return</Text>
        </TouchableOpacity>

        {roundOver && (
          <View style = {styles.roundOverScreenOverlay}>
            <View style={[styles.roundOverPanel, {height: roundOverPanelHeight}, {width:  roundOverPanelWidth}]}>
              <Text style={[styles.roundOverPanelText, {fontSize:roundOverPanelTextSizeMain}]}>Round Over!</Text>
              <Text style={[styles.roundOverPanelText, {fontSize:roundOverPanelTextSize}]}>Current Score</Text>
              <Text style={[styles.roundOverPanelText, {fontSize:roundOverPanelTextSize}]}>{score}</Text>
              <Text style={[styles.roundOverPanelText, {fontSize:roundOverPanelTextSize}]}>High Score</Text>
              <Text style={[styles.roundOverPanelText, {fontSize:roundOverPanelTextSize}]}>{highScoreOne}</Text>
              <TouchableOpacity  style={[styles.roundOverButton, {height: roundOverPanelButtonHeight}, {width: roundOverPanelButtonWidth}]} onPress={() => startRound()}><Text style={styles.roundOverPanelText}>Try again</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.roundOverButton, {height: roundOverPanelButtonHeight}, {width: roundOverPanelButtonWidth}]} onPress={() => navigation.navigate('TimeChallengeScreen')}><Text style={styles.roundOverPanelText}>Return</Text></TouchableOpacity>
            </View>
          </View>
        )}
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
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    title: {
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      margin: 5,
      backgroundColor: '#360c85',
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.95,
      height: height * 0.08,
      borderRadius: 20,
      borderWidth: 2,
    },
    cell: {
      borderWidth: 2,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 2,
      borderRadius: 20,
  
    },
    submitButton: {
      alignItems: 'center', 
      borderWidth: 2,
      justifyContent: 'center',
      borderRadius: 20,
      width: width * 0.95,
      height: height * 0.06,
      backgroundColor: '#360c85',
    },
    guessButton: {
      alignItems: 'center', 
      borderWidth: 2,
      justifyContent: 'center',
      borderRadius: 20,
      width: 0.45 * width,
      height: 0.05 * height,
      backgroundColor: '#360c85',
    },
    guessButtonText: {
      color: 'white',
      fontSize: width * 0.05,
    },
    keyboard: {
      flexDirection: 'column',
      justifyContent: 'center',
      borderWidth: 2,
      padding: 5,
      backgroundColor: '#360c85',
      borderRadius: 20,
      width: width * 0.98,
      height: 0.3 * height,

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
      width: width * 0.09,
      height: height * 0.08,
      backgroundColor: 'white',
      borderRadius: 20,
    },
    upperContainer: {
      flexDirection: 'row',
      borderWidth: 2,
      padding: 10,
      width: width * 0.95,
      height: height * 0.15,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#360c85',
      marginTop: 20,
    },
    leftSubsetContainer: {
      borderWidth: 2,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
      flex:1,
      borderRadius: 20,
      backgroundColor: 'white',
    },
    rightSubsetContainer: {
      flexDirection: 'column',
      borderWidth: 2,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      borderRadius: 20,
      backgroundColor: 'white',
    },
    scrambledWordContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      borderWidth: 2,
      borderRadius: 20,
      width: width * 0.95,
      height: height * 0.1,
      backgroundColor: '#360c85',
      
    },
    startRoundButton: {
      alignItems: 'center',
      borderWidth: 2,
      justifyContent: 'center',
      marginBottom: '2%',
    },
    roundOverScreenOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
    },
    roundOverPanel: {
      backgroundColor: '#5a4dbd',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 3,
    },
    roundOverPanelText: {
      fontWeight: 'bold',
    },
    roundOverButton: {
      borderWidth: 5,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      marginTop: '5%',
    },
    countDownModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    countDownText: {
      fontSize: width * 0.3,
      color: 'white',
      fontWeight: 'bold',
    }


  
  });

export default TimeChallengeThemeTwoScreen;