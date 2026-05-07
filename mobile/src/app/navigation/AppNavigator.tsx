import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoadmapScreen } from '../../modules/roadmap/screens/RoadmapScreen';
import { LearningFeedScreen } from '../../modules/learning-feed/screens/LearningFeedScreen';
import { ProgressScreen } from '../../modules/progress/screens/ProgressScreen';
import { DashboardScreen } from '../../modules/dashboard/screens/DashboardScreen';
import { ROUTES } from './routes';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.ROADMAP} component={RoadmapScreen} />
      <Stack.Screen
        name={ROUTES.FEED}
        component={LearningFeedScreen}
        options={{ animation: 'slide_from_bottom', gestureEnabled: true }}
      />
      <Stack.Screen
        name={ROUTES.PROGRESS}
        component={ProgressScreen}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
