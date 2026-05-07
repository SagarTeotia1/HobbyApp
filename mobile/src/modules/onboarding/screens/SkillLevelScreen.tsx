import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkillLevelCard } from '../components/SkillLevelCard/SkillLevelCard';
import { useOnboardingStore } from '../store/onboarding.store';
import { skillLevelStyles as styles } from './SkillLevelScreen.styles';
import { ROUTES } from '../../../app/navigation/routes';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import type { DifficultyLevel } from '../../../shared/types/card.types';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_LEVEL>;
type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_LEVEL>;

const LEVELS: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  beginner:     'Beginner',
  intermediate: 'Mid-level',
  advanced:     'Advanced',
};

export function SkillLevelScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ScreenRoute>();
  const skillLevel = useOnboardingStore((s) => s.skillLevel);
  const setLevel = useOnboardingStore((s) => s.setLevel);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.stepRow}>
          <Text style={styles.stepLabel}>Step 3 of 3</Text>
          <View style={styles.stepDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dotActive} />
          </View>
        </View>
        <View style={styles.headlineBlock}>
          <Text style={styles.headline}>
            {'Your\n'}
            <Text style={styles.headlineAccent}>Skill Level.</Text>
          </Text>
          <Text style={styles.subHeadline}>
            AI adapts card depth and pace to match where you are.
          </Text>
        </View>
      </View>

      {/* Level cards */}
      <ScrollView
        style={styles.scrollFlex}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {LEVELS.map((level) => (
          <SkillLevelCard
            key={level}
            level={level}
            selected={skillLevel === level}
            onPress={() => setLevel(level)}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            pressed && styles.ctaButtonPressed,
          ]}
          onPress={() =>
            navigation.navigate(ROUTES.ONBOARDING_PLAN_GENERATION, {
              hobbySlug: route.params.hobbySlug,
              dailyMinutes: route.params.dailyMinutes,
              skillLevel,
            })
          }>
          <Text style={styles.ctaText}>
            {`Build my plan as ${LEVEL_LABELS[skillLevel]}  →`}
          </Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}
