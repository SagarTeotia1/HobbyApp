import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { PlanGeneratingAnimation } from '../components/PlanGeneratingAnimation/PlanGeneratingAnimation';
import { useOnboarding } from '../hooks/useOnboarding';
import { colors, spacing } from '../../../app/theme';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';

type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_PLAN_GENERATION>;
type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_PLAN_GENERATION>;

export function PlanGenerationScreen() {
  const route = useRoute<ScreenRoute>();
  const navigation = useNavigation<Nav>();
  const onboardingMutation = useOnboarding();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    onboardingMutation.mutate({
      hobbySlug: route.params.hobbySlug,
      dailyMinutes: route.params.dailyMinutes,
      skillLevel: route.params.skillLevel,
    });
  }, [onboardingMutation, route.params.dailyMinutes, route.params.hobbySlug, route.params.skillLevel]);

  useEffect(() => {
    if (onboardingMutation.isSuccess) {
      // Root navigator switches automatically via user store flag.
      return;
    }
  }, [navigation, onboardingMutation.isSuccess]);

  const errorMessage =
    onboardingMutation.error instanceof Error
      ? onboardingMutation.error.message
      : 'Could not build roadmap. Check backend connectivity and try again.';

  return (
    <View style={styles.root}>
      <PlanGeneratingAnimation hobbyName={route.params.hobbySlug} />
      {onboardingMutation.isPending ? (
        <Typography variant="caption" muted>
          This can take a few seconds. We are preparing your first 10 cards.
        </Typography>
      ) : null}
      {onboardingMutation.isError ? (
        <View style={styles.errorBox}>
          <Typography variant="body" color={colors.danger}>
            {errorMessage}
          </Typography>
          <Button
            label="Retry"
            onPress={() =>
              onboardingMutation.mutate({
                hobbySlug: route.params.hobbySlug,
                dailyMinutes: route.params.dailyMinutes,
                skillLevel: route.params.skillLevel,
              })
            }
          />
          <Button label="Back" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      ) : null}
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
  errorBox: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
