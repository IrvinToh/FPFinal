import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import ClassicTopicOneScreen from '../Screens/ClassicTopicOneScreen.js';  
import { NavigationContainer } from '@react-navigation/native';
import * as utils from '../utils.js';
import { Alert } from 'react-native'; 
//Mock navigation object to be used for testing purpose
const mockNavigation = {
    navigate: jest.fn(),
  };


  

describe('ClassicTopicOneScreen', () => {

    
    //Test 1: To test if title renders correctly
    it('Title is displayed and rendered correctly', () => {
        const { getByText } = render(
            <NavigationContainer>
                <ClassicTopicOneScreen navigation={mockNavigation} />
            </NavigationContainer>
        );
        expect(getByText('Classic Theme One')).toBeTruthy();
    });

    //Test 2: To test if 'Previously Guessed:' is rendered correctly
    it('Title is displayed and rendered correctly', () => {
        const { getByText } = render(
            <NavigationContainer>
                <ClassicTopicOneScreen navigation={mockNavigation} />
            </NavigationContainer>
        );
        expect(getByText('Previously Guessed:')).toBeTruthy();
    });

    //Test 3: To test if the keyboard is displayed and rendered correctly
    it('keyboard is displayed and rendered correctly', async () => {
        render(
            <NavigationContainer>
                <ClassicTopicOneScreen navigation={mockNavigation} />
            </NavigationContainer>
        );

        const keyboard = screen.findByTestId('keyboard');
        expect(keyboard).toBeTruthy();
    });
    


    // Test 4: test for appropriate response when guess is correct
    it('Expected response when a guess is correct', async () => {
        jest.setTimeout(10000);
        // Render the component
        render(
          <NavigationContainer>
            <ClassicTopicOneScreen navigation={mockNavigation} />
          </NavigationContainer>
        );
      
        // Access the word to be guessed using the window.getCurrentWord function
        const wordToGuess = window.getCurrentWord(); 
      
        
        for (let char of wordToGuess) {
          fireEvent.press(screen.getAllByText(char)[0]); 
        }
      
       
        const guessButton = await screen.findByTestId('guess-button');
        fireEvent.press(guessButton);
      
       
        const feedbackCells = await waitFor(() => screen.findAllByTestId('feedback-cell'));
       
        expect(feedbackCells.length).toBe(wordToGuess.length); 

 
        for (let i = 0; i < feedbackCells.length; i++) {
          await waitFor(() => 
            expect(feedbackCells[i]).toHaveStyle({ backgroundColor: 'green' }),
            { timeout: 4000 } // Increase the timeout to allow more time for the re-render
          );
          
        }
    });

    // Test 5: test for appropriate response when guess is wrong
    it('Expected response when a guess is incorrect', async () => {
        jest.setTimeout(10000);
        // Render the component
        render(
          <NavigationContainer>
            <ClassicTopicOneScreen navigation={mockNavigation} />
          </NavigationContainer>
        );
      
        //To get the current word to be guessed
        const wordToGuess = window.getCurrentWord(); 

        //Make the last letter of the word to be guessed Z to make it incorrect
        let incorrectGuess = wordToGuess;
        incorrectGuess = incorrectGuess.slice(0, -1) + 'z';

        //Type in the incorrect Guess
        for (let char of incorrectGuess) {
          fireEvent.press(screen.getAllByText(char)[0]); 

        }
      
        //Simulate pressing Guess button
        const guessButton = await screen.findByTestId('guess-button');
        fireEvent.press(guessButton);
      
        
        const feedbackCells = await waitFor(() => screen.findAllByTestId('feedback-cell'));


      
        //Test whether number of feedback cell correspond to the length of the word to be guessed
        expect(feedbackCells.length).toBe(wordToGuess.length); 

        //Test whether each cell containing its own letter is highlighted in the appropriate colour
        for (let i = 0; i < feedbackCells.length; i++) {
            
            if (incorrectGuess[i] === wordToGuess[i]) {

              await waitFor(() => 
                expect(feedbackCells[i]).toHaveStyle({ backgroundColor: 'green' }),
                { timeout: 4000 } // Increase the timeout to allow more time for the re-render
              );
              
            } else if (wordToGuess.includes(incorrectGuess[i])) {

              await waitFor(() => 
                expect(feedbackCells[i]).toHaveStyle({ backgroundColor: 'yellow' }),
                { timeout: 4000 } // Increase the timeout to allow more time for the re-render
              );
              
            } else {

              await waitFor(() => 
                expect(feedbackCells[i]).toHaveStyle({ backgroundColor: 'red' }),
                { timeout: 4000 } // Increase the timeout to allow more time for the re-render
              );
              
            }

            
          }
    });
    
    //Test 6: Test for word length mismatch
    it('Appropriate response for word length mismatch', async () => {
      
      const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
      // Render the component
      render(
        <NavigationContainer>
          <ClassicTopicOneScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    
      //To get the current word to be guessed
      const wordToGuess = window.getCurrentWord(); 

      //Remove the last letter of the guess to make the guess length a mistmatch with the length of the word to be guessed
      let mismatchGuess = wordToGuess;
      mismatchGuess = mismatchGuess.slice(0, -1);
      lengthOfWordToBeGuessed = wordToGuess.length;

      //Type in the incorrect Guess
      for (let char of mismatchGuess) {
        fireEvent.press(screen.getAllByText(char)[0]);  
      }
    
      //Simulate pressing Guess button
      const guessButton = await screen.findByTestId('guess-button');
      fireEvent.press(guessButton);
      
      await waitFor(() => expect(alertSpy).toHaveBeenCalledWith(
        "Error",
        "Guess must be " + lengthOfWordToBeGuessed + " letters!",
        expect.any(Array),  
        { cancelable: true }
      ));

      alertSpy.mockRestore();
      
  });

    //Test 7: Test for the functionality of clear guess button
    it('Clear guess button clears the guess user has made', async () => {
        
     
      // Render the component
      render(
        <NavigationContainer>
          <ClassicTopicOneScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
    
      //To get the current word to be guessed
      const wordToGuess = window.getCurrentWord(); 

      
  });


    
});