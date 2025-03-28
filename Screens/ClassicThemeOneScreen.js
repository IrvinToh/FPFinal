import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Dimensions, Alert, Animated } from 'react-native';
import { useEventContext } from '../EventContext';

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
const ClassicThemeOneScreen = ({ navigation }) => {

    const { setWordToBeSaved } = useEventContext();

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
    const [optionsMenuVisibility, setOptionsMenuVisibility] = useState(false);
    const [optionsMenuAnimation] = useState(new Animated.Value(0));
    const [currentDescription, setCurrentDescription] = useState('');


    //responsive sizes
    const titleFontSize = width * 0.08;
    const themeFontSize = width * 0.08;
    const previouslyGuessedWordFontSize = width * 0.05;
    const cellWidth = width * 0.09;
    const cellHeight = height * 0.06;
    const cellTextSize = width * 0.06;
    const keyboardMarginTop = height * 0.03;
    const keyWidth = width * 0.09;
    const keyHeight = height * 0.07;
    const keyTextSize = width * 0.06;
    const keyboardWidth = width * 0.95;
    const keyboardHeight = height * 0.27;
    const backspaceKeyWidth = width * 0.2;
    const returnToClassicThemesButtonWidth = width * 0.94;
    const returnToClassicThemesButtonHeight = height * 0.05;
    const returnToClassicThemesButtonMarginTop = height * 0.01;
    const cellRowWidth = width * 0.95;
    const cellRowHeight = height * 0.08;

    //to pick a word from the list of words to be guessed
    const getRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)].toLowerCase();
    }

    useEffect(() => {
        const newWord = getRandomWord();
        setCurrentWordToBeGuessed(newWord);
        setLengthOfWordToBeGuessed(newWord.length);
        getCurrentDescription(newWord);
        
    }, []); 

    const toggleOptionsMenuVisibility = () => {
      if (optionsMenuVisibility) {
        Animated.timing(optionsMenuAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(optionsMenuAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
      setOptionsMenuVisibility(!optionsMenuVisibility);
    }

    //Determines whether the players got their guesses right
    const handleGuess = () => {
        if (playerGuess.length === lengthOfWordToBeGuessed) {
            const playerGuessSmallLetters = playerGuess.toLowerCase(); 
            const newColouredFeedback = getColouredFeedback(playerGuessSmallLetters);
            setColouredFeedback(newColouredFeedback);
            //Player guess is compared with the current word to be guessed
            if (playerGuessSmallLetters === currentWordToBeGuessed) { 
            setWordGuessedCorrectly(true); 
            setWordToBeSaved(currentWordToBeGuessed);
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
            setPreviousWordGuessed(playerGuess);
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
        }
    };

  

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
        if(optionsMenuVisibility)
        {
          toggleOptionsMenuVisibility();
        }
        getCurrentDescription();
    };

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
      };
    };
    
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

  const getCurrentDescription = (currentWord) => {
    let currentWordIndex = words.indexOf(currentWord);
    let getCurrentDescription = definitions[currentWordIndex];
    setCurrentDescription(getCurrentDescription);
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

  useEffect(() => {

    getCurrentDescription(currentWordToBeGuessed);
  }, [currentWordToBeGuessed]); 



  //function for the layout of the onscreen keyboard
  const OnScreenKeyboard = () => {
    const rows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];

    return (
      <View style={[styles.keyboard, {marginTop: keyboardMarginTop}, {height: keyboardHeight}, {width: keyboardWidth}]}  testID="keyboard" >
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
    <LinearGradient colors={['#4facfe', '#00f2fe', '#00c6ff', '#0072ff']} style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <View style={styles.innerTopContainer}>
              <View style={styles.topRightOuterContainer}>
                <View style={styles.topLeftContainer}>
                  <Text style={[styles.title, { fontSize: themeFontSize }, {color: 'white'}]}>Theme</Text>
                </View>
                <View style={styles.topLeftContainer}>
                  <Text style={[styles.title, { fontSize: previouslyGuessedWordFontSize }, {color: 'white'}]}> Previously Guessed </Text>
                </View>
              </View>
              <View style={styles.topRightOuterContainer}>
                <View style={styles.topRightContainer}>
                  <Text style={[styles.title, { fontSize: titleFontSize }]}>Animals</Text>
                </View>
                <View style={styles.topRightContainer}>
                  <Text style={[styles.title, { fontSize: previouslyGuessedWordFontSize }]}> {previousWordGuessed}</Text>
                </View>
              </View>
            </View> 
            <View style={styles.descriptionContainer}><Text style={styles.descriptionText}>{currentDescription}</Text></View> 
          </View>
          <View style={[styles.row, {width: cellRowWidth}, {height: cellRowHeight}]} data-testid="feedback-row">
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
          <View style={styles.secondContainer}>
            <TouchableOpacity style={styles.guessButton} onPress={handleGuess} testID="guess-button">
              <Text style={styles.buttonText}>Guess</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.guessButton} onPress={toggleOptionsMenuVisibility} testID="guess-button">
              <Text style={styles.buttonText}>Options ⚙️</Text>
            </TouchableOpacity> 
          </View>

          <Animated.View style={[
            styles.optionsContainer,
            {
              transform: [
                {
                  translateY: optionsMenuAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [800, 0], 
                  }),
                },
              ],
            },
          ]}>
            <TouchableOpacity style={styles.optionsButton} onPress={getNextWord} testID="get-next-word-button">
              <Text style={styles.buttonText}>Skip ⏭️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={getHint} testID="get-hint-button">
              <Text style={styles.buttonText}>Hint💡</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={getAnswer} testID="reveal-ans-button">
              <Text style={styles.buttonText}>Reveal Answer 📜</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={toggleOptionsMenuVisibility} testID="reveal-ans-button">
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
          
          <OnScreenKeyboard/>
          <TouchableOpacity style={[styles.guessButton, {height: returnToClassicThemesButtonHeight}, {width: returnToClassicThemesButtonWidth}, {marginTop: returnToClassicThemesButtonMarginTop}]} onPress={() => navigation.navigate('ClassicScreen')}>
            <Text style={styles.buttonText}>Return</Text>
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
  topContainer: {
    flexDirection: 'column',
    backgroundColor: '#360c85',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    width: width * 0.95,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTopContainer: {
    flexDirection: 'row',
    
    
  },
  topLeftContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '35%',
  },
  topRightContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10, 
    marginBottom: 10,
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  topRightOuterContainer: {
    flex: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  secondContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,

  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
    width: '90%',
    alignItems: 'center',
    top: height * 0.2,
    left: width * 0.1,
    right: width * 0.1,
    width: width * 0.8,

  },
  title: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#360c85',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,

  },
  guessButton: {
    alignItems: 'center', 
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#360c85',
    marginBottom: 30,
    height: height * 0.06,
    width: width * 0.45,
    padding: 5,
  },
  optionsButton: {
    alignItems: 'center', 
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#360c85',
    marginBottom: 30,
    height: height * 0.06,
    width: width * 0.6,
    padding: 5,
  },
  keyboard: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#360c85',
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
    borderRadius:15,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.06,
    
  },
  descriptionContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '100%',
    height: '30%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },

});

export default ClassicThemeOneScreen;