import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { TimeOptionPill, type TimeOption } from '../components/TimeOptionPill/TimeOptionPill';
import { AIChatInterface } from '../../../shared/components/ai/AIChatInterface/AIChatInterface';
import { colors, spacing } from '../../../app/theme';
import { useOnboardingStore } from '../store/onboarding.store';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_TIME>;
type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_TIME>;
const TIME_OPTIONS: TimeOption[] = [5, 10, 15, 30, 60];

const AI_SUGGESTIONS = ['Is 10 minutes enough to learn?', 'How should I pace myself?'];

export function DailyTimeScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ScreenRoute>();
  const dailyTimeMinutes = useOnboardingStore((s) => s.dailyTimeMinutes) as TimeOption;
  const setTime = useOnboardingStore((s) => s.setTime);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="title">How much time daily?</Typography>
        <Typography variant="body" muted>Pick your daily commitment.</Typography>
        <View style={styles.options}>
          {TIME_OPTIONS.map((minutes) => (
            <TimeOptionPill
              key={minutes}
              minutes={minutes}
              selected={dailyTimeMinutes === minutes}
              onPress={() => setTime(minutes)}
            />
          ))}
        </View>
        <AIChatInterface
          hobbyId={route.params.hobbySlug}
          collapsed
          suggestions={AI_SUGGESTIONS}
          placeholder="Ask about learning pace..."
        />
      </View>
      <Button
        label="Continue"
        onPress={() =>
          navigation.navigate(ROUTES.ONBOARDING_LEVEL, {
            hobbySlug: route.params.hobbySlug,
            dailyMinutes: dailyTimeMinutes,
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
