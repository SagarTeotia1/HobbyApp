import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../../modules/dashboard/screens/DashboardScreen';
import { RoadmapScreen } from '../../modules/roadmap/screens/RoadmapScreen';
import { FloatingTabBar } from '../../shared/components/ui/FloatingTabBar/FloatingTabBar';
import { ROUTES } from './routes';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingTabBar {...props} />}
      initialRouteName={ROUTES.DASHBOARD}
    >
      <Tab.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen name={ROUTES.ROADMAP} component={RoadmapScreen} />
    </Tab.Navigator>
  );
}
