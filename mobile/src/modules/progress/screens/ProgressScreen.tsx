import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { colors, spacing, radius } from '../../../app/theme';
import type { AppStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.PROGRESS>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.PROGRESS>;

export function ProgressScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { hobbyId, videosWatched, xpEarned } = route.params;

  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);
  const updateStreak = useUserStore((s) => s.updateStreak);

  const getCompletedTopicCount = useRoadmapStore((s) => s.getCompletedTopicCount);
  const completedTopics = getCompletedTopicCount(hobbyId);
  const { roadmap } = useRoadmap(hobbyId);
  const totalTopics = roadmap?.stages.length ?? 0;
  const roadmapPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  useEffect(() => {
    updateStreak();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Top content */}
      <View style={styles.content}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🎉</Text>
          <Text style={styles.heroTitle}>Session Complete!</Text>
          <Text style={styles.heroSub}>Keep the momentum going</Text>
        </View>

        {/* XP earned highlight */}
        <View style={styles.xpBanner}>
          <Text style={styles.xpBannerLabel}>XP EARNED THIS SESSION</Text>
          <Text style={styles.xpBannerValue}>+{xpEarned}</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{videosWatched}</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{streak > 0 ? `🔥 ${streak}` : '—'}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>Lv {level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>

        {/* Roadmap progress */}
        <View style={styles.levelCard}>
          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>Roadmap Progress</Text>
            <Text style={styles.levelXP}>{completedTopics} / {totalTopics} topics</Text>
          </View>
          <View style={styles.barOuter}>
            <View style={[styles.barInner, { width: `${roadmapPct}%` }]} />
          </View>
          <Text style={styles.levelHint}>{roadmapPct}% complete · Lv {level} · {xp} XP</Text>
        </View>
      </View>

      {/* Sticky bottom actions */}
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
          onPress={() => navigation.navigate(ROUTES.ROADMAP)}>
          <Text style={styles.btnPrimaryText}>Continue Learning →</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed]}
          onPress={() => navigation.navigate(ROUTES.ROADMAP)}>
          <Text style={styles.btnSecondaryText}>🗺️ Go to Roadmap</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },

  // ── Hero ──────────────────────────────────────────────────────────
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  heroEmoji: { fontSize: 52 },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },

  // ── XP banner ─────────────────────────────────────────────────────
  xpBanner: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: 4,
  },
  xpBannerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  xpBannerValue: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },

  // ── Stats row ─────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
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
  statValue: { fontSize: 20, fontWeight: '900', color: colors.text },
  statLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase' },

  // ── Level card ────────────────────────────────────────────────────
  levelCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelLabel: { fontSize: 13, fontWeight: '900', color: colors.textInverse },
  levelXP: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.6)' },
  barOuter: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  barInner: { height: '100%', backgroundColor: colors.yellow, borderRadius: radius.pill },
  levelHint: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },

  // ── Action buttons (sticky bottom) ────────────────────────────────
  actions: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  btnPrimary: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  btnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  btnPrimaryText: { fontSize: 16, fontWeight: '900', color: colors.textInverse },
  btnSecondaryText: { fontSize: 16, fontWeight: '800', color: colors.text },
});
