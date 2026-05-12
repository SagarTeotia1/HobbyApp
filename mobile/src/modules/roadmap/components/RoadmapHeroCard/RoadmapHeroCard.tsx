import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  hobbyEmoji: string;
  hobbyName: string;
  level: number;
  xp: number;
  completedCount: number;
  totalCount: number;
  onStats: () => void;
  onChangeHobby: () => void;
}

export function RoadmapHeroCard({
  hobbyEmoji,
  hobbyName,
  level,
  xp,
  completedCount,
  totalCount,
  onStats,
  onChangeHobby,
}: Props) {
  const progressPct = totalCount > 0 ? Math.min((completedCount / totalCount) * 100, 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{hobbyEmoji}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.name} numberOfLines={1}>{hobbyName}</Text>
          <Text style={styles.level}>Lv {level} · {xp} XP</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.statsBtn, pressed && styles.statsBtnPressed]}
          onPress={onStats}>
          <Text style={styles.statsBtnIcon}>📊</Text>
          <Text style={styles.statsBtnLabel}>Stats</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.changeBtn, pressed && styles.changeBtnPressed]}
        onPress={onChangeHobby}>
        <Text style={styles.changeBtnText}>🔄  Change Hobby</Text>
        <Text style={styles.changeBtnArrow}>›</Text>
      </Pressable>

      <View style={styles.progress}>
        <View style={styles.progressMeta}>
          <Text style={styles.progressLabel}>{completedCount}/{totalCount} topics</Text>
          <Text style={styles.progressPct}>{Math.round(progressPct)}%</Text>
        </View>
        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${progressPct}%` }]} />
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
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  emojiWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 24 },
  meta: { flex: 1 },
  name: { fontSize: 17, fontWeight: '900', color: colors.textInverse, letterSpacing: -0.3 },
  level: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.65)', marginTop: 1 },
  statsBtn: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    minWidth: 52,
  },
  statsBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  statsBtnIcon: { fontSize: 14 },
  statsBtnLabel: { fontSize: 9, fontWeight: '800', color: 'rgba(255,255,255,0.9)', marginTop: 1, letterSpacing: 0.3 },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  changeBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  changeBtnText: { fontSize: 13, fontWeight: '900', color: colors.text },
  changeBtnArrow: { fontSize: 18, fontWeight: '900', color: colors.text },
  progress: { gap: 5 },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.6)', letterSpacing: 0.8, textTransform: 'uppercase' },
  progressPct: { fontSize: 10, fontWeight: '900', color: 'rgba(255,255,255,0.9)' },
  barOuter: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.pill, overflow: 'hidden' },
  barInner: { height: '100%', backgroundColor: colors.yellow, borderRadius: radius.pill },
});
