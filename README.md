# RateMyMeal 🍔

> Application mobile de suivi et de notation de repas, développée dans le cadre du cursus Informatique (3ème Bachelier).

**RateMyMeal** permet aux utilisateurs de photographier leurs plats, de les noter, de les commenter et de gérer une liste de favoris. L'application est conçue pour fonctionner totalement hors-ligne grâce à une base de données locale.

## 📱 Fonctionnalités Principales

- **📸 Capture Native :** Prise de photos de plats via l'appareil photo du téléphone ou sélection depuis la galerie (Module `expo-image-picker`).
- **💾 Persistance des Données :** Tous les repas sont stockés localement sur l'appareil via une base de données **SQLite**. Les données survivent au redémarrage de l'application.
- **❤️ Gestion des Favoris :** Système de "Like" instantané géré par un état global (**Zustand**). Les favoris sont synchronisés entre l'écran d'accueil et l'onglet dédié.
- **🧭 Navigation Fluide :** Architecture moderne basée sur **Expo Router** combinant :
  - *Tabs* (Onglets Accueil / Favoris).
  - *Stack* (Navigation en profondeur).
  - *Modals* (Formulaires d'ajout).

## 🛠️ Stack Technique

Ce projet met en œuvre les technologies modernes de l'écosystème React Native :

- **Framework :** React Native & Expo (SDK 52)
- **Langage :** TypeScript
- **Navigation :** Expo Router (File-based routing)
- **Base de Données :** `expo-sqlite` (Architecture relationnelle)
- **Gestion d'État :** `zustand` + Middleware de persistance
- **Composants :** `FlatList` optimisée, `Image`, `Modal`
- **Build :** EAS (Expo Application Services) pour la génération d'APK

## 📂 Architecture du Projet

Le projet suit une structure modulaire stricte :

```text
RateMyMeal/
├── app/                 # Écrans et Routes (Expo Router)
│   ├── (tabs)/          # Navigation par onglets (Accueil, Favoris)
│   ├── _layout.tsx      # Configuration globale (Stack, Providers)
│   └── add-meal.tsx     # Écran modal d'ajout de repas
├── components/          # Composants réutilisables (MealCard...)
├── db/                  # Configuration et initialisation SQLite
├── store/               # Stores globaux (Zustand - Favoris)
└── constants/           # Types TypeScript et constantes de style