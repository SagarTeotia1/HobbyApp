import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HobbySelectionScreen } from '../../modules/onboarding/screens/HobbySelectionScreen';
import { DailyTimeScreen } from '../../modules/onboarding/screens/DailyTimeScreen';
import { SkillLevelScreen } from '../../modules/onboarding/screens/SkillLevelScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Onboarding.Hobby" component={HobbySelectionScreen} />
      <Stack.Screen name="Onboarding.Time" component={DailyTimeScreen} />
      <Stack.Screen name="Onboarding.Level" component={SkillLevelScreen} />
    </Stack.Navigator>
  );
}
