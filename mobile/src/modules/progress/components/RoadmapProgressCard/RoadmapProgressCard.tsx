import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

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
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.dot} />
          <Text style={styles.title}>ROADMAP</Text>
        </View>
        <Text style={styles.count}>{completedTopics}/{totalTopics}</Text>
      </View>

      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct}%` }]} />
        {pct > 0 && (
          <View style={[styles.barLabel, { left: `${Math.min(pct, 88)}%` }]}>
            <Text style={styles.barLabelText}>{pct}%</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Lv {level}</Text>
        <Text style={styles.footerSep}>·</Text>
        <Text style={styles.footerText}>{xp} XP total</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.bgElevated,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 2, backgroundColor: colors.primary },
  title: { fontSize: 12, fontWeight: '900', color: colors.text, letterSpacing: 1.5 },
  count: { fontSize: 11, fontWeight: '700', color: colors.textMuted },
  barTrack: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'visible',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  barLabel: {
    position: 'absolute',
    top: -18,
    backgroundColor: colors.text,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  barLabelText: { fontSize: 8, fontWeight: '900', color: colors.bg },
  footer: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  footerText: { fontSize: 11, fontWeight: '700', color: colors.textMuted },
  footerSep: { fontSize: 11, color: colors.borderLight },
});
