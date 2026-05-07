import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../../modules/dashboard/screens/DashboardScreen';
import { ProfileScreen } from '../../modules/profile/screens/ProfileScreen';
import { FeedNavigator } from './FeedNavigator';
import { ROUTES } from './routes';
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
      <Tab.Screen name={ROUTES.TAB_FEED} component={FeedNavigator} options={{ title: 'Learn' }} />
      <Tab.Screen name={ROUTES.TAB_DASHBOARD} component={DashboardScreen} options={{ title: 'Home' }} />
      <Tab.Screen name={ROUTES.TAB_PROFILE} component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
