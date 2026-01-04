import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../db/database'; // Importe ta fonction
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  
  useEffect(() => {
    // Au lancement de l'app, on crée la table
    initDatabase();
  }, []);

  return (
    <Stack>
      {/* Configuration de l'écran d'accueil (Tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* On prépare la route pour ajouter un repas (en mode Modal) */}
      <Stack.Screen 
        name="add-meal" 
        options={{ 
          presentation: 'modal', 
          title: 'Nouveau Repas' 
        }} 
      />
    </Stack>
  );
}