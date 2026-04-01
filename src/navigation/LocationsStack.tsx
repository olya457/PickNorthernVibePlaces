import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationsScreen from '../screens/locations/LocationsScreen';
import LocationDetailScreen from '../screens/locations/LocationDetailScreen';

const Stack = createNativeStackNavigator();

export default function LocationsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationsList" component={LocationsScreen} />
      <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
    </Stack.Navigator>
  );
}