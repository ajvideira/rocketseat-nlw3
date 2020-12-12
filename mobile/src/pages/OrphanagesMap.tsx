import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import mapMarker from '../images/map-marker.png';
import api from '../services/api';

import styles from '../styles/pages/OrphanagesMapStyle';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useFocusEffect(() => {
    api.get('/orphanages').then((response) => {
      setOrphanages(response.data);
    });
  });

  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -30.0446599,
          longitude: -51.2108403,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {
          orphanages.map((orphanage) => (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={() => { handleNavigateToOrphanageDetails(orphanage.id); }}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        }

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length}
          {' '}
          orfanato(s) encontrado(s)
        </Text>
        <RectButton
          onPress={handleNavigateToCreateOrphanage}
          style={styles.createOrphanageButton}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}
