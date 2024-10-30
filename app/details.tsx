import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useLocalSearchParams } from "expo-router";
import { ThemedText} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedMeal, setSelectedMeal] = useState(null); // State to hold meal details
  const [isFavourite, setIsFavourite] = useState(false);
  
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`); // Replace with your actual API URL
        const data = await response.json();
        setSelectedMeal(data.meals[0]); 
        console.log("In fetch meal details");
        console.log("Fetch details")
        console.log(id);// Access the meal object in the array
        console.log("isFavourite");
        console.log(isFavourite);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };
    const checkFavoriteStatus = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        const favoriteList = favorites ? JSON.parse(favorites) : [];
        setIsFavourite(favoriteList.includes(id));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    fetchMealDetails();
    checkFavoriteStatus();
  }, [id]); // Fetch meal details when the ID changes
  const toggleFavorite = async (idMeal) => {
    setIsFavourite(!isFavourite);
    // await AsyncStorage.clear()
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteList = favorites ? JSON.parse(favorites) : [];
      console.log(favoriteList);
      let updatedFavorites;
      if (favoriteList.includes(idMeal)) {
        // Remove from favorites
        updatedFavorites = favoriteList.filter(fav => fav !== idMeal);
        
      } else {
        // Add to favorites
        updatedFavorites = [...favoriteList, idMeal];
       
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
       // Toggle the state
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
    
  };

  if (!selectedMeal) return <ThemedText>Loading...</ThemedText>;
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={{flexDirection:'row', justifyContent: 'space-between', backgroundColor: '#f9f9f9'}}>
          <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedMeal.strMeal}</ThemedText>
        <TouchableOpacity onPress={() => toggleFavorite(id)}>
            <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={24} color="red" />
          </TouchableOpacity>
          </ThemedView>
        
        <Image source={{ uri: selectedMeal.strMealThumb }} style={{ width: '100%', height: 200, borderRadius: 8, marginVertical: 10 }} />
        
        <ThemedText style={{ fontWeight: 'bold' }}>Ingredients:</ThemedText>
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map(num => selectedMeal[`strIngredient${num}`])
          .filter(ingredient => ingredient)
          .map((ingredient, idx) => (
            <ThemedText key={idx} style={{ marginLeft: 10 }}>- {ingredient}</ThemedText>
          ))}
        <ThemedText style={{ fontWeight: 'bold', marginTop: 10 }}>Instructions:</ThemedText>
        <ThemedText>{selectedMeal.strInstructions}</ThemedText>
      </ThemedView>
        </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10, backgroundColor: '#f9f9f9', marginTop: 10
  },
  text: {
    color: '#fff',
  },
});