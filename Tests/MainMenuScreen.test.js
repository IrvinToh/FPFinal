import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainMenuScreen from '../Screens/MainMenuScreen.js';  
import { NavigationContainer } from '@react-navigation/native';

const mockNavigation = {
    navigate: jest.fn(),
  };

  describe('MainMenuScreen', () => {
    it('Main Menu Screen renders correctly with no issue', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
  
      // Check if the main menu text is displayed
      expect(getByText('Guess the Word!')).toBeTruthy();
      // Check if the buttons are displayed
      expect(getByText('Classic')).toBeTruthy();
      expect(getByText('Time Challenge')).toBeTruthy();
      expect(getByText('Progression')).toBeTruthy();
      expect(getByText('Guide')).toBeTruthy();
    });
  
    it('navigates to ClassicScreen on button press', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
  
      // Simulate button press
      fireEvent.press(getByText('Classic'));
  
      // Check if the navigate function was called with the correct screen name
      expect(mockNavigation.navigate).toHaveBeenCalledWith('ClassicScreen');
    });
  
    it('navigates to TimeChallengeScreen on button press', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
  
      fireEvent.press(getByText('Time Challenge'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('TimeChallengeScreen');
    });
  
    it('navigates to ProgressionScreen on button press', () => {
      const { getByText } = render(
        <NavigationContainer>
          <MainMenuScreen navigation={mockNavigation} />
        </NavigationContainer>
      );
  
      fireEvent.press(getByText('Progression'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('ProgressionScreen');
    });
  
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