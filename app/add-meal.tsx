import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../db/database';

export default function AddMealScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // --- OPTION 1 : CAMERA ---
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Erreur", "Permission caméra refusée");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  // --- OPTION 2 : GALERIE  ---
  const pickImage = async () => {
    // Pas besoin de permission explicite pour la galerie sur les OS récents
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Photos seulement
      allowsEditing: true, // Carré
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  // --- LE MENU DE CHOIX ---
  const showImageSourceOptions = () => {
    Alert.alert(
      "Photo du plat",
      "Quelle source choisir ?",
      [
        { text: "Caméra 📸", onPress: takePhoto },
        { text: "Galerie 🖼️", onPress: pickImage },
        { text: "Annuler", style: "cancel", onPress: () => {} }
      ]
    );
  };

  // --- SAUVEGARDE ---
  const saveMeal = async () => {
    if (!name.trim()) {
      Alert.alert("Oups", "Donne un nom à ton plat !");
      return;
    }
    if (!imageUri) {
      Alert.alert("Oups", "Il faut une photo (Caméra ou Galerie) !");
      return;
    }

    try {
      await db.runAsync(
        'INSERT INTO meals (name, rating, imageUri, comment, date) VALUES (?, ?, ?, ?, ?)',
        name,
        rating,
        imageUri,
        comment,
        Date.now()
      );
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de sauvegarder le repas");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Au clic, on lance le MENU (showImageSourceOptions)  */}
      <TouchableOpacity onPress={showImageSourceOptions} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            {/* On affiche deux petites icônes pour montrer qu'on a le choix */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Ionicons name="camera" size={40} color="#ccc" />
                <Ionicons name="images" size={40} color="#ccc" />
            </View>
            <Text style={{ color: '#ccc', marginTop: 10 }}>Toucher pour choisir une photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nom du plat</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ex: Pâtes Carbo..." 
        value={name}
        onChangeText={setName}
      />

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