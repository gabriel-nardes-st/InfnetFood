import { useContext, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext'; 
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PEDIDOS_MOCK = [
  {
    id: '101',
    data: '24 Mai 2024 • 19:30',
    restaurante: 'Burger King',
    status: 'Entregue',
    itens: '2x Whopper, 1x Batata M',
    total: 89.90,
    imagem: 'https://cdn.pixabay.com/photo/2024/05/06/17/02/burgers-8743798_1280.jpg'
  },
  {
    id: '102',
    data: '22 Mai 2024 • 12:15',
    restaurante: 'Sucos Naturais',
    status: 'Entregue',
    itens: '1x Suco de Laranja, 1x Misto Quente',
    total: 32.50,
    imagem: 'https://cdn.pixabay.com/photo/2016/11/29/13/33/cocktails-1869868_1280.jpg'
  },
  {
    id: '103',
    data: '15 Mai 2024 • 20:45',
    restaurante: 'Doceria Infnet',
    status: 'Cancelado',
    itens: '3x Brigadeiro Gourmet',
    total: 15.00,
    imagem: 'https://cdn.pixabay.com/photo/2020/06/25/20/42/brigadier-5340834_1280.jpg'
  }
];

const Pedidos = () => {
  const { colors, isDarkMode } = useContext(ThemeContext);
  const [pedidos, setPedidos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const buscarDados = async () => {
       const dados =  await AsyncStorage.getItem('@pedidos');
       if (dados) {
         setPedidos(JSON.parse(dados))
       } else {
         AsyncStorage.setItem('@pedidos', JSON.stringify(PEDIDOS_MOCK));
         setPedidos(PEDIDOS_MOCK);
       }
      } 
      buscarDados();
    }, [])
  )

 const renderPedido = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.headerCard}>
        <Image source={{ uri: item.imagem }} style={styles.imgRestaurante} />
        <View style={styles.infoRestaurante}>
          <Text style={[styles.nomeRestaurante, { color: colors.text }]}>{item.restaurante}</Text>
          <Text style={[styles.dataPedido, { color: colors.secondaryText }]}>{item.data}</Text>
        </View>
        
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.status === 'Cancelado' ? '#FFEDED' : (isDarkMode ? '#1B2E1D' : '#E8F5E9') }
        ]}>
           <Text style={[styles.statusText, { color: item.status === 'Cancelado' ? '#E74C3C' : '#2ECC71' }]}>
             {item.status}
           </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />


      <Text style={[styles.itensText, { color: colors.secondaryText }]}>
        {item.itens}
      </Text>
      
      <View style={styles.footerCard}>
        <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
        <Text style={[styles.totalValue, { color: colors.text }]}>
            R$ {(item.total || 0).toFixed(2).replace('.', ',')}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Text style={[styles.title, { color: colors.text }]}>Meus Pedidos</Text>
      
      <FlatList
        data={pedidos}
        keyExtractor={item => item.id}
        renderItem={renderPedido}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.secondaryText }]}>Nenhum pedido realizado ainda.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 10, marginBottom: 15 },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  imgRestaurante: { width: 45, height: 45, borderRadius: 22.5 },
  infoRestaurante: { flex: 1, marginLeft: 12 },
  nomeRestaurante: { fontSize: 16, fontWeight: 'bold' },
  dataPedido: { fontSize: 12 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  divider: { height: 1, marginVertical: 12 },
  itensText: { fontSize: 14, lineHeight: 20 },
  footerCard: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  totalLabel: { fontSize: 14, fontWeight: '500' },
  totalValue: { fontSize: 16, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16 }
});

export default Pedidos;