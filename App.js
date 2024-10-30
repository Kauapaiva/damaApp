import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa as telas
import LoginScreen from './LoginScreen'; // Tela de Login
import AdminScreen from './AdminScreen'; // Tela de Admin
import CompetitorScreen from './CompetitorScreen'; // Tela de Competidor
import CampeonatoScreen from './CampeonatoScreen'; // Tela Campeonato
import CriarCampeonatoScreen from './CriarCampeonatoScreen'; // Tela de Criação de Campeonato
import MinhaConta from './MinhaConta'; // Tela Minha Conta

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Oculta o cabeçalho para a tela de Login
        />
        {/* Tela de Admin */}
        <Stack.Screen 
          name="Admin" 
          component={AdminScreen} 
          options={{ title: 'Admin' }} // Título exibido no cabeçalho
        />
        {/* Tela de Competidor */}
        <Stack.Screen 
          name="Competitor" 
          component={CompetitorScreen} 
          options={{ title: 'Competidor' }} // Título exibido no cabeçalho
        />
        {/* Tela Campeonato */}
        <Stack.Screen 
          name="Campeonato" 
          component={CampeonatoScreen} 
          options={{ title: 'Home' }} // Título exibido no cabeçalho
        />
        {/* Tela de Criação de Campeonato */}
        <Stack.Screen 
          name="CriarCampeonato" 
          component={CriarCampeonatoScreen} 
          options={{ title: 'Criar Campeonato' }} // Título exibido no cabeçalho
        />
        {/* Tela Minha Conta */}
        <Stack.Screen 
          name="MinhaConta" 
          component={MinhaConta} 
          options={{ title: 'Minha Conta' }} // Título exibido no cabeçalho
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
