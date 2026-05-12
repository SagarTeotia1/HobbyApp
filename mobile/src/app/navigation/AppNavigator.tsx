import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { TopicDetailScreen } from '../../modules/roadmap/screens/TopicDetailScreen';
import { LearnGraphScreen } from '../../modules/roadmap/screens/LearnGraphScreen';
import { LearningFeedScreen } from '../../modules/learning-feed/screens/LearningFeedScreen';
import { ComicScreen } from '../../modules/learning-feed/screens/ComicScreen';
import { ProgressScreen } from '../../modules/progress/screens/ProgressScreen';
import { ROUTES } from './routes';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.MAIN_TABS}>
      <Stack.Screen name={ROUTES.MAIN_TABS} component={MainTabNavigator} />
      <Stack.Screen
        name={ROUTES.TOPIC_DETAIL}
        component={TopicDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name={ROUTES.LEARN_GRAPH}
        component={LearnGraphScreen}
        options={{ animation: 'slide_from_right' }}
      />
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
        name={ROUTES.COMIC}
        component={ComicScreen}
        options={{ animation: 'slide_from_bottom', gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
}
