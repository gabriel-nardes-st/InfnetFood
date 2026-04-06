import  { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ProductCartCard = ({ product, setProdutos }) => {
  const { colors } = useContext(ThemeContext);

  const handleQuantidade = (num) => {
    if (product.quantidade === 1 && num === -1) {
      setProdutos(prev => prev.filter(p => p.id !== product.id));
      return;
    }

    setProdutos(prev => prev.map(p => {
      if (p.id === product.id) {
        return {...p, quantidade: p.quantidade + num};
      }
      return p;
    }))
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
      <Image source={{ uri: product.imagem }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={[styles.nome, { color: colors.text }]} numberOfLines={1}>
          {product.nome}
        </Text>
        
        <Text style={[styles.precoSubtotal, { color: colors.primary }]}>
          R$ {(product.preco * product.quantidade).toFixed(2).replace('.', ',')}
        </Text>
        
        <View style={[styles.controls, { backgroundColor: colors.background }]}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleQuantidade(-1)}>
            <Text style={[styles.actionText, { color: colors.primary }]}>-</Text>
          </TouchableOpacity>
          
          <Text style={[styles.qtdText, { color: colors.text }]}>{product.quantidade}</Text>
          
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleQuantidade(+1)}>
            <Text style={[styles.actionText, { color: colors.primary }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 15 },
  nome: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  precoSubtotal: { fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 5 },
  actionText: { fontSize: 18, fontWeight: 'bold' },
  qtdText: { fontSize: 14, fontWeight: 'bold', minWidth: 25, textAlign: 'center' },
});

export default ProductCartCard;