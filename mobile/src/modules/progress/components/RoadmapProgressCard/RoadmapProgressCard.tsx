import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  completedTopics: number;
  totalTopics: number;
  xp: number;
  level: number;
}

export function RoadmapProgressCard({ completedTopics, totalTopics, xp, level }: Props) {
  const pct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Roadmap Progress</Text>
        <Text style={styles.count}>{completedTopics} / {totalTopics} topics</Text>
      </View>
      <View style={styles.barOuter}>
        <View style={[styles.barInner, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.hint}>{pct}% complete · Lv {level} · {xp} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 13, fontWeight: '900', color: colors.textInverse },
  count: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.6)' },
  barOuter: { height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.pill, overflow: 'hidden' },
  barInner: { height: '100%', backgroundColor: colors.yellow, borderRadius: radius.pill },
  hint: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
});
