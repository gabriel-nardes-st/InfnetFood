import { useState, useCallback, useEffect, useContext } from 'react'; 
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ProductCartCard from '../components/productCartCard';
import { useFocusEffect } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext'; 

const Carrinho = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregado, setCarregado] = useState(false);
  
  const { colors } = useContext(ThemeContext);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@produtos-carrinho');
          const items = jsonValue != null ? JSON.parse(jsonValue) : [];
          setProdutos(items);
          setCarregado(true);
        } catch (e) {
          console.error("Erro ao carregar carrinho", e);
        }
      };
      carregarDados();
    }, [])
  );

  useEffect(() => {
    if (carregado) {
      AsyncStorage.setItem('@produtos-carrinho', JSON.stringify(produtos));
    }
  }, [produtos, carregado]);

  const calcularTotal = () => {
    return produtos.reduce((acc, curr) => acc + (curr.preco * curr.quantidade), 0);
  };

  const handleBuy = () => {
    navigation.navigate('Checkout');
  };

  if (produtos.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
          Seu carrinho está vazio 🛒
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Text style={[styles.title, { color: colors.text }]}>Meu Carrinho</Text>
      
      <FlatList 
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCartCard product={item} setProdutos={setProdutos}/>}
        contentContainerStyle={styles.list}
      />

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: colors.secondaryText }]}>Total:</Text>
          <Text style={[styles.totalValue, { color: colors.text }]}>
            R$ {calcularTotal().toFixed(2).replace('.', ',')}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.btnFinalizar, { backgroundColor: colors.primary }]} 
          onPress={handleBuy}
        >
          <Text style={styles.btnFinalizarText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', padding: 20 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: { fontSize: 18 },
  totalValue: { fontSize: 22, fontWeight: 'bold' },
  btnFinalizar: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnFinalizarText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default Carrinho;