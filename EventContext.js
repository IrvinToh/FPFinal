import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext); 

export const EventProvider = ({ children }) => {
  const [wordToBeSaved, setWordToBeSaved] = useState(null);
  const [savedWords, setSavedWords] = useState([]);  
  const [highScoreOne, setHighScoreOne] = useState(0);

  //function to save word and definition
  const saveWordToProgress = (wordToBeSaved, words, definitions) => {
    if (!savedWords.some(item => item.word === wordToBeSaved)) {
      const wordToBeSavedIndex = words.indexOf(wordToBeSaved);
      const definition_wordToBeSaved = definitions[wordToBeSavedIndex];
      
      setSavedWords(prevWords => [
        ...prevWords,
        { word: wordToBeSaved, definition: definition_wordToBeSaved },
      ]);
    }
  };

  //high score management
  const manageHighScore = (score) => {
    if (score > highScoreOne) {
      setHighScoreOne(score); 
    }
  }

  return (
    <EventContext.Provider value={{ wordToBeSaved, setWordToBeSaved, savedWords, saveWordToProgress, highScoreOne, setHighScoreOne, manageHighScore }}>
      {children}
    </EventContext.Provider>
  );
};

