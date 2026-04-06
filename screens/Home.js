import  { useContext } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import CategoryCard from '../components/categoryCard';
import Mapa from '../components/mapa';
import { ThemeContext } from '../context/ThemeContext';
import { meusRestaurantes } from '../data/restaurantes'; 

const categorias = [
  { id: '1', categoria: 'Lanches', url: 'https://cdn.pixabay.com/photo/2024/05/06/17/02/burgers-8743798_1280.jpg' },
  { id: '2', categoria: 'Bebidas', url: 'https://cdn.pixabay.com/photo/2016/11/29/13/33/cocktails-1869868_1280.jpg' },
  { id: '3', categoria: 'Sobremesas', url: 'https://cdn.pixabay.com/photo/2020/06/25/20/42/brigadier-5340834_1280.jpg' }
];

const Home = ({ navigation }) => {
  const { colors, isDarkMode } = useContext(ThemeContext);

  const renderUserHeader = () => (
    <View style={styles.userHeader}>
      <View>
        <Text style={[styles.greeting, { color: colors.secondaryText }]}>Olá, Admin!</Text>
      </View>
      <TouchableOpacity 
        style={[styles.profileButton, { backgroundColor: colors.card }]}
        onPress={() => navigation.navigate('Perfil')}
        activeOpacity={0.7}
      >
        <Ionicons name="person" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderCategorias = () => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Categorias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {categorias.map(item => (
          <View key={item.id} style={{ marginRight: 15 }}>
             <CategoryCard navigation={navigation} categoria={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderRestaurante = ({ item }) => (
    <TouchableOpacity 
      style={[styles.resCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => navigation.navigate('Restaurante', { restaurante: item })}
    >
      <Image source={{ uri: item.itemDestaque.imagem }} style={styles.resImage} />
      <View style={styles.resInfo}>
        <Text style={[styles.resNome, { color: colors.text }]}>{item.nome}</Text>
        <Text style={[styles.resEndereco, { color: colors.secondaryText }]} numberOfLines={1}>
          {item.endereco}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={meusRestaurantes}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurante}
        ListHeaderComponent={
          <>
            {renderUserHeader()}
            {renderCategorias()}
            <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 20 }]}>
              Restaurantes Próximos
            </Text>
          </>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 15 }]}>Sua Localização</Text>
            <Mapa />
          </View>
        }
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 5,
  },
  greeting: { fontSize: 14 },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  heroContainer: { height: 180, margin: 20, borderRadius: 15, overflow: 'hidden', elevation: 5 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    padding: 20 
  },
  heroTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  heroSubtitle: { color: '#FFF', fontSize: 14 },
  sectionContainer: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginLeft: 20 },
  horizontalScroll: { paddingLeft: 20 },
  resCard: { 
    flexDirection: 'row', 
    marginHorizontal: 20, 
    marginBottom: 15, 
    borderRadius: 12, 
    padding: 10, 
    borderWidth: 1,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  resImage: { width: 80, height: 80, borderRadius: 10 },
  resInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  resNome: { fontSize: 18, fontWeight: 'bold' },
  resEndereco: { fontSize: 13, marginTop: 4 },
  listPadding: { paddingBottom: 40 },
  footerContainer: { marginTop: 20, paddingHorizontal: 20 }
});

export default Home;