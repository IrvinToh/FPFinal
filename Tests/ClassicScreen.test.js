import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ClassicScreen from '../Screens/ClassicScreen.js';  
import { NavigationContainer } from '@react-navigation/native';

//Mock navigation object to be used for testing purpose
const mockNavigation = {
    navigate: jest.fn(),
  };

describe('ClassicScreen', () => {
    //Test 1: To test if the ClassicScreen renders correctly
    it('ClassicScreen renders correctly with no issue', () => {
        const { getByText } = render(
        <NavigationContainer>
            <ClassicScreen navigation={mockNavigation} />
        </NavigationContainer>
        );
    
        // Check if the screen title is displayed in the ClassicScreen
        expect(getByText('Classic Themes')).toBeTruthy();
        // Check if the buttons are displayed in the ClassicScreen
        expect(getByText('Topic 1')).toBeTruthy();
        expect(getByText('Topic 2')).toBeTruthy();
        expect(getByText('Topic 3')).toBeTruthy();
        expect(getByText('Return to Main Menu')).toBeTruthy();
    })

    //Test 2: To test if the navigate function would be called with 'ClassicTopicOneScreen'
    it('navigates to ClassicTopicOneScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <ClassicScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        // Simulate button press
        fireEvent.press(getByText('Topic 1'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ClassicTopicOneScreen');
    });

    //Test 3: To test if the navigate function would be called with 'ClassicTopicTwoScreen'
    it('navigates to ClassicTopicTwoScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <ClassicScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        fireEvent.press(getByText('Topic 2'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ClassicTopicTwoScreen');
    });

    //Test 4: To test if the navigate function would be called with 'ClassicTopicThreeScreen'
    it('navigates to ClassicTopicThreeScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <ClassicScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        fireEvent.press(getByText('Topic 3'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ClassicTopicThreeScreen');
    });

    //Test 5: To test if the navigate function would be called with 'MainMenuScreen'
    it('navigates to MainMenuScreen on button press', () => {
        const { getByText } = render(
        <NavigationContainer>
            <ClassicScreen navigation={mockNavigation} />
        </NavigationContainer>
        );

        fireEvent.press(getByText('Return to Main Menu'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('MainMenuScreen');
    });
})