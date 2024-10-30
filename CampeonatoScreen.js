// CampeonatoScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import MenuLateral from './MenuLateral';

export default function CampeonatoScreen({ navigation }) {
  const route = useRoute();
  const { championshipData } = route.params || {};
  const [isMenuLateralVisible, setMenuLateralVisible] = useState(true); // Menu visível por padrão

  const toggleMenu = () => {
    setMenuLateralVisible(!isMenuLateralVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoSquareRow}>
            <View style={styles.logoSquareRed} />
            <View style={styles.logoSquareGray} />
          </View>
          <View style={styles.logoSquareRow}>
            <View style={styles.logoSquareGray} />
            <View style={styles.logoSquareRed} />
          </View>
        </View>
        <Text style={styles.headerText}>
          Checkers <Text style={styles.logoHighlight}>Champions</Text>
        </Text>
      </View>

      {/* Renderiza o MenuLateral quando o estado estiver verdadeiro */}
      {isMenuLateralVisible && <MenuLateral navigation={navigation} />}

      <View style={styles.content}>
        {championshipData ? (
          <View>
            <Text style={styles.championshipTitle}>{championshipData.nomeCampeonato || 'Campeonato Desconhecido'}</Text>
            <Text style={styles.championshipDetails}>Modalidade: {championshipData.modalidade || 'N/A'}</Text>
            <Text style={styles.championshipDetails}>Regras: {championshipData.regras || 'N/A'}</Text>
            <Text style={styles.championshipDetails}>Data de Início: {championshipData.dataInicioEvento || 'N/A'}</Text>
            <Text style={styles.championshipDetails}>Data de Término: {championshipData.dataTerminoEvento || 'N/A'}</Text>
          </View>
        ) : (
          <Text style={styles.noChampionshipsText}>NENHUM CAMPEONATO</Text>
        )}
        <Text style={styles.addFirstText}>Adicione o primeiro!</Text>
      </View>
      <TouchableOpacity
        style={styles.newTournamentButton}
        onPress={() => navigation.navigate('CriarCampeonato')}
      >
        <Text style={styles.newTournamentButtonText}>Novo Torneio +</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={20} color="#cc3333" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="calendar" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="trophy" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Torneios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="star" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Ranking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoContainer: {
    marginRight: 5,
  },
  logoSquareRow: {
    flexDirection: 'row',
  },
  logoSquareRed: {
    width: 15,
    height: 15,
    backgroundColor: '#cc3333',
    margin: 2,
  },
  logoSquareGray: {
    width: 15,
    height: 15,
    backgroundColor: '#cccccc',
    margin: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  logoHighlight: {
    color: '#cc3333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChampionshipsText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  addFirstText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
  },
  newTournamentButton: {
    backgroundColor: '#cc3333',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  newTournamentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  championshipTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  championshipDetails: {
    fontSize: 16,
    color: '#ffffff',
  },
});
