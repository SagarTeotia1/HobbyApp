import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  videosWatched: number;
  streak: number;
  level: number;
}

export function SessionStatsRow({ videosWatched, streak, level }: Props) {
  const stats = [
    { value: String(videosWatched), label: 'Videos' },
    { value: streak > 0 ? `🔥 ${streak}` : '—', label: 'Day Streak' },
    { value: `Lv ${level}`, label: 'Level' },
  ];

  return (
    <View style={styles.row}>
      {stats.map((s) => (
        <View key={s.label} style={styles.card}>
          <Text style={styles.value}>{s.value}</Text>
          <Text style={styles.label}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  card: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: 4,
  },
  value: { fontSize: 20, fontWeight: '900', color: colors.text },
  label: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase' },
});
