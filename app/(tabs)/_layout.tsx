import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Bibliothèque d'icônes incluse dans Expo

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // On garde le titre en haut
        tabBarActiveTintColor: '#e65100', // Couleur active (Orange)
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, paddingTop: 5 },
      }}
    >
      {/* Onglet 1 : Accueil */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mes Repas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={size} color={color} />
          ),
        }}
      />

      {/* Onglet 2 : Favoris (qu'on va créer juste après) */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}