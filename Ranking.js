import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Ranking = ({ navigation }) => {
    const [players, setPlayers] = useState([
        { id: 1, name: 'Kauã Paiva', score: 1238 },
        { id: 2, name: 'Vinicius Canavieira', score: 1153 },
        { id: 3, name: 'Itallo Eduardo', score: 1122 },
        { id: 4, name: 'Leo Viana', score: 998 },
        { id: 5, name: 'André Felipe', score: 992 },
    ]);

    const colorAnimation = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(colorAnimation, { toValue: 1, duration: 1000, useNativeDriver: false }),
                Animated.timing(colorAnimation, { toValue: 0, duration: 1000, useNativeDriver: false }),
            ])
        ).start();
    }, []);

    const interpolatedColorRed = colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#cc3333', '#cccccc'],
    });
    const interpolatedColorGray = colorAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#cccccc', '#cc3333'],
    });

    const renderPlayer = ({ item, index }) => {
        let backgroundColor = '#1a1a1a';
        if (index === 0) backgroundColor = '#FFD700';
        else if (index === 1) backgroundColor = '#C0C0C0';
        else if (index === 2) backgroundColor = '#CD7F32';

        return (
            <View style={[styles.playerContainer, { backgroundColor }]}>
                <Text style={styles.rankText}>{index + 1}</Text>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.playerScore}>{item.score}</Text>
                {index < 3 && (
                    <Icon
                        name="trophy"
                        size={20}
                        color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}
                        style={styles.trophyIcon}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoSquareRow}>
                        <Animated.View style={[styles.logoSquare, { backgroundColor: interpolatedColorRed }]} />
                        <Animated.View style={[styles.logoSquare, { backgroundColor: interpolatedColorGray }]} />
                    </View>
                    <View style={styles.logoSquareRow}>
                        <Animated.View style={[styles.logoSquare, { backgroundColor: interpolatedColorGray }]} />
                        <Animated.View style={[styles.logoSquare, { backgroundColor: interpolatedColorRed }]} />
                    </View>
                </View>
                <Text style={styles.title}>Top Players</Text>
            </View>

            <FlatList
                data={players}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 60 }}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Campeonato')}>
                    <Icon name="home" size={20} color="#ffffff" />
                    <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Eventos')}>
                    <Icon name="calendar" size={20} color="#ffffff" />
                    <Text style={styles.footerButtonText}>Eventos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Torneios')}>
                    <Icon name="trophy" size={20} color="#ffffff" />
                    <Text style={styles.footerButtonText}>Torneios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Ranking')}>
                    <Icon name="star" size={20} color="#cc3333" />
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
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        marginLeft: 10,
    },
    logoContainer: {
        marginRight: 5,
    },
    logoSquareRow: {
        flexDirection: 'row',
    },
    logoSquare: {
        width: 15,
        height: 15,
        margin: 2,
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    rankText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    playerName: {
        color: '#ffffff',
        fontSize: 18,
        flex: 1,
    },
    playerScore: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    trophyIcon: {
        marginLeft: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#1a1a1a',
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

export default Ranking;
