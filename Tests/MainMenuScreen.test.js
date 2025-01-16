import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainMenuScreen from '../Screens/MainMenuScreen.js';  
import { NavigationContainer } from '@react-navigation/native';


//Mock navigation object to be used for testing purpose
const mockNavigation = {
    navigate: jest.fn(),
  };

  //Test suite 
describe('MainMenuScreen', () => {
    //Test 1: To test if the components of the main menu screen renders properly
    it('Main Menu Screen renders correctly with no issue', () => {
        const { getByText } = render(
        <NavigationContainer>
            <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        // Check if the Game title is displayed in the main menu screen
        expect(getByText('Guess the Word!')).toBeTruthy();
        // Check if the buttons are displayed in the main menu screen
        expect(getByText('Classic')).toBeTruthy();
        expect(getByText('Time Challenge')).toBeTruthy();
        expect(getByText('Progression')).toBeTruthy();
        expect(getByText('Guide')).toBeTruthy();
    });

    //Test 2: To test if the navigate function would be called with 'ClassicScreen'
    it('navigates to ClassicScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        // Simulate button press
        fireEvent.press(getByText('Classic'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ClassicScreen');
    });

    //Test 3: To test if the navigate function would be called with 'TimeChallengeScreen'
    it('navigates to TimeChallengeScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        fireEvent.press(getByText('Time Challenge'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('TimeChallengeScreen');
    });

    //Test 4: To test if the navigate function would be called with 'ProgressionScreen'
    it('navigates to ProgressionScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        fireEvent.press(getByText('Progression'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ProgressionScreen');
    });

    //Test 5: To test if the navigate function would be called with 'GuideScreen'
    it('navigates to GuideScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        fireEvent.press(getByText('Guide'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('GuideScreen');
    });
});