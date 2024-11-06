import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de que o ícone está corretamente importado

const AdicionarParticipante = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessageVisible, setSuccessMessageVisible] = useState(false); // Estado para controlar a visibilidade da mensagem de sucesso

  const handleAddParticipant = () => {
    // Verificação dos campos
    if (!name || !email || !phone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return; // Retorna sem fazer nada se os campos não estiverem preenchidos
    }

    // Verificação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return; // Retorna sem fazer nada se o email não for válido
    }

    // Verificação básica de telefone (apenas números)
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido.');
      return; // Retorna sem fazer nada se o telefone não for válido
    }

    // Aqui você pode adicionar a lógica para salvar o participante
    setSuccessMessageVisible(true); // Define a mensagem de sucesso como visível

    // Limpar os campos
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleGenerateLink = () => {
    // Aqui você pode gerar um link de convite
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Participante</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#cccccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#cccccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#cccccc"
      />

      <TouchableOpacity onPress={handleAddParticipant} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Participante</Text>
      </TouchableOpacity>

      {successMessageVisible && (
        <View style={styles.successMessage}>
          <Icon name="check-circle" size={20} color="green" />
          <Text style={styles.successText}>Salvo com sucesso!</Text>
        </View>
      )}

      <TouchableOpacity onPress={handleGenerateLink} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Gerar Link de Convite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#ffffff',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#cc3333',
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginLeft: 5,
  },
  linkButton: {
    backgroundColor: '#555',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default AdicionarParticipante;
