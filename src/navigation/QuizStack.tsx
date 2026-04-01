import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizScreen from '../screens/quiz/QuizScreen';
import QuizResultScreen from '../screens/quiz/QuizResultScreen';

const Stack = createNativeStackNavigator();

export default function QuizStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="QuizMain" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} />
    </Stack.Navigator>
  );
}