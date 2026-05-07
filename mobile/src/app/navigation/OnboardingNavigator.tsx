import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HobbySelectionScreen } from '../../modules/onboarding/screens/HobbySelectionScreen';
import { DailyTimeScreen } from '../../modules/onboarding/screens/DailyTimeScreen';
import { SkillLevelScreen } from '../../modules/onboarding/screens/SkillLevelScreen';
import { PlanGenerationScreen } from '../../modules/onboarding/screens/PlanGenerationScreen';
import { ROUTES } from './routes';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name={ROUTES.ONBOARDING_HOBBY} component={HobbySelectionScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING_TIME} component={DailyTimeScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING_LEVEL} component={SkillLevelScreen} />
      <Stack.Screen
        name={ROUTES.ONBOARDING_PLAN_GENERATION}
        component={PlanGenerationScreen}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
}
