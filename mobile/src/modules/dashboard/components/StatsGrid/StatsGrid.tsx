import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface StatItem {
  value: string | number;
  label: string;
  icon: string;
  accent: string;
}

interface Props {
  stats: StatItem[];
}

export function StatsGrid({ stats }: Props) {
  return (
    <View style={styles.grid}>
      {stats.map((s) => (
        <View key={s.label} style={[styles.card, { backgroundColor: s.accent }]}>
          <Text style={styles.icon}>{s.icon}</Text>
          <Text style={styles.value}>{s.value}</Text>
          <Text style={styles.label}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
    gap: spacing.xxs,
  },
  icon: {
    fontSize: 20,
  },
  value: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
