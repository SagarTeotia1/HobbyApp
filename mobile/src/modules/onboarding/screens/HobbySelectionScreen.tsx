import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { HobbyGrid, type HobbyOption } from '../components/HobbyGrid/HobbyGrid';
import { AIChatInterface } from '../../../shared/components/ai/AIChatInterface/AIChatInterface';
import { colors, spacing } from '../../../app/theme';
import { useOnboardingStore } from '../store/onboarding.store';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_HOBBY>;

const FALLBACK_HOBBIES: HobbyOption[] = [
  { id: 'chess', name: 'Chess', emoji: '♟️' },
  { id: 'guitar', name: 'Guitar', emoji: '🎸' },
  { id: 'drawing', name: 'Drawing', emoji: '🎨' },
  { id: 'coding', name: 'Coding', emoji: '💻' },
  { id: 'photography', name: 'Photography', emoji: '📷' },
  { id: 'cooking', name: 'Cooking', emoji: '🍳' },
  { id: 'yoga', name: 'Yoga', emoji: '🧘' },
  { id: 'writing', name: 'Writing', emoji: '✍️' },
];

const AI_SUGGESTIONS = [
  'What hobby should I start?',
  'What can I learn in 5 minutes daily?',
  'Help me pick a hobby',
];

export function HobbySelectionScreen() {
  const navigation = useNavigation<Nav>();
  const hobbySlug = useOnboardingStore((s) => s.hobbySlug);
  const setHobby = useOnboardingStore((s) => s.setHobby);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="title">Pick a hobby</Typography>
          <Typography variant="body" muted>
            What do you want to learn? Pick one or type your own.
          </Typography>
        </View>
        <HobbyGrid hobbies={FALLBACK_HOBBIES} selectedId={hobbySlug} onSelect={(hobby) => setHobby(hobby.id)} />
        <AIChatInterface
          hobbyId={hobbySlug ?? 'general'}
          suggestions={AI_SUGGESTIONS}
          placeholder="Ask about any hobby..."
        />
      </ScrollView>
      <Button
        label="Continue"
        disabled={!hobbySlug}
        onPress={() =>
          navigation.navigate(ROUTES.ONBOARDING_TIME, {
            hobbySlug: hobbySlug ?? 'chess',
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.lg },
  scroll: { gap: spacing.md, paddingBottom: spacing.xl },
  header: { gap: spacing.xs },
});
