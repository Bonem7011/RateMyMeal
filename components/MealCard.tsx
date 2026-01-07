import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meal } from '../constants/types';
import { useFavoritesStore } from '../store/favoritesStore'; // Import du store

type Props = {
  meal: Meal;
};

export default function MealCard({ meal }: Props) {
  // On récupère les fonctions du store
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(meal.id));

  return (
    <View style={styles.card}>
      <Image source={{ uri: meal.imageUri }} style={styles.image} />

      {/* --- LE BOUTON CŒUR (NOUVEAU) --- */}
      <TouchableOpacity 
        onPress={() => toggleFavorite(meal.id)} 
        style={styles.heartButton}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={28} 
          color={isFavorite ? "red" : "white"} 
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{meal.name}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#e65100" />
            <Text style={styles.ratingText}>{meal.rating}/5</Text>
          </View>
        </View>

        {meal.comment ? (
          <Text style={styles.comment} numberOfLines={2}>"{meal.comment}"</Text>
        ) : null}

        <Text style={styles.date}>
          Le {new Date(meal.date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 200 },
  // Style du bouton cœur (rond semi-transparent)
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
    zIndex: 10, // Pour être sûr qu'il est au-dessus de l'image
  },
  content: { padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1 },
  rating: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff3e0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  ratingText: { fontWeight: 'bold', color: '#e65100', marginLeft: 4 },
  comment: { fontStyle: 'italic', color: '#666', marginBottom: 10 },
  date: { fontSize: 12, color: '#999', textAlign: 'right' },
});