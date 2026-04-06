import { useContext } from 'react';
import { Pressable, Image, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext'; 

const ProductCard = ({ produto }) => {
  const navigation = useNavigation();
  
  const { colors, isDarkMode } = useContext(ThemeContext);

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        { 
          backgroundColor: pressed 
            ? (isDarkMode ? '#2A2A2A' : '#F0F0F0') 
            : colors.card,
          borderColor: colors.border,
          shadowColor: isDarkMode ? '#000' : '#CCC'
        }
      ]}
      onPress={() => navigation.navigate('Detalhes', { produto })}
    >
      <Image 
        source={{ uri: produto.imagem }} 
        style={[styles.image, { backgroundColor: colors.border }]}
      />
      
      <View style={styles.infoContainer}>
        <Text style={[styles.nome, { color: colors.text }]} numberOfLines={1}>
          {produto.nome}
        </Text>
        <Text style={[styles.descricao, { color: colors.secondaryText }]} numberOfLines={2}>
          {produto.descricao || "Descrição do produto não disponível."}
        </Text>
        <Text style={[styles.preco, { color: colors.primary }]}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    // Sombras
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 12,
    marginBottom: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCard;