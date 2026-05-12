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
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: spacing.sm,
  },
  title: { fontSize: 14, fontWeight: '800', color: colors.text },
  barOuter: {
    height: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  barInner: { height: '100%', backgroundColor: colors.primary, borderRadius: radius.pill },
  pct: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
});
