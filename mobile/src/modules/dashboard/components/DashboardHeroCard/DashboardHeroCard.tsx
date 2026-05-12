import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';
import type { DifficultyLevel } from '../../../../shared/types/card.types';

interface Props {
  emoji: string;
  name: string;
  category?: string;
  level: number;
  xp: number;
  streak: number;
  skillLevel: DifficultyLevel;
  accentColor?: string;
  completedTopics: number;
  totalTopics: number;
  progressPct: number;        // video-level progress 0-100
  videosWatched: number;
  totalVideos: number;
}

const SKILL_PREFIX: Record<DifficultyLevel, string> = {
  beginner:     'CAMPFIRE',
  intermediate: 'RISING',
  advanced:     'MASTER',
};

function getLevelTitle(level: number): string {
  if (level <= 2)  return 'ROOKIE';
  if (level <= 4)  return 'ADVENTURER';
  if (level <= 7)  return 'WARRIOR';
  if (level <= 10) return 'CHAMPION';
  return 'LEGEND';
}

export function DashboardHeroCard({
  emoji, name, category, level, xp, streak, skillLevel,
  accentColor, completedTopics, totalTopics, progressPct,
  videosWatched, totalVideos,
}: Props) {
  const cardBg = accentColor ?? colors.yellow;
  const customTitle = `${SKILL_PREFIX[skillLevel]} ${getLevelTitle(level)}`;

  return (
    <View style={styles.card}>

      {/* ── POSTER TOP — coloured bg + geometric shapes ── */}
      <View style={[styles.posterTop, { backgroundColor: cardBg }]}>

        {/* Decorative shapes (like NextUpCard poster art) */}
        <View style={styles.shapeCircle} />
        <View style={styles.shapeRect} />
        <View style={styles.shapeDotTL} />
        <View style={styles.shapeDotBR} />
        <View style={styles.shapeLine} />

        {/* CURRENT HOBBY label */}
        <Text style={styles.posterLabel}>CURRENT HOBBY</Text>
        {category ? <Text style={styles.categoryLabel}>{category.toUpperCase()}</Text> : null}

        {/* Main row: badge | info | stats */}
        <View style={styles.bodyRow}>

          {/* Hobby badge */}
          <View style={styles.badgeWrap}>
            <View style={styles.badgeInner}>
              <Text style={styles.badgeEmoji}>{emoji}</Text>
            </View>
          </View>

          {/* Info */}
          <View style={styles.infoCol}>
            <Text style={styles.hobbyName} numberOfLines={1}>{name.toUpperCase()}</Text>
            <Text style={styles.customTitle}>{customTitle}</Text>
            <View style={styles.pillRow}>
              <View style={styles.pillDark}>
                <Text style={styles.pillDarkText}>LVL {level}</Text>
              </View>
              <View style={styles.pillGlass}>
                <Text style={styles.pillGlassText}>{skillLevel.toUpperCase()}</Text>
              </View>
            </View>
          </View>

          {/* Stat column */}
          <View style={styles.statCol}>
            <View style={styles.statBlock}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statVal}>{streak}</Text>
              <Text style={styles.statLbl}>STREAK</Text>
            </View>
            <View style={styles.statSep} />
            <View style={styles.statBlock}>
              <Text style={styles.statIcon}>⭐</Text>
              <Text style={styles.statVal}>{xp}</Text>
              <Text style={styles.statLbl}>XP</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── PROGRESS BOTTOM — white strip ── */}
      <View style={styles.progressBottom}>
        <View style={styles.progressRow}>
          <View>
            <Text style={styles.progressLabel}>YOUR PROGRESS</Text>
            <Text style={styles.progressSub}>
              {videosWatched} videos · {completedTopics}/{totalTopics} topics done
            </Text>
          </View>
          <View style={styles.pctBadge}>
            <Text style={styles.pctText}>{Math.round(progressPct)}%</Text>
          </View>
        </View>

        {/* Segmented progress bar */}
        <View style={styles.barOuter}>
          <View style={[styles.barFill, { width: `${Math.max(progressPct, 2)}%` as `${number}%` }]} />
        </View>

        {/* Floating sticker */}
        {progressPct > 0 && (
          <View style={styles.sticker}>
            <Text style={styles.stickerText}>
              {progressPct >= 100 ? '🏆 COMPLETE!' : progressPct >= 50 ? '🔥 HALFWAY!' : 'KEEP GOING! 💪'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 6,
  },

  // ── Poster top ────────────────────────────────────────────────
  posterTop: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    gap: spacing.xs,
  },

  // Geometric decorations
  shapeCircle: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.12)',
    top: -40,
    right: -30,
  },
  shapeRect: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.07)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.12)',
    bottom: -20,
    left: 60,
    transform: [{ rotate: '18deg' }],
  },
  shapeDotTL: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.18)',
    top: spacing.md,
    right: 90,
  },
  shapeDotBR: {
    position: 'absolute',
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    bottom: spacing.lg,
    right: spacing.lg,
  },
  shapeLine: {
    position: 'absolute',
    width: 60,
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 2,
    bottom: spacing.xl + 6,
    left: spacing.lg,
    transform: [{ rotate: '-6deg' }],
  },

  posterLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(0,0,0,0.55)',
    letterSpacing: 2,
  },
  categoryLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.38)',
    letterSpacing: 1.5,
  },

  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },

  badgeWrap: { alignItems: 'center' },
  badgeInner: {
    width: 68,
    height: 68,
    borderRadius: radius.lg,
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  badgeEmoji: { fontSize: 30 },

  infoCol: { flex: 1, gap: spacing.xxs },
  hobbyName: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 22,
  },
  customTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.55)',
    letterSpacing: 0.5,
  },
  pillRow: { flexDirection: 'row', gap: spacing.xs, marginTop: 2, flexWrap: 'wrap' },
  pillDark: {
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  pillDarkText: { fontSize: 9, fontWeight: '900', color: colors.bgElevated, letterSpacing: 0.5 },
  pillGlass: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  pillGlassText: { fontSize: 9, fontWeight: '800', color: 'rgba(0,0,0,0.65)', letterSpacing: 0.5 },

  statCol: {
    width: 62,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.15)',
    paddingVertical: spacing.xs,
  },
  statBlock: { alignItems: 'center', paddingVertical: spacing.xs, width: '100%' },
  statIcon: { fontSize: 13 },
  statVal: { fontSize: 15, fontWeight: '900', color: colors.text, lineHeight: 18 },
  statLbl: { fontSize: 7, fontWeight: '900', color: 'rgba(0,0,0,0.5)', letterSpacing: 0.5 },
  statSep: { width: '65%', height: 1.5, backgroundColor: 'rgba(0,0,0,0.15)' },

  // ── Progress bottom ───────────────────────────────────────────
  progressBottom: {
    backgroundColor: colors.bgElevated,
    padding: spacing.lg,
    gap: spacing.sm,
    borderTopWidth: 3,
    borderTopColor: colors.border,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1.5,
  },
  progressSub: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: 2,
  },
  pctBadge: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
  },
  pctText: { fontSize: 16, fontWeight: '900', color: colors.text },

  barOuter: {
    height: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },

  sticker: {
    alignSelf: 'flex-end',
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    transform: [{ rotate: '-2deg' }],
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  stickerText: { fontSize: 10, fontWeight: '900', color: colors.text, letterSpacing: 0.5 },
});
