import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, useFocusEffect } from 'expo-router'; // Import important !
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { db } from '../../db/database';
import { Meal } from '../../constants/types';
import MealCard from '../../components/MealCard'; // On importe notre belle carte

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour charger les données depuis SQLite
  const loadMeals = async () => {
    try {
      // On récupère tout, trié du plus récent au plus vieux (DESC)
      const result = await db.getAllAsync<Meal>('SELECT * FROM meals ORDER BY date DESC');
      setMeals(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useFocusEffect s'exécute quand l'écran devient visible
  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, [])
  );

  return (
    <View style={styles.container}>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#e65100" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MealCard meal={item} />}
          contentContainerStyle={{ padding: 15, paddingBottom: 100 }} // Espace pour le bouton +
          
          // Si la liste est vide, on affiche le message d'aide
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Aucun repas pour le moment...</Text>
              <Text style={styles.emptySubText}>Clique sur + pour commencer !</Text>
            </View>
          }
        />
      )}

      {/* Bouton Flottant (+) */}
      <Link href="/add-meal" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#555' },
  emptySubText: { color: '#888', marginTop: 5 },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e65100',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});