import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function RedefinirSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      setMessage('As senhas não coincidem.');
    } else {
      // Aqui você pode adicionar a lógica para a redefinição da senha
      // Por exemplo, fazer uma requisição para a API para atualizar a senha.
      setMessage('Senha redefinida com sucesso!');
      // Após a redefinição, você pode navegar para a tela de login.
      navigation.navigate('Login');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Logo */}
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
      <Text style={styles.logoText}>
        Checkers <Text style={styles.logoHighlight}>Champions</Text>
      </Text>
      <Text style={styles.adminLink}>By Urubu Studios</Text>

      {/* Formulário de Redefinir Senha */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Nova Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      {/* Mensagem de erro ou sucesso */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Botão Redefinir Senha */}
      <TouchableOpacity style={styles.redefineButton} onPress={handleSubmit}>
        <Text style={styles.redefineButtonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Voltar ao Login</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.copyrightText}>
        Todos os direitos reservados &copy; {new Date().getFullYear()}
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSquareRow: {
    flexDirection: 'row',
  },
  logoSquareRed: {
    width: 30,
    height: 30,
    backgroundColor: '#cc3333',
    margin: 2,
  },
  logoSquareGray: {
    width: 30,
    height: 30,
    backgroundColor: '#cccccc',
    margin: 2,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  logoHighlight: {
    color: '#cc3333',
  },
  adminLink: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    marginBottom: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  message: {
    color: '#ff3333',
    fontSize: 14,
    marginBottom: 10,
  },
  redefineButton: {
    backgroundColor: '#cc3333',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  redefineButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLink: {
    color: '#cc3333',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  copyrightText: {
    color: '#cccccc',
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
  },
});
