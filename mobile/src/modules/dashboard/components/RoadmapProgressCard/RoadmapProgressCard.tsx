import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  completedTopics: number;
  totalTopics: number;
}

export function RoadmapProgressCard({ completedTopics, totalTopics }: Props) {
  const pct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Roadmap Progress</Text>
      <View style={styles.barOuter}>
        <View style={[styles.barInner, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.pct}>{pct}% complete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.md,
  },
  title: { fontSize: 16, fontWeight: '900', color: colors.text, textTransform: 'uppercase', letterSpacing: 1 },
  barOuter: {
    height: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  barInner: { height: '100%', backgroundColor: colors.primary, borderRadius: radius.sm },
  pct: { fontSize: 14, fontWeight: '800', color: colors.textMuted },
});
