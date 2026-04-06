import  { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext'; 

const Restaurante = ({ route }) => {
  const { restaurante } = route.params;
  const navigation = useNavigation();
  
  const { colors } = useContext(ThemeContext);

  const abrirNoMapa = () => {
    const daddr = `${restaurante.coords[0]},${restaurante.coords[1]}`;
    const company = Platform.OS === 'ios' ? 'maps' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };

  if (!restaurante) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Restaurante não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView bounces={false}>
        <View>
          <Image 
            source={{ uri: restaurante?.itemDestaque?.imagem }} 
            style={styles.banner} 
          />
        </View>

        <View style={[styles.infoContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.nome, { color: colors.text }]}>{restaurante.nome}</Text>
          
          <TouchableOpacity onPress={abrirNoMapa} style={styles.addressBox}>
            <Text style={[styles.endereco, { color: colors.secondaryText }]}>
              {restaurante.endereco}
            </Text>
            <Text style={[styles.mapLink, { color: colors.primary }]}>Ver no Mapa</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Sugestão do Chefe</Text>
          
          <TouchableOpacity 
            style={[styles.cardDestaque, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate('Detalhes', { produto: restaurante.itemDestaque })}
          >
            <Image source={{ uri: restaurante.itemDestaque.imagem }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.text }]}>{restaurante.itemDestaque.nome}</Text>
              <Text style={[styles.itemDesc, { color: colors.secondaryText }]} numberOfLines={2}>
                {restaurante.itemDestaque.descricao}
              </Text>
              <Text style={[styles.itemPrice, { color: colors.primary }]}>
                R$ {restaurante.itemDestaque.preco.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { width: '100%', height: 250 },
  infoContainer: { 
    padding: 20, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    marginTop: -20 
  },
  nome: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  addressBox: { marginBottom: 20 },
  endereco: { fontSize: 14, lineHeight: 20 },
  mapLink: { fontWeight: '600', marginTop: 5 },
  divider: { height: 1, marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  cardDestaque: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemDesc: { fontSize: 12, marginVertical: 4 },
  itemPrice: { fontSize: 14, fontWeight: 'bold' },
});

export default Restaurante;