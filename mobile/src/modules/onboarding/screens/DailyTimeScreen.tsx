import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimeOptionPill, type TimeOption } from '../components/TimeOptionPill/TimeOptionPill';
import { useOnboardingStore } from '../store/onboarding.store';
import { dailyTimeStyles as styles } from './DailyTimeScreen.styles';
import type { OnboardingStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_TIME>;
type ScreenRoute = RouteProp<OnboardingStackParamList, typeof ROUTES.ONBOARDING_TIME>;

const TIME_OPTIONS: TimeOption[] = [5, 10, 15, 30, 60];

export function DailyTimeScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<ScreenRoute>();
  const dailyTimeMinutes = useOnboardingStore((s) => s.dailyTimeMinutes) as TimeOption;
  const setTime = useOnboardingStore((s) => s.setTime);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.stepRow}>
          <Text style={styles.stepLabel}>Step 2 of 3</Text>
          <View style={styles.stepDots}>
            <View style={styles.dot} />
            <View style={styles.dotActive} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.headlineBlock}>
          <Text style={styles.headline}>
            {'Daily\n'}
            <Text style={styles.headlineAccent}>Commitment.</Text>
          </Text>
          <Text style={styles.subHeadline}>
            Even 5 minutes a day builds a real skill.
          </Text>
        </View>
      </View>

      {/* Options */}
      <ScrollView
        style={styles.scrollFlex}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {TIME_OPTIONS.map((minutes) => (
          <TimeOptionPill
            key={minutes}
            minutes={minutes}
            selected={dailyTimeMinutes === minutes}
            onPress={() => setTime(minutes)}
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
            navigation.navigate(ROUTES.ONBOARDING_LEVEL, {
              hobbySlug: route.params.hobbySlug,
              dailyMinutes: dailyTimeMinutes,
            })
          }>
          <Text style={styles.ctaText}>
            {dailyTimeMinutes === 60 ? 'Continue with 1 hour/day  →' : `Continue with ${dailyTimeMinutes} min/day  →`}
          </Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}
