// MenuLateral.js
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Obtém a altura total da tela
const { height } = Dimensions.get('window');
const FOOTER_HEIGHT = 60; // Defina a altura do seu rodapé aqui

export default function MenuLateral({ navigation, user = { name: 'Usuário', email: 'usuario@example.com' } }) {
  const menuRef = useRef(null); // Cria a referência para o menu
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar a visibilidade do menu
  const menuWidth = 205; // Largura do menu

  // Atualiza a posição do menu ao mudar a visibilidade
  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.setNativeProps({ style: { right: menuVisible ? 0 : -menuWidth } });
    }
  }, [menuVisible]);

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  return (
    <>
      {/* Botão para abrir/fechar o menu */}
      <TouchableOpacity onPress={toggleMenu} style={[styles.toggleButton, menuVisible && styles.toggleButtonOpen]}>
        <Icon name={menuVisible ? 'times' : 'bars'} size={30} color="#ffffff" />
      </TouchableOpacity>
      <View
        ref={menuRef} // Aplica a referência aqui
        style={[styles.container, { right: menuVisible ? 0 : -menuWidth }]} // Adicione dinamismo ao estilo
      >
        {/* Seção de Perfil */}
        <View style={styles.profileContainer}>
          <Icon name="user-circle" size={60} color="#ffffff" style={styles.profileIcon} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
        {/* Itens do Menu */}
        {[
          { name: 'Minha Conta', icon: 'user', route: 'MinhaConta' },
          { name: 'Torneios', icon: 'trophy', route: 'Torneios' },
          { name: 'Lixeira', icon: 'trash', route: 'Lixeira' },
          { name: 'Remover Anúncios', icon: 'ban', route: 'RemoverAnuncios' },
          { name: 'Notificações', icon: 'bell', route: 'Notificacoes' },
          { name: 'Relatar Problema', icon: 'exclamation-triangle', route: 'RelatarProblema' },
          { name: 'Termos de Uso', icon: 'file-text', route: 'TermosUso' },
          { name: 'Políticas de Privacidade', icon: 'file-text', route: 'PoliticasPublicidade' },
          { name: 'Outros', icon: 'ellipsis-h', route: 'Outros' },
        ].map(item => (
          <TouchableOpacity key={item.route} style={styles.menuItem} onPress={() => navigation.navigate(item.route)}>
            <Icon name={item.icon} size={16} color="#ffffff" />
            <Text style={styles.menuItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 205,
    backgroundColor: '#cc3333',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#555',
    height: height - FOOTER_HEIGHT,
    zIndex: 1000,
    elevation: 5,
  },
  toggleButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#cc3333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1001,
  },
  toggleButtonOpen: {
    right: 215,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  profileIcon: {
    marginBottom: 5,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#ffffff',
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 8,
  },
});
