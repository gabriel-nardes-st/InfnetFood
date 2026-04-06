import { useState, useEffect, useContext } from 'react'; 
import { Text, FlatList, View, StyleSheet } from 'react-native';
import { getProductsByCategory } from '../scripts/products';
import ProductCard from '../components/productCard';
import { ThemeContext } from '../context/ThemeContext'; 

const Produtos = ({ route }) => {
  const [produtos, setProdutos] = useState([]);
  const { categoria } = route.params;

  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    const productsList = getProductsByCategory(categoria.id);
    setProdutos(productsList);
  }, [categoria.id]);

  if (!produtos || produtos.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
          Não há produtos para essa categoria
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{categoria.categoria}</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
          {produtos.length} itens encontrados
        </Text>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard produto={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  list: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Produtos;