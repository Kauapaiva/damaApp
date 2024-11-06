import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Chaveamento = () => {
    const navigation = useNavigation();
    
    const [rounds, setRounds] = useState([
        {
            id: '1',
            round: 1,
            matches: [
                { id: '1-1', key: 'Chave 1', player1: 'Jogador 1', player2: 'Jogador 2', score1: null, score2: null, winner: null },
                { id: '1-2', key: 'Chave 2', player1: 'Jogador 3', player2: 'Jogador 4', score1: null, score2: null, winner: null },
            ],
        },
        {
            id: '2',
            round: 2,
            matches: [
                { id: '2-1', key: 'Final', player1: 'A Definir', player2: 'A Definir', score1: null, score2: null, winner: null },
            ],
        },
    ]);

    const handleUpdateScore = (matchId, score1, score2) => {
        setRounds(prevRounds => {
            return prevRounds.map(round => {
                const updatedMatches = round.matches.map(match => {
                    if (match.id === matchId) {
                        const winner = score1 > score2 ? match.player1 : score1 < score2 ? match.player2 : null;
                        return { ...match, score1, score2, winner };
                    }
                    return match;
                });

                // Atualiza a próxima rodada com os vencedores
                if (round.round === 1) {
                    const winners = updatedMatches.map(match => match.winner || 'A Definir');
                    const nextRoundIndex = prevRounds.findIndex(r => r.round === 2);
                    if (nextRoundIndex !== -1) {
                        const nextRound = prevRounds[nextRoundIndex];
                        const updatedNextRoundMatches = nextRound.matches.map((match, index) => {
                            const player1 = winners[index * 2] || 'A Definir';
                            const player2 = winners[index * 2 + 1] || 'A Definir';
                            return { ...match, player1, player2 };
                        });

                        prevRounds[nextRoundIndex] = { ...nextRound, matches: updatedNextRoundMatches };
                    }
                }

                return {
                    ...round,
                    matches: updatedMatches,
                };
            });
        });
    };

    const renderMatch = ({ item }) => (
        <View style={styles.matchContainer}>
            <Text style={styles.keyText}>{item.key}</Text>
            <View style={styles.matchRow}>
                <TouchableOpacity onPress={() => handleUpdateScore(item.id, item.score1 !== null ? item.score1 + 1 : 1, item.score2)} style={styles.playerContainer}>
                    <View style={styles.playerBackground}>
                        <Text style={styles.playerText}>{item.player1}</Text>
                        <Text style={styles.scoreText}>{item.score1 !== null ? item.score1 : '—'}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.vsText}>vs</Text>
                <TouchableOpacity onPress={() => handleUpdateScore(item.id, item.score1, item.score2 !== null ? item.score2 + 1 : 1)} style={styles.playerContainer}>
                    <View style={styles.playerBackground}>
                        <Text style={styles.playerText}>{item.player2}</Text>
                        <Text style={styles.scoreText}>{item.score2 !== null ? item.score2 : '—'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    const goToEventos = () => {
        console.log("Navegando para Eventos com rounds:", rounds);
        navigation.navigate('Eventos', { rounds });
    };

    const renderRound = ({ item }) => (
        <View key={item.id}>
            <Text style={styles.roundTitle}>Rodada {item.round}</Text>
            <FlatList
                data={item.matches}
                renderItem={renderMatch}
                keyExtractor={match => match.id}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Icon name="refresh" size={20} color="#cc3333" style={styles.refreshIcon} />
                <Text style={styles.title}>Atualize os resultados</Text>
            </View>
            <FlatList
                data={rounds}
                renderItem={renderRound}
                keyExtractor={round => round.id}
                ListFooterComponent={
                    <TouchableOpacity onPress={goToEventos} style={styles.eventButton}>
                        <Text style={styles.eventButtonText}>Ver Eventos</Text>
                    </TouchableOpacity>
                }
            />
            {/* Menu Inferior */}
            <View style={styles.bottomMenu}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('CriarCampeonato')}
                >
                    <Icon name="trophy" size={20} color="#ffffff" />
                    <Text style={styles.menuButtonText}>Painel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Participante')}
                >
                    <Icon name="users" size={20} color="#ffffff" />
                    <Text style={styles.menuButtonText}>Participantes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Chaveamento')}
                >
                    <Icon name="align-left" size={20} color="#cc3333" />
                    <Text style={styles.menuButtonText}>Chaves</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 20,
        paddingBottom: 60,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    refreshIcon: {
        marginRight: 10,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
    },
    roundTitle: {
        color: '#ffffff',
        fontSize: 20,
        marginVertical: 10,
    },
    matchContainer: {
        backgroundColor: '#cc3333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    matchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    playerBackground: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    playerText: {
        color: '#ffffff',
        fontSize: 16,
    },
    scoreText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    vsText: {
        color: '#ffffff',
        fontSize: 18,
        marginHorizontal: 10,
    },
    eventButton: {
        backgroundColor: '#ff8800',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    eventButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    bottomMenu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#1a1a1a',
        borderTopWidth: 1,
        borderTopColor: '#555',
    },
    menuButton: {
        alignItems: 'center',
    },
    menuButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    keyText: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Chaveamento;
