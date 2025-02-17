// EventContext.js
import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext); // Hook to access context

export const EventProvider = ({ children }) => {
  const [wordToBeSaved, setWordToBeSaved] = useState(null);
  const [savedWords, setSavedWords] = useState([]);  

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

  return (
    <EventContext.Provider value={{ wordToBeSaved, setWordToBeSaved, savedWords, saveWordToProgress }}>
      {children}
    </EventContext.Provider>
  );
};

