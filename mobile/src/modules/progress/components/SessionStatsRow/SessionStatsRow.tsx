import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

interface Props {
  videosWatched: number;
  streak: number;
  level: number;
}

const STAT_COLORS = [colors.primary, '#B7D7F2', '#CFE1B9'];
const STAT_TEXT = ['rgba(255,255,255,0.9)', colors.text, colors.text];

export function SessionStatsRow({ videosWatched, streak, level }: Props) {
  const stats = [
    { value: String(videosWatched), label: 'VIDEOS' },
    { value: streak > 0 ? `${streak}🔥` : '0', label: 'STREAK' },
    { value: `${level}`, label: 'LEVEL' },
  ];

  return (
    <View style={styles.row}>
      {stats.map((s, i) => (
        <View key={s.label} style={[styles.card, { backgroundColor: STAT_COLORS[i] }]}>
          <Text style={[styles.value, { color: STAT_TEXT[i] }]}>{s.value}</Text>
          <Text style={[styles.label, { color: i === 0 ? 'rgba(255,255,255,0.6)' : colors.textMuted }]}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm },
  card: {
    flex: 1,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: 4,
  },
  value: { fontSize: 22, fontWeight: '900' },
  label: { fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
});
