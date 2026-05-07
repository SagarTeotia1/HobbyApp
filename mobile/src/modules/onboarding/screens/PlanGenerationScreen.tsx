import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../shared/components/ui/Typography/Typography';
import { colors, spacing } from '../../../app/theme';

export function PlanGenerationScreen() {
  useEffect(() => {
    // TODO: poll for roadmap completion, then navigate to feed
  }, []);

  return (
    <View style={styles.root}>
      <Typography variant="heading">Building your roadmap...</Typography>
      <Typography variant="body" muted>
        AI is generating your personal learning plan.
      </Typography>
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
});
