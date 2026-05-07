import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { PlanGeneratingAnimation } from '../components/PlanGeneratingAnimation/PlanGeneratingAnimation';
import { useOnboarding } from '../hooks/useOnboarding';
import { colors, spacing } from '../../../app/theme';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_PLAN_GENERATION>;

export function PlanGenerationScreen() {
  const route = useRoute<ScreenRoute>();
  const { mutate } = useOnboarding();

  useEffect(() => {
    mutate({
      hobbySlug: route.params.hobbySlug,
      dailyMinutes: route.params.dailyMinutes,
      skillLevel: route.params.skillLevel,
    });
  }, [mutate, route.params.dailyMinutes, route.params.hobbySlug, route.params.skillLevel]);

  return (
    <View style={styles.root}>
      <PlanGeneratingAnimation hobbyName={route.params.hobbySlug} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
});
