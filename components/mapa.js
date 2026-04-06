import MapView, { Marker, Callout } from 'react-native-maps';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { meusRestaurantes } from '../data/restaurantes';

const Mapa = () => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.9068,
          longitude: -43.1729,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {meusRestaurantes.map((rest) => (
          <Marker
            key={rest.id}
            coordinate={{ latitude: rest.coords[0], longitude: rest.coords[1] }}
            onPress={() => navigation.navigate('Restaurante', { restaurante: rest })}
          >
            <Callout onPress={() => navigation.navigate('Restaurante', { restaurante: rest })}>
              <View style={styles.callout}>
                <Text style={styles.name}>{rest.nome}</Text>
                <Text style={styles.link}>Ver detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300, 
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  callout: {
    padding: 5,
    minWidth: 100,
  },
  name: {
    fontWeight: 'bold',
  },
  link: {
    color: '#E74C3C',
    fontSize: 12,
  }
});

export default Mapa;