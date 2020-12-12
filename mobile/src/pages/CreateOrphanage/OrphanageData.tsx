/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../../styles/pages/OrphanageDataStyle';
import api from '../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

function OrphanageData() {
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  //const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  const [images, setImages] = useState<string[]>([])

  const navigation = useNavigation();

  async function handleCreateOrphanage() {
    const {latitude, longitude} = params.position;

    console.log({
      name, about, instructions, opening_hours, open_on_weekends, latitude, longitude 
    });

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach((image, index) => {
      data.append('images', {
        type: 'image/jpg',
        uri: image,
        name: `images_${index}.jpg`
      } as any);
    });

    await api.post('orphanages', data);

    navigation.navigate('OrphanagesMap');

  }

  async function handleSelectImages() {
    console.log('chegou aqui')

    const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Você precisa fornecer permissão para adicionar imagens!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (result.cancelled) {
      return;
    }
  
    setImages([...images, result.uri]);
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

      <View style={styles.uploadedImageContainer}>
        {
          images.map((image) => {
            return (
              <Image
                key={image} 
                source={{uri: image}} 
                style={styles.uploadedImage}
              />
            );
          })
        }
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput  value={instructions} onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horário de visitas</Text>
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
