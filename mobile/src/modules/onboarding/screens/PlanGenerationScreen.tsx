import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlanGeneratingAnimation } from '../components/PlanGeneratingAnimation/PlanGeneratingAnimation';
import { OnboardingError } from '../components/OnboardingError/OnboardingError';
import { useOnboarding } from '../hooks/useOnboarding';
import { colors } from '../../../app/theme';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_PLAN_GENERATION>;
type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_PLAN_GENERATION>;

export function PlanGenerationScreen() {
  const route = useRoute<ScreenRoute>();
  const navigation = useNavigation<Nav>();
  const onboardingMutation = useOnboarding();
  const startedRef = useRef(false);

  const { hobbySlug, dailyMinutes, skillLevel } = route.params;

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    onboardingMutation.mutate({ hobbySlug, dailyMinutes, skillLevel });
  }, [onboardingMutation, hobbySlug, dailyMinutes, skillLevel]);

  if (onboardingMutation.isError) {
    const msg =
      onboardingMutation.error instanceof Error
        ? onboardingMutation.error.message
        : 'Could not build roadmap. Check your connection and try again.';

    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <OnboardingError
          message={msg}
          onRetry={() => {
            startedRef.current = false;
            onboardingMutation.mutate({ hobbySlug, dailyMinutes, skillLevel });
          }}
          onBack={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <PlanGeneratingAnimation hobbyName={hobbySlug} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
