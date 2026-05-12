import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  hobbyEmoji: string;
  hobbyName: string;
  level: number;
  xp: number;
  completedCount: number;
  totalCount: number;
}

export function RoadmapHeroCard({
  hobbyEmoji,
  hobbyName,
  level,
  xp,
  completedCount,
  totalCount,
}: Props) {
  const progressPct = totalCount > 0 ? Math.min((completedCount / totalCount) * 100, 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{hobbyEmoji}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.name} numberOfLines={1}>{hobbyName.toUpperCase()}</Text>
          <Text style={styles.level}>Lv {level} · {xp} XP</Text>
        </View>
        <View style={styles.completionBadge}>
          <Text style={styles.completionText}>{Math.round(progressPct)}%</Text>
          <Text style={styles.completionLabel}>DONE</Text>
        </View>
      </View>

      <View style={styles.progress}>
        <View style={styles.progressMeta}>
          <Text style={styles.progressLabel}>{completedCount}/{totalCount} TOPICS</Text>
          <Text style={styles.progressPct}>ROADMAP PROGRESS</Text>
        </View>
        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${progressPct}%` as `${number}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
    gap: spacing.sm,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  emojiWrap: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 24 },
  meta: { flex: 1 },
  name: { fontSize: 18, fontWeight: '900', color: colors.textInverse, letterSpacing: -0.3 },
  level: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.6)', marginTop: 1 },
  completionBadge: {
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    alignItems: 'center',
  },
  completionText: { fontSize: 16, fontWeight: '900', color: colors.text, lineHeight: 20 },
  completionLabel: { fontSize: 8, fontWeight: '900', color: colors.text, letterSpacing: 1 },
  progress: { gap: spacing.xs },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 10, fontWeight: '900', color: 'rgba(255,255,255,0.65)', letterSpacing: 0.8 },
  progressPct: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: 1 },
  barOuter: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  barInner: { height: '100%', backgroundColor: colors.yellow, borderRadius: radius.pill },
});
