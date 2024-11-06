import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de que está importando corretamente

const Participantes = () => {
    const navigation = useNavigation();
    const [participants, setParticipants] = useState([]);

    const renderParticipant = ({ item }) => (
        <View style={styles.participantItem}>
            <Text style={styles.participantText}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {participants.length > 0 ? (
                <FlatList
                    data={participants}
                    renderItem={renderParticipant}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Não há participantes no campeonato.</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AdicionarParticipante')}
                    >
                        <Text style={styles.addButtonText}>Adicionar Participante</Text>
                    </TouchableOpacity>
                </View>
            )}

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
                    <Icon name="users" size={20} color="#cc3333" />
                    <Text style={styles.menuButtonText}>Participantes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => navigation.navigate('Chaveamento')} // Altere para o nome correto da tela
                >
                    <Icon name="align-left" size={20} color="#ffffff" />
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
        padding: 10,

    },
    participantItem: {
        backgroundColor: '#cc3333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    participantText: {
        color: '#ffffff',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#ffffff',
        fontSize: 15,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    bottomMenu: {
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
    participantesButtonText: {
        color: '#cc3333',
        fontSize: 14,
    },
    menuButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});

export default Participantes;
