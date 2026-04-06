import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigartor from './navigation/AppNavigator';
import { ThemeProvider } from './context/ThemeContext';
import * as Notifications from 'expo-notifications'; 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de notificação negada!');
      }
    }
    requestPermissions();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigartor />
      </NavigationContainer>
    </ThemeProvider>
  );
}