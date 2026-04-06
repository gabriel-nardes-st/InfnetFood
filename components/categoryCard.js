import { useContext } from 'react';
import { Pressable, Text, Image, StyleSheet, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 30;

const CategoryCard = ({ categoria }) => {
  const navigation = useNavigation();
  
  const { colors, isDarkMode } = useContext(ThemeContext);
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: isDarkMode ? 1 : 0, 
          opacity: pressed ? 0.8 : 1,
          shadowColor: isDarkMode ? '#000' : '#CCC'
        }
      ]} 
      onPress={() => navigation.navigate('Produtos', { categoria })}
    >
      <Image 
        source={{ uri: categoria.url }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <Text style={styles.text}>{categoria.categoria}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 120,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 8,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default CategoryCard;