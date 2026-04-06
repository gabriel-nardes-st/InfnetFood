import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

const theme = {
    dark: {
      background: '#121212',    
      card: '#1E1E1E',          
      text: '#FFFFFF',           
      secondaryText: '#AAAAAA',  
      primary: '#E74C3C',       
      border: '#333333',         
      input: '#2A2A2A'           
    },
    light: {
      background: '#F8F8F8',    
      card: '#FFFFFF',           
      text: '#333333',           
      secondaryText: '#666666',  
      primary: '#E74C3C',        
      border: '#EEEEEE',         
      input: '#FFFFFF'           
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('@user_theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem('@user_theme', newValue ? 'dark' : 'light');
  };

  const colors = isDarkMode ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};