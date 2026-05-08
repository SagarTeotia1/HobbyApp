import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, type RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlanGeneratingAnimation } from '../components/PlanGeneratingAnimation/PlanGeneratingAnimation';
import { useOnboarding } from '../hooks/useOnboarding';
import { colors, spacing, radius } from '../../../app/theme';
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMsg}>{msg}</Text>

          <Pressable
            style={({ pressed }) => [styles.retryBtn, pressed && styles.retryBtnPressed]}
            onPress={() => {
              startedRef.current = false;
              onboardingMutation.mutate({ hobbySlug, dailyMinutes, skillLevel });
            }}>
            <Text style={styles.retryBtnText}>Try Again</Text>
          </Pressable>

          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Go Back</Text>
          </Pressable>
        </View>
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
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Error state ───────────────────────────────────────────────────
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  errorIcon: {
    fontSize: 56,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  errorMsg: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    width: '100%',
    alignItems: 'center',
  },
  retryBtnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  retryBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textInverse,
  },
  backBtn: {
    paddingVertical: spacing.sm,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDim,
  },
});
