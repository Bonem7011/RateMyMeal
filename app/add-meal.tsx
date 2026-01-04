import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../db/database'; // On importe notre connexion DB

export default function AddMealScreen() {
  const router = useRouter();

  // --- 1. Les États (Ce que l'utilisateur remplit) ---
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3); // Note par défaut 3/5
  const [imageUri, setImageUri] = useState<string | null>(null);

  // --- 2. Fonction Caméra ---
  const takePhoto = async () => {
    // Permission
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Erreur", "Permission caméra refusée");
      return;
    }

    // Lancement caméra
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Carré parfait
      aspect: [1, 1],
      quality: 0.5, // Compression
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // --- 3. Fonction Sauvegarde  ---
  const saveMeal = async () => {
    // Validation simple
    if (!name.trim()) {
      Alert.alert("Oups", "Donne un nom à ton plat !");
      return;
    }
    if (!imageUri) {
      Alert.alert("Oups", "Prends une photo du plat !");
      return;
    }

    try {
      // Insertion SQL
      await db.runAsync(
        'INSERT INTO meals (name, rating, imageUri, comment, date) VALUES (?, ?, ?, ?, ?)',
        name,
        rating,
        imageUri,
        comment,
        Date.now() // On stocke la date actuelle
      );

      // Succès -> On revient à l'accueil
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de sauvegarder le repas");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Zone Photo */}
      <TouchableOpacity onPress={takePhoto} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera" size={40} color="#ccc" />
            <Text style={{ color: '#ccc' }}>Toucher pour prendre une photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Champs Texte */}
      <Text style={styles.label}>Nom du plat</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ex: Pâtes Carbo..." 
        value={name}
        onChangeText={setName}
      />

      {/* Note (Étoiles) */}
      <Text style={styles.label}>Ta note : {rating}/5</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons 
              name={star <= rating ? "star" : "star-outline"} 
              size={32} 
              color="#e65100" 
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Un petit avis ? (Optionnel)</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="C'était délicieux parce que..." 
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/* Boutons */}
      <View style={{ marginTop: 20, gap: 10 }}>
        <Button title="Enregistrer le repas" onPress={saveMeal} color="#e65100" />
        <Button title="Annuler" onPress={() => router.back()} color="gray" />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, marginTop: 15, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#f9f9f9' },
  textArea: { height: 80, textAlignVertical: 'top' },
  imageContainer: { width: '100%', height: 250, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f0f0f0', marginBottom: 10 },
  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  starsContainer: { flexDirection: 'row', gap: 10 }
});