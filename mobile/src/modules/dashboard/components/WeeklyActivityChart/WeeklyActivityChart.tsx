import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface DailyActivity {
  day: string;
  value: number;
}

interface Props {
  data?: DailyActivity[];
  weeklyGoal?: number;
}

const DEFAULT_DATA: DailyActivity[] = [
  { day: 'MON', value: 0 },
  { day: 'TUE', value: 0 },
  { day: 'WED', value: 0 },
  { day: 'THU', value: 0 },
  { day: 'FRI', value: 0 },
  { day: 'SAT', value: 0 },
  { day: 'SUN', value: 0 },
];

const WEEKLY_GOAL_DEFAULT = 300;

export function WeeklyActivityChart({ data = DEFAULT_DATA, weeklyGoal = WEEKLY_GOAL_DEFAULT }: Props) {
  const totalXP = data.reduce((sum, d) => sum + d.value, 0);
  const goalPct = Math.min(Math.round((totalXP / weeklyGoal) * 100), 100);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>WEEKLY HUSTLE</Text>
        <View style={styles.motivationBadge}>
          <Text style={styles.motivationText}>{totalXP} XP THIS WEEK</Text>
        </View>
      </View>

      {/* Day capsules */}
      <View style={styles.capsules}>
        {data.map((item, i) => {
          const done = item.value > 0;
          return (
            <View key={i} style={[styles.capsule, done && styles.capsuleActive]}>
              <Text style={[styles.xpNum, done && styles.xpNumActive]}>
                {done ? item.value : '·'}
              </Text>
              <Text style={[styles.dayLabel, done && styles.dayLabelActive]}>
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Weekly goal bar */}
      <View style={styles.goalSection}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalLabel}>WEEKLY GOAL</Text>
          <Text style={styles.goalValue}>{totalXP} / {weeklyGoal} XP</Text>
        </View>
        <View style={styles.goalBarOuter}>
          <View style={[styles.goalBarFill, { width: `${goalPct}%` as `${number}%` }]} />
        </View>
        {goalPct >= 100 && (
          <Text style={styles.goalReached}>GOAL SMASHED! 🎉</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1.5,
  },
  motivationBadge: {
    backgroundColor: '#DCCCF7',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  motivationText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 0.5,
  },
  capsules: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  capsule: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xxs,
  },
  capsuleActive: {
    backgroundColor: colors.yellow,
    borderColor: colors.border,
  },
  xpNum: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textDim,
    lineHeight: 16,
  },
  xpNumActive: {
    color: colors.text,
    fontSize: 12,
  },
  dayLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: colors.textDim,
    letterSpacing: 0.5,
  },
  dayLabelActive: {
    color: colors.text,
    opacity: 0.7,
  },
  goalSection: {
    gap: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 2,
    borderTopColor: colors.borderLight,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  goalValue: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
  },
  goalBarOuter: {
    height: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  goalBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
  goalReached: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.success,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
