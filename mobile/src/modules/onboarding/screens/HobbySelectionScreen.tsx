import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../shared/components/ui/Button/Button';
import { colors, spacing } from '../../../app/theme';
import type { OnboardingStackParamList } from '../../../app/navigation/types';

type Nav = NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding.Hobby'>;

export function HobbySelectionScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="title">Pick a hobby</Typography>
        <Typography variant="body" muted>
          What do you want to learn? Pick one or type your own.
        </Typography>
      </View>
      <Button label="Continue" onPress={() => navigation.navigate('Onboarding.Time')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, gap: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
});
