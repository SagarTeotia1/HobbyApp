import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { getHobbyById } from '../../../shared/constants/curriculum';
import { GAME_CONFIG } from '../../../shared/constants/gameConfig';
import { colors, spacing, radius } from '../../../app/theme';
import type { AppStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.DASHBOARD>;

export function DashboardScreen() {
  const navigation = useNavigation<Nav>();

  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? 'chess';
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);
  const skillLevel = useUserStore((s) => s.skillLevel);

  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);
  const resetRoadmap = useRoadmapStore((s) => s.reset);
  const { roadmap } = useRoadmap(hobbyId);
  const stages = roadmap?.stages ?? [];
  const totalTopics = stages.length;
  const completedTopics = stages.filter(
    (s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true,
  ).length;
  const hobby = getHobbyById(hobbyId);

  const xpInLevel = xp % GAME_CONFIG.LEVELS.XP_PER_LEVEL;
  const progressToNextLevel = xpInLevel / GAME_CONFIG.LEVELS.XP_PER_LEVEL;

  const handleBack = () => navigation.navigate(ROUTES.ROADMAP);

  const handleResetProfile = useCallback(() => {
    Alert.alert(
      'Reset Profile',
      'This will erase all XP, progress, and roadmap data. Cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetRoadmap();
            useUserStore.getState().reset();
          },
        },
      ],
    );
  }, [resetRoadmap]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
            onPress={handleBack}>
            <Text style={styles.backBtnText}>← Roadmap</Text>
          </Pressable>
          <Text style={styles.screenTitle}>Stats</Text>
        </View>

        {/* Hero card */}
        <View style={[styles.heroCard, { backgroundColor: hobby?.accentColor ?? colors.primary }]}>
          <Text style={styles.heroEmoji}>{hobby?.emoji ?? '🎯'}</Text>
          <Text style={styles.heroHobby}>{hobby?.name ?? hobbyId}</Text>
          <Text style={styles.heroCategory}>{hobby?.category}</Text>
          <View style={styles.heroLevelRow}>
            <Text style={styles.heroLevel}>Level {level}</Text>
            <Text style={styles.heroSkill}>{skillLevel.toUpperCase()}</Text>
          </View>
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{streak > 0 ? `🔥 ${streak}` : '—'}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completedTopics}</Text>
            <Text style={styles.statLabel}>Topics Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Math.max(0, totalTopics - completedTopics)}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>

        {/* Level progress */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>Level {level} → {level + 1}</Text>
            <Text style={styles.levelXP}>{xpInLevel} / {GAME_CONFIG.LEVELS.XP_PER_LEVEL} XP</Text>
          </View>
          <View style={styles.levelBarOuter}>
            <View style={[styles.levelBarInner, { width: `${progressToNextLevel * 100}%` }]} />
          </View>
        </View>

        {/* Roadmap progress */}
        <View style={styles.roadmapCard}>
          <Text style={styles.roadmapTitle}>Roadmap Progress</Text>
          <View style={styles.roadmapBarOuter}>
            <View
              style={[
                styles.roadmapBarInner,
                { width: `${totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0}%` },
              ]}
            />
          </View>
          <Text style={styles.roadmapPercent}>
            {totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0}% complete
          </Text>
        </View>

        {/* Reset profile */}
        <Pressable
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
          onPress={handleResetProfile}>
          <Text style={styles.resetBtnText}>Reset Profile</Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>
      <FloatingAIButton hobbyId={hobbyId} context="dashboard" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  backBtn: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.bgElevated,
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  backBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  backBtnText: { fontSize: 13, fontWeight: '800', color: colors.text },
  screenTitle: { fontSize: 22, fontWeight: '900', color: colors.text },
  heroCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.xs,
  },
  heroEmoji: { fontSize: 36 },
  heroHobby: { fontSize: 24, fontWeight: '900', color: colors.text },
  heroCategory: { fontSize: 13, fontWeight: '600', color: colors.text, opacity: 0.7 },
  heroLevelRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
    alignItems: 'center',
  },
  heroLevel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.bgElevated,
  },
  heroSkill: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  statValue: { fontSize: 22, fontWeight: '900', color: colors.text },
  statLabel: { fontSize: 11, fontWeight: '700', color: colors.textMuted, marginTop: 4, letterSpacing: 0.5 },
  levelCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: spacing.sm,
  },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  levelTitle: { fontSize: 14, fontWeight: '800', color: colors.text },
  levelXP: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
  levelBarOuter: {
    height: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  levelBarInner: { height: '100%', backgroundColor: colors.yellow, borderRadius: radius.pill },
  roadmapCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgElevated,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    gap: spacing.sm,
  },
  roadmapTitle: { fontSize: 14, fontWeight: '800', color: colors.text },
  roadmapBarOuter: {
    height: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  roadmapBarInner: { height: '100%', backgroundColor: colors.primary, borderRadius: radius.pill },
  roadmapPercent: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
  resetBtn: {
    borderWidth: 2,
    borderColor: colors.danger,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.bgElevated,
    shadowColor: colors.danger,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  resetBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  resetBtnText: { fontSize: 14, fontWeight: '800', color: colors.danger },
  bottomSpacer: { height: 20 },
});
