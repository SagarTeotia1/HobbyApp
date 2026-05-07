import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { colors, spacing } from '../../../app/theme';

export function SpeedRoundScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Typography variant="heading">Speed Round</Typography>
        <Typography variant="body" muted>
          30s timer + rapid MCQs.
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  body: { flex: 1, gap: spacing.sm },
});
