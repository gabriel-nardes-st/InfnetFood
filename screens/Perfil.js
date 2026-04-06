import { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const Perfil = ({ navigation }) => {
  const { colors, isDarkMode } = useContext(ThemeContext);

  const perfil = {
    nome: "Admin Infnet",
    email: "admin@admin.com",
    telefone: "(21) 99999-8888",
    membroDesde: "Março de 2024",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
  };

  const MenuItem = ({ icon, title, onPress, color }) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: colors.border }]} 
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={color || colors.primary} />
        <Text style={[styles.menuText, { color: colors.text }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <Image source={{ uri: perfil.avatar }} style={styles.avatar} />
          <Text style={[styles.nome, { color: colors.text }]}>{perfil.nome}</Text>
          <Text style={[styles.email, { color: colors.secondaryText }]}>{perfil.email}</Text>
          
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>MINHA CONTA</Text>
          
          <MenuItem 
            icon="receipt-outline" 
            title="Meus Pedidos" 
            onPress={() => navigation.navigate('Pedidos')} 
          />
         
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>AJUSTES</Text>
          <MenuItem 
            icon="settings-outline" 
            title="Configurações" 
            onPress={() => navigation.navigate('Configuracoes')} 
          />
        </View>

        <Text style={[styles.versionText, { color: colors.secondaryText }]}>
          InfnetFood v1.0.4
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  nome: { fontSize: 22, fontWeight: 'bold' },
  email: { fontSize: 14, marginTop: 4 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
  versionText: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 12,
  }
});

export default Perfil;