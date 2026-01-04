// la carte d'identité des données
export type Meal = {
  id: number;
  name: string;      // Le nom du plat (ex: "Burger Maison")
  rating: number;    // La note (1 à 5)
  imageUri: string;  // Le chemin de la photo dans le téléphone
  comment?: string;  // Optionnel : Un petit avis texte
  date: number;      // Pour trier du plus récent au plus vieux
};