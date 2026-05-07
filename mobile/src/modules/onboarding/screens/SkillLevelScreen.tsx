import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { SkillLevelCard } from '../components/SkillLevelCard/SkillLevelCard';
import { AIChatInterface } from '../../../shared/components/ai/AIChatInterface/AIChatInterface';
import { colors, spacing } from '../../../app/theme';
import { useOnboardingStore } from '../store/onboarding.store';
import { ROUTES } from '../../../app/navigation/routes';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import type { DifficultyLevel } from '../../../shared/types/card.types';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_LEVEL>;
type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_LEVEL>;
const LEVELS: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

const AI_SUGGESTIONS = ['Am I a beginner or intermediate?', 'What level should I pick?'];

export function SkillLevelScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ScreenRoute>();
  const skillLevel = useOnboardingStore((s) => s.skillLevel);
  const setLevel = useOnboardingStore((s) => s.setLevel);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="title">Your skill level</Typography>
        <Typography variant="body" muted>We will adapt card depth and pace to this level.</Typography>
        <View style={styles.options}>
          {LEVELS.map((level) => (
            <SkillLevelCard
              key={level}
              level={level}
              selected={skillLevel === level}
              onPress={() => setLevel(level)}
            />
          ))}
        </View>
        <AIChatInterface
          hobbyId={route.params.hobbySlug}
          collapsed
          suggestions={AI_SUGGESTIONS}
          placeholder="Ask about skill levels..."
        />
      </View>
      <Button
        label="Build my plan"
        onPress={() =>
          navigation.navigate(ROUTES.ONBOARDING_PLAN_GENERATION, {
            hobbySlug: route.params.hobbySlug,
            dailyMinutes: route.params.dailyMinutes,
            skillLevel,
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.lg },
  body: { flex: 1, gap: spacing.md },
  options: { gap: spacing.sm },
});
