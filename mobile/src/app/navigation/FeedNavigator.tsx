import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearningFeedScreen } from '../../modules/learning-feed/screens/LearningFeedScreen';
import { ProgressScreen } from '../../modules/progress/screens/ProgressScreen';
import { ROUTES } from './routes';
import type { FeedStackParamList } from './types';

const Stack = createNativeStackNavigator<FeedStackParamList>();

export function FeedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.FEED_LEARNING} component={LearningFeedScreen} />
      <Stack.Screen name={ROUTES.FEED_PROGRESS} component={ProgressScreen} options={{ animation: 'fade' }} />
    </Stack.Navigator>
  );
}
