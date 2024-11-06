import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import { useChampionship } from './ChampionshipContext';  // Importe o contexto

export default function CriarCampeonatoScreen({ navigation }) {
  const { addChampionship } = useChampionship();  // Pegue a função addChampionship do contexto
  const [modalidade, setModalidade] = useState('Online');
  const [capa, setCapa] = useState(null);
  const [nomeCampeonato, setNomeCampeonato] = useState('');
  const [regras, setRegras] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [dataInicioInscricao, setDataInicioInscricao] = useState(null);
  const [dataTerminoInscricao, setDataTerminoInscricao] = useState(null);
  const [dataInicioEvento, setDataInicioEvento] = useState(null);
  const [dataTerminoEvento, setDataTerminoEvento] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapa(result.assets[0].uri);
    }
  };

  const changeImage = async () => {
    await pickImage();
  };

  const openCalendar = (type) => {
    setSelectedDateType(type);
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDateSelect = (day) => {
    switch (selectedDateType) {
      case 'dataInicioInscricao':
        setDataInicioInscricao(day.dateString);
        break;
      case 'dataTerminoInscricao':
        setDataTerminoInscricao(day.dateString);
        break;
      case 'dataInicioEvento':
        setDataInicioEvento(day.dateString);
        break;
      case 'dataTerminoEvento':
        setDataTerminoEvento(day.dateString);
        break;
      default:
        break;
    }
    closeCalendar();
  };

  const handleCreateChampionship = () => {
    // Criar o objeto do campeonato
    const newChampionship = {
      nome: nomeCampeonato,
      regras,
      modalidade,
      capa,
      dataInicioInscricao,
      dataTerminoInscricao,
      dataInicioEvento,
      dataTerminoEvento,
    };

    // Adiciona o campeonato ao contexto
    addChampionship(newChampionship);

    // Navega para a tela de campeonatos
    navigation.navigate('Campeonato');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {capa ? (
          <ImageBackground source={{ uri: capa }} style={styles.backgroundImage} imageStyle={styles.imageStyle}>
            <View style={styles.overlay}>
              <TextInput
                style={styles.input}
                placeholder="Nome do Campeonato"
                placeholderTextColor="#ccc"
                value={nomeCampeonato}
                onChangeText={setNomeCampeonato}
                textAlign="center" // Centraliza o texto
              />
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Regras/Descrição"
                placeholderTextColor="#ccc"
                multiline={true}
                value={regras}
                onChangeText={setRegras}
                textAlign="center" // Centraliza o texto
              />
            </View>
            <TouchableOpacity onPress={changeImage} style={styles.editButtonCapa}>
              <Icon name="pencil" size={20} color="#ffffff" />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.capaButton}>
            <Icon name="image" size={50} color="#ffffff" />
            <Text style={styles.capaButtonText}>Escolha a Capa, Nome e Descrição</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>PERÍODO DE INSCRIÇÕES</Text>

        <Text style={styles.title}>Data de Início</Text>
        <TouchableOpacity onPress={() => openCalendar('dataInicioInscricao')} style={styles.calendarButton}>
          <Text style={styles.calendarButtonText}>{dataInicioInscricao || "Selecione uma data"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Data de Término</Text>
        <TouchableOpacity onPress={() => openCalendar('dataTerminoInscricao')} style={styles.calendarButton}>
          <Text style={styles.calendarButtonText}>{dataTerminoInscricao || "Selecione uma data"}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>PERÍODO DE EVENTO</Text>

        <Text style={styles.title}>Data de Início</Text>
        <TouchableOpacity onPress={() => openCalendar('dataInicioEvento')} style={styles.calendarButton}>
          <Text style={styles.calendarButtonText}>{dataInicioEvento || "Selecione uma data"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Data de Término</Text>
        <TouchableOpacity onPress={() => openCalendar('dataTerminoEvento')} style={styles.calendarButton}>
          <Text style={styles.calendarButtonText}>{dataTerminoEvento || "Selecione uma data"}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>MODALIDADE</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setModalidade('Online')}
          >
            <View style={[styles.radioCircle, modalidade === 'Online' && styles.selectedRadio]} />
            <Text style={styles.radioText}>Online</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setModalidade('Presencial')}
          >
            <View style={[styles.radioCircle, modalidade === 'Presencial' && styles.selectedRadio]} />
            <Text style={styles.radioText}>Presencial</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Local</Text>
        <TextInput style={styles.input} placeholder="Digite o local" placeholderTextColor="#ccc" />

        {/* Botão Criar no final */}
        <TouchableOpacity onPress={handleCreateChampionship} style={styles.createButton}>
          <Text style={styles.createButtonText}>Criar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Calendário Modal */}
      <Modal visible={isCalendarVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={handleDateSelect}
            markingType={'custom'}
            markedDates={{
              [dataInicioInscricao]: {
                selected: true,
                marked: true,
                dotColor: 'orange',
                selectedColor: '#cc3333',
              },
              [dataTerminoInscricao]: {
                selected: true,
                marked: true,
                dotColor: 'orange',
                selectedColor: '#cc3333',
              },
              [dataInicioEvento]: {
                selected: true,
                marked: true,
                dotColor: 'orange',
                selectedColor: '#cc3333',
              },
              [dataTerminoEvento]: {
                selected: true,
                marked: true,
                dotColor: 'orange',
                selectedColor: '#cc3333',
              },
            }}
          />
          <TouchableOpacity onPress={closeCalendar} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="trophy" size={20} color="#cc3333" />
          <Text style={styles.menuButtonText}>Painel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Participante')} // Navega para a tela Participantes
        >
          <Icon name="users" size={20} color="#ffffff" />
          <Text style={styles.menuButtonText}>Participantes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Chaveamento')}
        >
          <Icon name="align-left" size={20} color="#ffffff" />
          <Text style={styles.menuButtonText}>Chaves</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  imageStyle: {
    borderRadius: 10,
    opacity: 0.9,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'transparent', // Removido o contorno
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adicionado fundo sutil
  },
  descriptionInput: {
    height: 80,
  },
  editButtonCapa: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  capaButton: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  capaButtonText: {
    color: '#ffffff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginVertical: 10,
  },
  title: {
    color: '#ffffff',
    marginVertical: 5,
  },
  calendarButton: {
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarButtonText: {
    color: '#ffffff',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  selectedRadio: {
    backgroundColor: '#cc3333',
  },
  radioText: {
    color: '#fff',
  },
  createButton: {
    backgroundColor: '#cc3333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#000',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#555',
    padding: 15,
  },
  menuButton: {
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});
