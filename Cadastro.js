import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function CadastroScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

      {/* Formulário de Cadastro */}
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
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
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Botão Cadastrar */}
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já possui uma conta? Faça login</Text>
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
  registerButton: {
    backgroundColor: '#cc3333',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  registerButtonText: {
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
