import { useState, useContext, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const Detalhes = ({ route, navigation }) => {
  const [quantidade, setQuantidade] = useState(1);
  const { produto } = route.params;
  const { colors } = useContext(ThemeContext);

  const animacaoEscala = useRef(new Animated.Value(1)).current;

  const alterarQuantidade = (valor) => {
    if (quantidade + valor >= 1) {
      setQuantidade(prev => prev + valor);
    }
  };

  const handlePress = async () => {
    Animated.sequence([
      Animated.timing(animacaoEscala, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animacaoEscala, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const jsonItems = await AsyncStorage.getItem('@produtos-carrinho');
      const items = jsonItems != null ? JSON.parse(jsonItems) : [];
      const produtoExiste = items.find(p => p.id === produto.id);

      let novoCarrinho;
      if (produtoExiste) {
        novoCarrinho = items.map(p => {
          if (p.id === produto.id) {
            return { ...p, quantidade: p.quantidade + quantidade };
          }
          return p;
        });
      } else {
        novoCarrinho = [...items, { ...produto, quantidade: quantidade }];
      }

      await AsyncStorage.setItem('@produtos-carrinho', JSON.stringify(novoCarrinho));
      
      setTimeout(() => {
        navigation.navigate('Carrinho');
      }, 150);
      
    } catch (e) {
      console.error("Erro ao salvar", e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scroll}>
        <Image 
          source={{ uri: produto.imagem }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={[styles.nome, { color: colors.text }]}>{produto.nome}</Text>
          <Text style={[styles.precoUnico, { color: colors.primary }]}>
            R$ {produto.preco.toFixed(2).replace('.', ',')} unidade
          </Text>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <Text style={[styles.descricao, { color: colors.secondaryText }]}>
            {produto.descricao}
          </Text>
        </View>
      </ScrollView>

      <SafeAreaView style={{ backgroundColor: colors.card }}>
        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          
          <View style={[styles.contadorContainer, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={styles.btnContador} onPress={() => alterarQuantidade(-1)}>
              <Text style={[styles.btnText, { color: colors.primary }]}>-</Text>
            </TouchableOpacity>
            
            <Text style={[styles.qtdText, { color: colors.text }]}>{quantidade}</Text>
            
            <TouchableOpacity style={styles.btnContador} onPress={() => alterarQuantidade(1)}>
              <Text style={[styles.btnText, { color: colors.primary }]}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={handlePress} 
            style={{ flex: 1 }} 
          >
            <Animated.View 
              style={[
                styles.btnAdicionar, 
                { 
                  backgroundColor: colors.primary,
                  transform: [{ scale: animacaoEscala }] 
                }
              ]}
            >
              <Text style={styles.btnAdicionarText}>Adicionar</Text>
              <Text style={styles.totalText}>
                R$ {(quantidade * produto.preco).toFixed(2).replace('.', ',')}
              </Text>
            </Animated.View>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  image: { width: '100%', height: 300 },
  content: { padding: 20 },
  nome: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  precoUnico: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  divider: { height: 1, marginBottom: 15 },
  descricao: { fontSize: 16, lineHeight: 24 },
  footer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 15,
  },
  btnContador: { paddingHorizontal: 15, paddingVertical: 10 },
  btnText: { fontSize: 20, fontWeight: 'bold' },
  qtdText: { fontSize: 18, fontWeight: 'bold', minWidth: 30, textAlign: 'center' },
  btnAdicionar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%', 
  },
  btnAdicionarText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  totalText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default Detalhes;