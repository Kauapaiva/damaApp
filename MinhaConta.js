import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function MinhaConta({ onSave }) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleSave = () => {
    if (!name || !email || !phone || !address) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de salvar.');
      return;
    }

    setSuccessMessageVisible(true);
    if (onSave) {
      onSave({ name, email, phone, address, profileImage });
    }
    setTimeout(() => setSuccessMessageVisible(false), 2000); // Oculta a mensagem após 2 segundos
  };

  const handleChangeProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      setLoadingImage(true); // Inicia o carregamento da imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setLoadingImage(false); // Finaliza o carregamento da imagem
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a galeria!');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirmação',
      'Você realmente deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => navigation.navigate('Login') },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}></View>

        <TouchableOpacity onPress={handleChangeProfileImage} style={styles.profileImageContainer}>
          {loadingImage ? (
            <ActivityIndicator size="large" color="#cc3333" />
          ) : profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="user-circle" size={80} color="#cccccc" />
          )}
        </TouchableOpacity>

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
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#cccccc"
        />

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        {successMessageVisible && (
          <View style={styles.successMessage}>
            <Icon name="check-circle" size={20} color="green" />
            <Text style={styles.successText}>Salvo com sucesso!</Text>
          </View>
        )}

        <TouchableOpacity onPress={() => Alert.alert('Alterar Senha', 'Aqui você pode alterar sua senha.')}>
          <Text style={styles.changePasswordText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  changePasswordText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
