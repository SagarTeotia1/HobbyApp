import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingNavigator } from './OnboardingNavigator';
import { AppNavigator } from './AppNavigator';
import { ROUTES } from './routes';
import { useUserStore } from '../store/rootStore';
import { registerAuthExpiredHandler } from '../../shared/services/api.client';
import { colors } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bgElevated,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};

export function RootNavigator() {
  const isOnboarded = useUserStore((s) => s.isOnboarded);
  const hydrate = useUserStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    registerAuthExpiredHandler(() => {
      useUserStore.getState().reset();
    });
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <Stack.Screen name={ROUTES.APP} component={AppNavigator} />
        ) : (
          <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
