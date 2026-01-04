import * as SQLite from 'expo-sqlite';

// 1. On ouvre la connexion au fichier "ratemymeal.db"
export const db = SQLite.openDatabaseSync('ratemymeal.db');

// 2. Fonction pour créer la table au démarrage
export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        imageUri TEXT,
        comment TEXT,
        date INTEGER
      );
    `);
    console.log('✅ Base de données initialisée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la DB:', error);
  }
};