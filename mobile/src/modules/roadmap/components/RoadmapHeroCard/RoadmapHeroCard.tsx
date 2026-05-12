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
  skillLevel?: string;
}

const SKILL_ACCENT: Record<string, string> = {
  beginner:     '#BBF7D0',
  intermediate: '#FED7AA',
  advanced:     '#C4B5FD',
};

export function RoadmapHeroCard({
  hobbyEmoji, hobbyName, level, xp,
  completedCount, totalCount, skillLevel = 'beginner',
}: Props) {
  const pct = totalCount > 0 ? Math.min(Math.round((completedCount / totalCount) * 100), 100) : 0;
  const accent = SKILL_ACCENT[skillLevel] ?? '#BBF7D0';
  const remaining = Math.max(0, totalCount - completedCount);

  return (
    <View style={styles.card}>

      {/* Geometric decorations */}
      <View style={styles.shapeBigCircle} />
      <View style={styles.shapeRect} />
      <View style={styles.shapeDot} />
      <View style={styles.shapeLine} />

      {/* Top row */}
      <View style={styles.topRow}>
        {/* Emoji badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeEmoji}>{hobbyEmoji}</Text>
        </View>

        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.overLabel}>LEARNING ROADMAP</Text>
          <Text style={styles.hobbyName} numberOfLines={1}>{hobbyName.toUpperCase()}</Text>
          <View style={styles.pillRow}>
            <View style={[styles.pill, { backgroundColor: accent }]}>
              <Text style={styles.pillText}>{skillLevel.toUpperCase()}</Text>
            </View>
            <View style={styles.pillDark}>
              <Text style={styles.pillDarkText}>LVL {level}</Text>
            </View>
            <View style={styles.pillXP}>
              <Text style={styles.pillXPText}>⭐ {xp} XP</Text>
            </View>
          </View>
        </View>

        {/* Pct badge */}
        <View style={styles.pctWrap}>
          <View style={styles.pctShadow} />
          <View style={styles.pctFace}>
            <Text style={styles.pctNum}>{pct}%</Text>
            <Text style={styles.pctLabel}>DONE</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statBlock}>
          <Text style={styles.statVal}>{completedCount}</Text>
          <Text style={styles.statLbl}>COMPLETED</Text>
        </View>
        <View style={styles.statSep} />
        <View style={styles.statBlock}>
          <Text style={styles.statVal}>{remaining}</Text>
          <Text style={styles.statLbl}>REMAINING</Text>
        </View>
        <View style={styles.statSep} />
        <View style={styles.statBlock}>
          <Text style={styles.statVal}>{totalCount}</Text>
          <Text style={styles.statLbl}>TOTAL</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.barOuter}>
        <View style={[styles.barFill, { width: `${Math.max(pct, pct > 0 ? 2 : 0)}%` as `${number}%` }]} />
        {pct > 0 && pct < 100 && (
          <View style={[styles.barTick, { left: `${pct}%` as `${number}%` }]} />
        )}
      </View>
      <View style={styles.barLabels}>
        <Text style={styles.barLabelLeft}>START</Text>
        <Text style={styles.barLabelRight}>
          {pct >= 100 ? '🏆 COMPLETE!' : pct >= 50 ? '🔥 HALFWAY!' : `${pct}% DONE`}
        </Text>
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
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 6,
    overflow: 'hidden',
    gap: spacing.sm,
    position: 'relative',
  },

  // Decorations
  shapeBigCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -50,
  },
  shapeRect: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(255,214,0,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,214,0,0.15)',
    bottom: -20,
    left: 40,
    transform: [{ rotate: '22deg' }],
  },
  shapeDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    top: spacing.lg,
    right: 110,
  },
  shapeLine: {
    position: 'absolute',
    width: 50,
    height: 2.5,
    backgroundColor: 'rgba(255,214,0,0.25)',
    borderRadius: 2,
    bottom: 36,
    right: spacing.xl,
    transform: [{ rotate: '-5deg' }],
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    zIndex: 1,
  },
  badge: {
    width: 62,
    height: 62,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: { fontSize: 28 },

  titleBlock: { flex: 1, gap: spacing.xxs },
  overLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 2,
  },
  hobbyName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: -0.3,
    lineHeight: 21,
  },
  pillRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  pillText: { fontSize: 8, fontWeight: '900', color: colors.text, letterSpacing: 0.5 },
  pillDark: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  pillDarkText: { fontSize: 8, fontWeight: '900', color: colors.textInverse, letterSpacing: 0.5 },
  pillXP: {
    backgroundColor: 'rgba(255,214,0,0.2)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255,214,0,0.3)',
  },
  pillXPText: { fontSize: 8, fontWeight: '900', color: colors.yellow, letterSpacing: 0.5 },

  pctWrap: { position: 'relative' },
  pctShadow: {
    position: 'absolute',
    top: 3, left: 3, right: -3, bottom: -3,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: radius.md,
  },
  pctFace: {
    backgroundColor: colors.yellow,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    zIndex: 1,
  },
  pctNum: { fontSize: 18, fontWeight: '900', color: colors.text, lineHeight: 22 },
  pctLabel: { fontSize: 7, fontWeight: '900', color: colors.text, letterSpacing: 1 },

  // Divider
  divider: {
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    zIndex: 1,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  statBlock: { flex: 1, alignItems: 'center', gap: 1 },
  statVal: { fontSize: 20, fontWeight: '900', color: colors.textInverse, lineHeight: 24 },
  statLbl: { fontSize: 8, fontWeight: '800', color: 'rgba(255,255,255,0.45)', letterSpacing: 1 },
  statSep: { width: 1.5, height: 28, backgroundColor: 'rgba(255,255,255,0.12)' },

  // Progress bar
  barOuter: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    zIndex: 1,
    position: 'relative',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: radius.pill,
  },
  barTick: {
    position: 'absolute',
    top: 1,
    bottom: 1,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 1,
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    marginTop: -2,
  },
  barLabelLeft: { fontSize: 8, fontWeight: '800', color: 'rgba(255,255,255,0.35)', letterSpacing: 1 },
  barLabelRight: { fontSize: 8, fontWeight: '900', color: colors.yellow, letterSpacing: 0.5 },
});
