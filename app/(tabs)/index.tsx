import {Image, StyleSheet,  TouchableOpacity} from 'react-native';
import { ThemedText} from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";


export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
        const jsonData = await response.json();
        setMeals(jsonData.meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated regardless of success or failure
      }
    };
    fetchMeals();
  }, []);
      const renderItem = ({ item }) => (
        <TouchableOpacity
        style={{
          margin: 10,
          padding: 10,
          borderRadius: 8,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
        onPress={() =>  router.push(`/details?id=${item.idMeal}`)} 
        >
        
          <ThemedView style={{ flex: 1, marginRight: 10 }}> 
          <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>{item.strMeal}</ThemedText>
          <ThemedText style={{ marginTop: 5, fontStyle: 'italic', color: '#666' }}>
        {item.strInstructions.length > 50 ? item.strInstructions.slice(0, 100) + '...' : item.strInstructions}
      </ThemedText>
      </ThemedView>
          <Image source={{ uri: item.strMealThumb }} style={{ width: 100, height: 100, borderRadius: 8, marginLeft: 10 }} />
         </TouchableOpacity>
        
      );
        return (
          <ThemedView style={styles.cardContainer}>
            <FlashList
              data={meals}
              renderItem={renderItem}
              keyExtractor={(item) => item.idMeal}
              estimatedItemSize={10000000000000}
              
            />
          </ThemedView>
        );
      }

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, 
    flex: 1// For Android shadow
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    flexGrow: 1, // Allow the details container to grow
  },
  ingredientsTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredient: {
    marginLeft: 10,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});