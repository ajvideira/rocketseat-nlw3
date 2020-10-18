import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {Feather} from "@expo/vector-icons";

import mapMarker from "../images/map-marker.png";
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap() {
    const navigation = useNavigation();
    
    function handleNavigateToOrphanageDetails() {
        navigation.navigate("OrphanageDetails");
    }

    return(
        <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -30.0446599,
          longitude: -51.2108403,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          coordinate={{
            latitude: -30.0446599,
            longitude: -51.2108403,
          }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Grey Sloan Memorial</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>
        <TouchableOpacity 
          onPress={()=>{}}
          style={styles.createOrphanageButton}>
            <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height+33
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
  
      elevation: 3,
    },
  
    calloutText: {
      color: '#0089A5',
      fontSize: 14,
      fontFamily: "Nunito_700Bold"
    },
  
    footer: {
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 56,
  
      backgroundColor: "#FFF",
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  
      elevation: 3,
  
  
    },
  
    footerText: {
      color: "#8FA7B3",
      fontFamily: "Nunito_700Bold"
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: "#15C3D6",
      borderRadius: 20,
  
      alignItems: "center",
      justifyContent: "center"
    },
  });