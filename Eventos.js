import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Eventos = ({ route, navigation }) => {
    const { rounds } = route.params || { rounds: [] };

    // Filtra apenas as partidas que estão com o resultado em andamento
    const liveMatches = rounds.flatMap(round =>
        round.matches.filter(match => match.score1 !== null && match.score2 !== null)
    );

    // Configuração do efeito piscante
    const animatedValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const blink = () => {
            animatedValue.setValue(1);
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => blink());
        };

        blink();
    }, [animatedValue]);

    const renderMatch = ({ item }) => (
        <View style={styles.matchContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.roundText}>Rodada {item.round}</Text>
                <Animated.View style={[styles.liveIndicator, { opacity: animatedValue }]}>
                    <View style={styles.redCircle} />
                    <Text style={styles.liveText}>Ao Vivo</Text>
                </Animated.View>
            </View>
            <Text style={styles.keyText}>{item.key}</Text>
            <View style={styles.scoreContainer}>
                <View style={styles.playerScoreContainer}>
                    <Text style={styles.playerText}>{item.player1}</Text>
                    <View style={styles.scoreBackground}>
                        <Text style={styles.scoreText}>{item.score1}</Text>
                    </View>
                </View>
                <Text style={styles.vsText}>vs</Text>
                <View style={styles.playerScoreContainer}>
                    <Text style={styles.playerText}>{item.player2}</Text>
                    <View style={styles.scoreBackground}>
                        <Text style={styles.scoreText}>{item.score2}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
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
                <Text style={styles.title}>Confrontos </Text>
                <View style={styles.liveIndicator}>
                    <View style={styles.redCircle} />
                    <Text style={styles.title}>Ao Vivo</Text>
                </View>
            </View>
            {liveMatches.length > 0 ? (
                <FlatList
                    data={liveMatches}
                    renderItem={renderMatch}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 60 }} // Espaçamento para o menu inferior
                />
            ) : (
                <Text style={styles.noMatchesText}>Nenhum confronto ao vivo no momento.</Text>
            )}

            {/* Menu inferior fixo */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Campeonato')}>
                    <Icon name="home" size={20} color="#ffff" />
                    <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerButton}
                    onPress={() => navigation.navigate('Eventos')}
                >
                    <Icon name="calendar" size={20} color="#cc3333" />
                    <Text style={styles.footerButtonText}>Eventos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Torneios')}>
                    <Icon name="trophy" size={20} color="#ffffff" />
                    <Text style={styles.footerButtonText}>Torneios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Ranking')}>
                    <Icon name="star" size={20} color="#ffffff" />
                    <Text style={styles.footerButtonText}>Ranking</Text>
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
        paddingBottom: 60, // Para garantir espaço no fundo
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        marginLeft: 10, // Espaço entre os quadrados e o título
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
    matchContainer: {
        backgroundColor: '#cc3333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    redCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        marginLeft: 5,
        marginRight: 5,
    },
    roundText: {
        color: '#ffffff',
        fontSize: 18,
    },
    keyText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 8,
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    playerScoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreBackground: {
        backgroundColor: '#cccccc',
        padding: 5,
        borderRadius: 5,
        marginLeft: 5,
    },
    playerText: {
        color: '#ffffff',
        fontSize: 16,
        backgroundColor: '#000000',
        padding: 5,
        borderRadius: 5,
    },
    scoreText: {
        color: '#000000',
        fontSize: 16,
    },
    vsText: {
        color: '#ffffff',
        fontSize: 16,
        marginHorizontal: 10,
    },
    noMatchesText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
    },
    liveText: {
        color: '#ffffff', // Texto "Ao Vivo" em branco
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#1a1a1a', // Cor de fundo do menu
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
});

export default Eventos;
