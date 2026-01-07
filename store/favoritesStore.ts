import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoritesState = {
  ids: number[]; // La liste des IDs likés
  toggleFavorite: (id: number) => void; // L'action pour liker/disliker
  isFavorite: (id: number) => boolean; // La vérification
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggleFavorite: (id) => {
        const currentIds = get().ids;
        // Si l'ID est déjà là, on l'enlève. Sinon, on l'ajoute.
        if (currentIds.includes(id)) {
          set({ ids: currentIds.filter((item) => item !== id) });
        } else {
          set({ ids: [...currentIds, id] });
        }
      },

      isFavorite: (id) => get().ids.includes(id),
    }),
    {
      name: 'favorites-storage', // Nom pour la sauvegarde
      storage: createJSONStorage(() => AsyncStorage), // Persistance sur le disque
    }
  )
);