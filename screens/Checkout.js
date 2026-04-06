import { useState, useContext, useCallback } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, 
  TextInput, TouchableOpacity, Alert, ActivityIndicator,
  LayoutAnimation, Platform, UIManager 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { ThemeContext } from '../context/ThemeContext'; 
import { meusRestaurantes } from '../data/restaurantes';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Checkout = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useContext(ThemeContext); 
  
  const [carrinho, setCarrinho] = useState([]);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(''); 
  const [numero, setNumero] = useState('');     
  const [pagamento, setPagamento] = useState('Cartão');
  const [restauranteId, setRestauranteId] = useState(meusRestaurantes[0].id);
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const carregarResumo = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@produtos-carrinho');
          if (!jsonValue || JSON.parse(jsonValue).length === 0) {
            navigation.navigate('Home');
            return;
          }
          setCarrinho(JSON.parse(jsonValue));
        } catch (error) {
          console.error("Erro ao carregar dados do carrinho:", error);
        }
      };
      carregarResumo();
    }, [navigation]) 
  );

  const handleCepChange = async (value) => {
    const limpo = value.replace(/\D/g, '');
    setCep(limpo);

    if (limpo.length === 8) {
      setBuscandoCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
        const data = await response.json();

        if (data.erro) {
          Alert.alert("Erro", "CEP não encontrado.");
          setEndereco('');
        } else {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setEndereco(`${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`);
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao conectar no serviço de CEP.");
      } finally {
        setBuscandoCep(false);
      }
    }
  };

  const total = carrinho.reduce((acc, curr) => acc + (curr.preco * curr.quantidade), 0);

  const dispararNotificacoesStatus = async (nomeRestaurante) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🍔 Pedido Confirmado!",
        body: `O ${nomeRestaurante} já recebeu seu pedido e iniciou o preparo.`,
      },
      trigger: null,
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "👨‍🍳 Preparando seu prato",
        body: "Seu pedido está na cozinha e ficará pronto em breve!",
      },
      trigger: { seconds: 10 },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🛵 Saiu para entrega!",
        body: "O entregador já coletou seu pedido e está a caminho.",
      },
      trigger: { seconds: 25 },
    });
  };

  const finalizarCompra = async () => {
    if (!endereco || !numero) {
      Alert.alert("Erro", "Por favor, preencha o CEP e o número da residência.");
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setCarregando(true);

    const restauranteEscolhido = meusRestaurantes.find(r => r.id === restauranteId);
    const enderecoCompleto = `${endereco}, Nº ${numero}`;

    const agora = new Date();
    const pedido = { 
      id: Date.now().toString(), 
      data: `${agora.toLocaleDateString('pt-BR')} • ${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}`,
      restaurante: restauranteEscolhido.nome, 
      status: 'Pendente',
      itens: carrinho.map(item => `${item.quantidade}x ${item.nome}`).join(', '), 
      total: total,
      imagem: restauranteEscolhido.itemDestaque.imagem 
    };

    setTimeout(() => {
      Alert.alert(
        "Pedido Confirmado!", 
        `Entregar em: ${enderecoCompleto}\nTotal: R$ ${total.toFixed(2)}`,
        [
          { 
            text: "OK", 
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('@produtos-carrinho'); 
                const pedidosJson = await AsyncStorage.getItem('@pedidos'); 
                const pedidosAnteriores = pedidosJson ? JSON.parse(pedidosJson) : [];
                const novaListaPedidos = [pedido, ...pedidosAnteriores];
                await AsyncStorage.setItem('@pedidos', JSON.stringify(novaListaPedidos)); 

                dispararNotificacoesStatus(restauranteEscolhido.nome);
                navigation.navigate('Pedidos'); 
              } catch (e) {
                console.error("Erro ao processar pedido", e);
                setCarregando(false);
              }
            }
          }
        ]
      );
    }, 500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>Finalizar Pedido</Text>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Selecione o Restaurante</Text>
          <View style={styles.restaurantContainer}>
            {meusRestaurantes.map((rest) => (
              <TouchableOpacity 
                key={rest.id}
                style={[
                  styles.restaurantOption, 
                  { borderColor: colors.border },
                  restauranteId === rest.id && { borderColor: colors.primary, backgroundColor: isDarkMode ? '#3d1c19' : '#FFF5F5' }
                ]}
                onPress={() => setRestauranteId(rest.id)}
              >
                <Text style={[styles.restaurantName, { color: colors.text }, restauranteId === rest.id && { color: colors.primary, fontWeight: 'bold' }]}>
                  {rest.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Endereço de Entrega</Text>
          
          <View style={styles.cepRow}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border, flex: 1, minHeight: 50 }]}
              placeholder="Digite seu CEP (8 dígitos)"
              placeholderTextColor={colors.secondaryText}
              keyboardType="numeric"
              maxLength={8}
              value={cep}
              onChangeText={handleCepChange}
            />
            {buscandoCep && <ActivityIndicator style={{ marginLeft: 10 }} color={colors.primary} />}
          </View>

          {endereco !== '' && (
            <>
              <View style={[styles.infoBox, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
                <Text style={{ color: colors.text }}>📍 {endereco}</Text>
              </View>
              
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border, minHeight: 50, marginTop: 10 }]}
                placeholder="Número e Complemento"
                placeholderTextColor={colors.secondaryText}
                value={numero}
                onChangeText={setNumero}
              />
            </>
          )}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Método de Pagamento</Text>
          <TouchableOpacity 
            style={[styles.paymentOption, { backgroundColor: colors.background, borderColor: colors.border }, pagamento === 'Cartão' && { borderColor: colors.primary, backgroundColor: isDarkMode ? '#3d1c19' : '#FFF5F5' }]}
            onPress={() => setPagamento('Cartão')}
          >
            <Text style={{ color: colors.text }}>💳 Cartão de Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, { backgroundColor: colors.background, borderColor: colors.border }, pagamento === 'Pix' && { borderColor: colors.primary, backgroundColor: isDarkMode ? '#3d1c19' : '#FFF5F5' }]}
            onPress={() => setPagamento('Pix')}
          >
            <Text style={{ color: colors.text }}>📱 Pix</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={[
            styles.btnConfirmar, 
            { 
              backgroundColor: carregando ? '#2ECC71' : colors.primary,
              transform: [{ scale: carregando ? 1.03 : 1 }] 
            }
          ]} 
          onPress={finalizarCompra}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text style={styles.btnText}>Confirmar Pedido</Text>
              <Text style={styles.btnTotal}>R$ {total.toFixed(2).replace('.', ',')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 20, padding: 15, borderRadius: 12, borderWidth: 1 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase' },
  restaurantContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  restaurantOption: { flex: 0.48, padding: 12, borderRadius: 8, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  restaurantName: { fontSize: 14 },
  cepRow: { flexDirection: 'row', alignItems: 'center' },
  infoBox: { padding: 12, borderRadius: 8, marginTop: 10 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 15 },
  paymentOption: { padding: 15, borderWidth: 2, borderRadius: 8, marginBottom: 10 },
  footer: { padding: 20, borderTopWidth: 1 },
  btnConfirmar: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  btnTotal: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default Checkout;