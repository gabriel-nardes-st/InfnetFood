import { useState, useContext } from 'react';
import { 
  TextInput, View, Pressable, Text, StyleSheet, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext'; 
const Login = ({ onSignIn }) => { 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailWrong, setEmailWrong] = useState(false);

  const { colors, isDarkMode } = useContext(ThemeContext);

  const handleLogin = () => {
    if (!email || !senha || emailWrong) {
      alert('Preencha os campos corretamente');
      return;
    }
    onSignIn(email, senha);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.card, { backgroundColor: colors.card, shadowColor: isDarkMode ? '#000' : '#CCC' }]}>
        <Text style={[styles.title, { color: colors.text }]}>Bem-vindo! 🍔</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Faça login para continuar</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <TextInput 
            style={[
              styles.input, 
              { 
                backgroundColor: isDarkMode ? colors.background : '#F9F9F9', 
                color: colors.text, 
                borderColor: colors.border 
              },
              emailWrong && styles.inputError
            ]}
            placeholder='seu@email.com'
            placeholderTextColor={colors.secondaryText}
            value={email}
            onChangeText={(text) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              setEmail(text);
              setEmailWrong(!emailRegex.test(text) && text.length > 0);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailWrong && <Text style={styles.errorText}>Email inválido</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
          <TextInput 
            style={[
              styles.input, 
              { 
                backgroundColor: isDarkMode ? colors.background : '#F9F9F9', 
                color: colors.text, 
                borderColor: colors.border 
              }
            ]}
            placeholder='******'
            placeholderTextColor={colors.secondaryText}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.button, 
            { backgroundColor: colors.primary },
            pressed && styles.buttonPressed
          ]} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { 
    padding: 25, 
    borderRadius: 20, 
    elevation: 4, 
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    borderRadius: 12, 
    fontSize: 16 
  },
  inputError: { borderColor: '#E74C3C' },
  errorText: { color: '#E74C3C', fontSize: 12, marginTop: 5 },
  button: { padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default Login;