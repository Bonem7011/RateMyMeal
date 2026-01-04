import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Meal } from '../constants/types'; // On réutilise notre type

type Props = {
  meal: Meal;
};

export default function MealCard({ meal }: Props) {
  return (
    <View style={styles.card}>
      {/* L'image du plat */}
      <Image source={{ uri: meal.imageUri }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{meal.name}</Text>
          {/* Affiche la note avec une étoile jaune */}
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#e65100" />
            <Text style={styles.ratingText}>{meal.rating}/5</Text>
          </View>
        </View>

        {/* Le commentaire (si il existe) */}
        {meal.comment ? (
          <Text style={styles.comment} numberOfLines={2}>
            "{meal.comment}"
          </Text>
        ) : null}

        {/* La date (formatée simplement) */}
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
    // Ombres
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Pour que le texte ne pousse pas l'étoile hors de l'écran
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontWeight: 'bold',
    color: '#e65100',
    marginLeft: 4,
  },
  comment: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});