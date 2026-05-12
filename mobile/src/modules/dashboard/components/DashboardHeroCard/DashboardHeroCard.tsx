import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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
  onChangeHobby?: () => void;
}

const SKILL_PREFIX: Record<DifficultyLevel, string> = {
  beginner: 'CAMPFIRE',
  intermediate: 'RISING',
  advanced: 'MASTER',
};

function getLevelTitle(level: number): string {
  if (level <= 2) return 'ROOKIE';
  if (level <= 4) return 'ADVENTURER';
  if (level <= 7) return 'WARRIOR';
  if (level <= 10) return 'CHAMPION';
  return 'LEGEND';
}

export function DashboardHeroCard({
  emoji, name, category, level, xp, streak, skillLevel,
  accentColor, completedTopics, totalTopics, onChangeHobby,
}: Props) {
  const progressPct = totalTopics > 0 ? Math.min(Math.round((completedTopics / totalTopics) * 100), 100) : 0;
  const cardBg = accentColor ?? colors.yellow;
  const customTitle = `${SKILL_PREFIX[skillLevel]} ${getLevelTitle(level)}`;

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      {/* ── Header row ── */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerLabel}>CURRENT HOBBY</Text>
          {category ? <Text style={styles.categoryLabel}>{category.toUpperCase()}</Text> : null}
        </View>
        {onChangeHobby && (
          <Pressable
            style={({ pressed }) => [styles.changeBtn, pressed && styles.changeBtnPressed]}
            onPress={onChangeHobby}>
            <Text style={styles.changeBtnText}>CHANGE ➔</Text>
          </Pressable>
        )}
      </View>

      {/* ── Main body row ── */}
      <View style={styles.bodyRow}>
        {/* Hobby badge art */}
        <View style={styles.badgeWrap}>
          <View style={styles.badgeOuter}>
            <View style={styles.badgeInner}>
              <Text style={styles.badgeEmoji}>{emoji}</Text>
            </View>
            <View style={styles.dotTR} />
            <View style={styles.dotBL} />
          </View>
        </View>

        {/* Hobby info */}
        <View style={styles.infoCol}>
          <Text style={styles.hobbyName} numberOfLines={1}>{name.toUpperCase()}</Text>
          <Text style={styles.customTitle}>{customTitle}</Text>
          <View style={styles.pillRow}>
            <View style={styles.pillDark}>
              <Text style={styles.pillDarkText}>LEVEL {level}</Text>
            </View>
            <View style={styles.pillLight}>
              <Text style={styles.pillLightText}>{skillLevel.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Stats column */}
        <View style={styles.statCol}>
          <View style={styles.statBlock}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>STREAK</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
        </View>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>ROADMAP PROGRESS</Text>
          <Text style={styles.progressCount}>{completedTopics} / {totalTopics} TOPICS</Text>
        </View>
        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${progressPct}%` as `${number}%` }]} />
          {progressPct > 0 && (
            <Text style={[styles.barPct, { left: `${Math.min(progressPct, 85)}%` as `${number}%` }]}>
              {progressPct}%
            </Text>
          )}
        </View>
      </View>

      {/* ── Floating sticker ── */}
      <View style={styles.sticker}>
        <Text style={styles.stickerText}>KEEP GOING! 💪</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 6,
    gap: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    opacity: 0.6,
    letterSpacing: 2,
  },
  categoryLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.text,
    opacity: 0.45,
    letterSpacing: 1.5,
    marginTop: 1,
  },
  changeBtn: {
    backgroundColor: colors.bgElevated,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  changeBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
  },
  changeBtnText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  badgeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeOuter: {
    width: 72,
    height: 72,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInner: {
    width: 64,
    height: 64,
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
  dotTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.bgElevated,
    borderWidth: 2,
    borderColor: colors.border,
  },
  dotBL: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  infoCol: {
    flex: 1,
    gap: spacing.xs,
  },
  hobbyName: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  customTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.text,
    opacity: 0.65,
    letterSpacing: 0.5,
  },
  pillRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xxs,
    flexWrap: 'wrap',
  },
  pillDark: {
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  pillDarkText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.bgElevated,
    letterSpacing: 0.5,
  },
  pillLight: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  pillLightText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
    opacity: 0.75,
    letterSpacing: 0.5,
  },
  statCol: {
    width: 64,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.15)',
    paddingVertical: spacing.sm,
    gap: 0,
  },
  statBlock: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
    width: '100%',
  },
  statIcon: { fontSize: 14 },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    lineHeight: 20,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: colors.text,
    opacity: 0.6,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: '70%',
    height: 1.5,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  progressSection: {
    gap: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 2,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.text,
    opacity: 0.6,
    letterSpacing: 1.5,
  },
  progressCount: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    opacity: 0.8,
  },
  barOuter: {
    height: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
  },
  barInner: {
    height: '100%',
    backgroundColor: colors.bgElevated,
    borderRadius: radius.pill,
  },
  barPct: {
    position: 'absolute',
    top: 0,
    fontSize: 9,
    fontWeight: '900',
    color: colors.text,
    lineHeight: 14,
    paddingLeft: 4,
  },
  sticker: {
    position: 'absolute',
    bottom: spacing.lg + 32,
    right: spacing.md,
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    transform: [{ rotate: '-3deg' }],
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  stickerText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 0.5,
  },
});
