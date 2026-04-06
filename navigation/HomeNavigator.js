import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import Home from '../screens/Home';
import Produtos from '../screens/Produtos';
import Restaurante from '../screens/Restaurante';
import Carrinho from '../screens/Carrinho';
import Detalhes from '../screens/Detalhes';
import Checkout from '../screens/Checkout';
import Configuracoes from '../screens/Configuracoes';
import Pedidos from '../screens/Pedidos';
import Perfil from '../screens/Perfil';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {


  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {
          backgroundColor: '#E74C3C',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 22,
          letterSpacing: 0.5,
        },
        headerTitle: 'InfnetFood',
        headerLeft: null,
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Configuracoes')} 
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('Carrinho')} 
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="cart-outline" size={26} color="white" />
            </TouchableOpacity>
          </View>
        ),
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='Produtos' component={Produtos}/>
      <Stack.Screen name='Detalhes' component={Detalhes}/>
      <Stack.Screen name='Restaurante' component={Restaurante}/>
      
      <Stack.Screen 
        name='Carrinho' 
        component={Carrinho} 
        options={{ headerTitle: 'Meu Carrinho', headerRight: null}}
      />
      <Stack.Screen 
        name='Perfil' 
        component={Perfil} 
        options={{ headerTitle: 'Perfil', headerRight: null }}
      />
      <Stack.Screen 
        name='Pedidos' 
        component={Pedidos} 
        options={{ headerTitle: 'Meus Pedidos', headerRight: null }}
      />
      <Stack.Screen 
        name='Checkout' 
        component={Checkout} 
        options={{ headerTitle: 'Pagamento', headerRight: null }}
      />
      <Stack.Screen 
        name='Configuracoes' 
        component={Configuracoes} 
        options={{ headerTitle: 'Ajustes', headerRight: null }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  iconButton: {
    padding: 8,
    marginLeft: 5,
  }
});

export default HomeNavigator;