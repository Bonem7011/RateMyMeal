import { View, Text } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 18, color: 'gray' }}>Pas encore de favoris ❤️</Text>
    </View>
  );
}