/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  ScrollView, View, Switch, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import styles from '../../styles/pages/OrphanageDataStyle';

interface OrphanageDataRouteParam {
  
}

function OrphanageData() {
  const route = useRoute();
  console.log(route.params);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  //const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  function handleCreateOrphanage() {

  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>

      <TextInput value={name} onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>

      <TextInput style={[styles.input, { height: 110 }]} multiline
       value={about} onChangeText={setAbout} />

      {/*<Text style={styles.label}>Whatsapp</Text>
      <TextInput value={whatsapp} onChangeText={setWhatsapp}
        style={styles.input}
      />*/}

      <Text style={styles.label}>Fotos</Text>
      <TouchableOpacity style={styles.imagesInput} onPress={() => { }}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput  value={instructions} onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput value={opening_hours} onChangeText={setOpeningHours}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

export default OrphanageData;
