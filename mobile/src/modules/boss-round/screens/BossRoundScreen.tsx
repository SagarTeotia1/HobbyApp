import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { colors, spacing } from '../../../app/theme';

export function BossRoundScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="heading">Boss Round</Typography>
        <Typography variant="body" muted>
          Hardest questions. +5 / -2 XP. Combo multipliers.
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
});
