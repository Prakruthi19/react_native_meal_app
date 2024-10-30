import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: false,
        tabBarActiveTintColor: 'slateblue',   // Color when the tab is focused
        tabBarInactiveTintColor: 'gray', 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home-outline' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved_recipes"
        options={{
          title: 'Saved Recipes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bookmark-outline' : 'bookmark-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile_screen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-outline' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}
