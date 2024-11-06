import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import MenuLateral from './MenuLateral';
import { useChampionship } from './ChampionshipContext';

export default function HomeCompetidor({ navigation }) {
  const route = useRoute();
  const { championshipData } = route.params || {}; // Garantir que o parâmetro existe ou é um objeto vazio
  const [isMenuLateralVisible, setMenuLateralVisible] = useState(true);

  // Usando o contexto de campeonatos
  const { championships } = useChampionship();

  // Define o número de colunas
  const numColumns = 2;

  const toggleMenu = () => {
    setMenuLateralVisible(!isMenuLateralVisible);
  };

  // Renderiza cada campeonato em um card
  const renderChampionship = ({ item }) => (
    <View style={[styles.card, championships.length === 1 && styles.singleCard]}>
      {/* Foto do campeonato */}
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImageFallback}>
          <Text style={styles.cardImageText}>Sem imagem</Text>
        </View>
      )}

      <Text style={styles.cardTitle}>Nome: {item.nomeCampeonato}</Text>
      <Text style={styles.cardSubtitle}>Modalidade: {item.modalidade}</Text>
      <Text style={styles.cardText}>Regras: {item.regras}</Text>
      <Text style={styles.cardText}>Início: {item.dataInicioEvento}</Text>
      <Text style={styles.cardText}>Término: {item.dataTerminoEvento}</Text>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate('DetalhesCampeonato', { championship: item })}
      >
        <Text style={styles.cardButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

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

      {isMenuLateralVisible && <MenuLateral navigation={navigation} />}

      <View style={styles.content}>
        {championships && championships.length > 0 ? (
          <FlatList
            data={championships}
            renderItem={renderChampionship}
            keyExtractor={(item) => {
              // Verifica se o 'id' existe e é válido, caso contrário, usa 'nomeCampeonato'
              return item.id ? String(item.id) : item.nomeCampeonato || 'key_' + Math.random().toString(36).substr(2, 9);
            }}
            contentContainerStyle={styles.championshipList}
            numColumns={numColumns} // Número fixo de colunas
            columnWrapperStyle={styles.row} // Adiciona um estilo para a linha
          />
        ) : (
          <Text style={styles.noChampionshipsText}>Nenhum campeonato</Text>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="home" size={20} color="#cc3333" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Eventos')}
        >
          <Icon name="calendar" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}
        onPress={() => navigation.navigate('Torneios')}>

          <Icon name="trophy" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Torneios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}
        onPress={() => navigation.navigate('Ranking')}
        >
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
  championshipList: {
    paddingBottom: 100, // Espaço para o botão flutuante
  },
  row: {
    justifyContent: 'space-between', // Alinha os cards lado a lado
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '48%', // Definindo a largura para duas colunas
    maxWidth: 350,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative', // Importante para posicionar o botão de lixeira dentro do card
  },

  singleCard: {
    width: '100%', // Ajusta para que o único card ocupe mais espaço
  },

  deleteButton: {
    position: 'absolute', // Faz com que o botão de lixeira se posicione sobre o card
    top: 10, // Distância do topo do card
    right: 10, // Distância da borda direita do card
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Garante que o botão esteja acima dos outros elementos
  },

  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardImageFallback: {
    width: '100%',
    height: 100,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  cardImageText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 5,
  },

  cardText: {
    fontSize: 10,
    color: '#bbbbbb',
  },

  cardDetails: {
    fontSize: 10,
    color: '#cccccc',
    marginTop: 5,
  },

  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  cardButton: {
    backgroundColor: '#cc3333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  cardButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
});
