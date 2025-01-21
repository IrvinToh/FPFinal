import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import ClassicTopicOneScreen from '../Screens/ClassicTopicOneScreen.js';  
import { NavigationContainer } from '@react-navigation/native';
import * as utils from '../utils';

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
    


    // Test: Appropriate response happens when a guess is made
    it('Expected response when a guess is made', async () => {
        jest.spyOn(utils, 'getRandomWord').mockReturnValue('yank');
        // Render the component
        render(
            <NavigationContainer>
                <ClassicTopicOneScreen navigation={mockNavigation} />
            </NavigationContainer>
        );

        // Simulate key presses to build the guess ('yank')
        fireEvent.press(screen.getByText('y'));
        fireEvent.press(screen.getByText('a'));
        fireEvent.press(screen.getByText('n'));
        fireEvent.press(screen.getByText('k'));

        // Now press the 'Guess' button
        const guessButton = await screen.findByTestId('guess-button');
        fireEvent.press(guessButton);

        // Wait for the feedback cells to be rendered
        const feedbackCells = await screen.findAllByTestId('feedback-cell');

        // Check if the number of feedback cells matches the length of the word 'yank'
        expect(feedbackCells.length).toBe(4);

        // Additional check: Ensure the feedback color for the first letter is green
        await waitFor(() => expect(feedbackCells[0]).toHaveStyle({ backgroundColor: 'green' }));
        await waitFor(() => expect(feedbackCells[1]).toHaveStyle({ backgroundColor: 'green' }));
        await waitFor(() => expect(feedbackCells[2]).toHaveStyle({ backgroundColor: 'green' }));
        await waitFor(() => expect(feedbackCells[3]).toHaveStyle({ backgroundColor: 'green' }));
    });

    
    


    
});