import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useChampionship } from './ChampionshipContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Torneios({ navigation }) {
  const { championships } = useChampionship();
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrando campeonatos, garantindo que 'nomeCampeonato' seja uma string
  const filteredChampionships = championships.filter((championship) => {
    const nomeCampeonato = championship.nomeCampeonato || ''; // Garante que sempre será uma string
    return nomeCampeonato.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderChampionship = ({ item }) => (
    <View style={styles.card}>
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImageFallback}>
          <Text style={styles.cardImageText}>Sem imagem</Text>
        </View>
      )}
      <Text style={styles.cardTitle}>{item.nomeCampeonato}</Text>
      <Text style={styles.cardSubtitle}>Modalidade: {item.modalidade}</Text>
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
      <TextInput
        style={styles.searchBox}
        placeholder="Buscar torneios..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredChampionships.length > 0 ? (
        <FlatList
          data={filteredChampionships}
          renderItem={renderChampionship}
          keyExtractor={(item) => item.id ? String(item.id) : item.nomeCampeonato}
          contentContainerStyle={styles.championshipList}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhum torneio encontrado</Text>
      )}

      {/* Menu inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HomeCompetidor')}>
          <Icon name="home" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Eventos')}>
          <Icon name="calendar" size={20} color="#ffffff" />
          <Text style={styles.footerButtonText}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="trophy" size={20} color="#cc3333" />
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
  searchBox: {
    backgroundColor: '#333',
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  championshipList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
  cardButton: {
    backgroundColor: '#cc3333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cardButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
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
