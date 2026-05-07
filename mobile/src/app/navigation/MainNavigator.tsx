import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../../modules/dashboard/screens/DashboardScreen';
import { ProfileScreen } from '../../modules/profile/screens/ProfileScreen';
import { ProgressScreen } from '../../modules/progress/screens/ProgressScreen';
import { FeedNavigator } from './FeedNavigator';
import { colors } from '../theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.bgElevated,
          borderTopColor: colors.border,
        },
      }}>
      <Tab.Screen name="Tab.Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Tab.Feed" component={FeedNavigator} options={{ title: 'Learn' }} />
      <Tab.Screen name="Tab.Progress" component={ProgressScreen} options={{ title: 'Progress' }} />
      <Tab.Screen name="Tab.Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
