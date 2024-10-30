import { StyleSheet, Image, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from '@react-navigation/native';


export default function SavedRecipes() {

  const [favoriteMeals, setFavoriteMeals] = useState([]);
 
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        const favoriteList = favorites ? JSON.parse(favorites) : [];
  
        // Fetch meal details for each favorite ID
        const mealDetails = await Promise.all(
          favoriteList.map(async (idMeal) => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            return data.meals[0]; // Extract the meal object from the response
          })
        );
  
        setFavoriteMeals(mealDetails); // Store meal details in state
      } catch (error) {
        console.error('Error loading favorite meals:', error);
      }
    };
  
    useFocusEffect(
      useCallback(() => {
        loadFavorites();
      }, [])
    );
  
  return (
      <ThemedView style={{ flex: 1, padding: 20 }}>
        {favoriteMeals.length === 0 ? (
        <ThemedText style={styles.text}>No saved meals</ThemedText>
      ) : (
        <FlashList
          data={favoriteMeals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <ThemedView style={{ marginBottom: 15, padding: 10, backgroundColor: '#fff', borderRadius: 8 }}>
              <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>{item.strMeal}</ThemedText>
              <Image source={{ uri: item.strMealThumb }} style={{ width: '100%', height: 150, borderRadius: 8, marginVertical: 10 }} />
              <ThemedText>{item.strInstructions.slice(0, 100)}...</ThemedText>
            </ThemedView>
          )}
          estimatedItemSize={500}
        />
      )}
      </ThemedView>
    );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  text: {
    fontWeight: "bold", justifyContent: 'center', alignItems: 'center'
  },
});
