import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChampionshipProvider } from './ChampionshipContext'; // Importando o ChampionshipProvider

// Importa as telas
import LoginScreen from './LoginScreen'; // Tela de Login
import AdminScreen from './AdminScreen'; // Tela de Admin
import CompetitorScreen from './CompetitorScreen'; // Tela de Competidor
import CampeonatoScreen from './CampeonatoScreen'; // Tela Campeonato
import CriarCampeonatoScreen from './CriarCampeonatoScreen'; // Tela de Criação de Campeonato
import MinhaConta from './MinhaConta'; // Tela Minha Conta
import Participante from './Participante'; // Tela Participante
import AdicionarParticipante from './AdicionarParticipante'; // Tela Adicionar Participante
import Chaveamento from './Chaveamento'; // Tela Chaveamento
import Eventos from './Eventos'; // Tela Eventos
import HomeCompetidor from './HomeCompetidor'; // Tela Home Competidor
import Torneios from './Torneios'; // Tela Torneios
import Ranking from './Ranking'; // Tela Ranking
import CadastroScreen from './Cadastro';
import RedefinirSenha from './RedefinirSenha';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ChampionshipProvider>
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
            options={{ title: 'Administrador' }} // Título exibido no cabeçalho
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
          {/* Tela Participante */}
          <Stack.Screen
            name="Participante"
            component={Participante}
            options={{ title: 'Participantes' }} // Título exibido no cabeçalho
          />
          {/* Adicionar Participante */}
          <Stack.Screen
            name="AdicionarParticipante"
            component={AdicionarParticipante}
            options={{ title: 'Adicionar Participantes' }} // Título exibido no cabeçalho
          />
          {/* Tela Chaveamento */}
          <Stack.Screen
            name="Chaveamento"
            component={Chaveamento}
            options={{ title: 'Chaveamento' }} // Título exibido no cabeçalho
          />
          {/* Tela Eventos */}
          <Stack.Screen
            name="Eventos"
            component={Eventos}
            options={{ title: 'Eventos' }} // Título exibido no cabeçalho
          />
          {/* Tela Home Competidor */}
          <Stack.Screen
            name="HomeCompetidor"
            component={HomeCompetidor}
            options={{ title: 'Home' }} // Título exibido no cabeçalho
          />
          {/* Tela Torneios */}
          <Stack.Screen
            name="Torneios"
            component={Torneios}
            options={{ title: 'Torneios' }} // Título exibido no cabeçalho
          />
          {/* Tela Ranking */}
          <Stack.Screen
            name="Ranking"
            component={Ranking}
            options={{ title: 'Ranking' }} // Título exibido no cabeçalho
          />
          {/* Tela Cadastro */}
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ title: 'Cadastre-se' }} // Título exibido no cabeçalho
          />
          {/* Tela Redefinir Senha */}
          <Stack.Screen
            name="RedefinirSenha"
            component={RedefinirSenha}
            options={{ title: 'Redefinir Senha' }} // Título exibido no cabeçalho
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ChampionshipProvider>
  );
}
