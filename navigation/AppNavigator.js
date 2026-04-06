import React, { useState } from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator'
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [userToken, setUserToken] = useState(null);
  
  const entrar = (email, senha) => {
    if (email === 'admin@admin.com' && senha === '123') {
      setUserToken('token-valido'); 
    } else {
      alert('Dados incorretos');
    }
  };

  const sair = () => setUserToken(null);

  return (
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name='Home' component={HomeNavigator} />
    // </Stack.Navigator>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onSignIn={entrar} />}
        </Stack.Screen>
      ) : 
        <Stack.Screen name='Home' component={HomeNavigator} />
      }
    </Stack.Navigator>
  );
}

export default AppNavigator;
