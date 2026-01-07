import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { db } from '../../db/database';
import { Meal } from '../../constants/types';
import MealCard from '../../components/MealCard';
import { useFavoritesStore } from '../../store/favoritesStore';

export default function FavoritesScreen() {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  // On récupère la liste des IDs favoris
  const favoriteIds = useFavoritesStore((state) => state.ids);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        // 1. On charge tous les plats de la DB
        const allMeals = await db.getAllAsync<Meal>('SELECT * FROM meals ORDER BY date DESC');
        
        // 2. On garde seulement ceux dont l'ID est dans notre liste de favoris
        const filtered = allMeals.filter((meal) => favoriteIds.includes(meal.id));
        setFavoriteMeals(filtered);
      };

      loadFavorites();
    }, [favoriteIds]) // si on like un truc, ça recharge la liste direct !
  );

  return (
    <View style={styles.container}>
      {favoriteMeals.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Aucun favori ❤️</Text>
          <Text style={styles.emptySubText}>Ajoute des cœurs sur l'accueil !</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMeals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MealCard meal={item} />}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#555' },
  emptySubText: { color: '#888', marginTop: 5 },
});