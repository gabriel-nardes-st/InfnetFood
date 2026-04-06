import { useContext } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext'; 

const Configuracoes = () => {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
      </View>

      <View style={[styles.configRow, { backgroundColor: colors.card }]}>
        <View>
          <Text style={[styles.configText, { color: colors.text }]}>Modo Escuro</Text>
          <Text style={styles.subtitle}>Ajustar visual do aplicativo</Text>
        </View>
        
        <Switch
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={isDarkMode ? '#2ECC71' : '#f4f3f4'}
          onValueChange={toggleTheme} 
          value={isDarkMode} 
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={{ color: colors.secondaryText, textAlign: 'center' }}>
          O tema atual é: {isDarkMode ? 'Escuro' : 'Claro'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 30, marginTop: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  configText: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 12, color: '#888', marginTop: 4 },
  infoBox: { marginTop: 40 }
});

export default Configuracoes;