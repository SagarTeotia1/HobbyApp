import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { DashboardHeroCard } from '../components/DashboardHeroCard/DashboardHeroCard';
import { StatsGrid } from '../components/StatsGrid/StatsGrid';
import { NextUpCard } from '../components/NextUpCard/NextUpCard';
import { WeeklyActivityChart } from '../components/WeeklyActivityChart/WeeklyActivityChart';
import { ResetConfirmModal } from '../components/ResetConfirmModal/ResetConfirmModal';
import { ChangeHobbySheet } from '../../../shared/components/ChangeHobbySheet';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { getHobbyById } from '../../../shared/constants/curriculum';
import { roadmapService } from '../../roadmap/services/roadmap.service';
import { colors, spacing, radius } from '../../../app/theme';
import type { MainTabParamList, AppStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof ROUTES.DASHBOARD>,
  NativeStackNavigationProp<AppStackParamList>
>;

const STAT_ACCENTS = ['#CFE1B9', '#FFF2CC', '#DCCCF7', '#F3B0A8'];
const STAT_ICONS = ['✓', '📋', '⭐', '🔥'];

export function DashboardScreen() {
  const navigation = useNavigation<Nav>();

  const hobbyId = useUserStore((s) => s.currentHobbyId);
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const streak = useUserStore((s) => s.streak);
  const skillLevel = useUserStore((s) => s.skillLevel);
  const dailyTimeMinutes = useUserStore((s) => s.dailyTimeMinutes);
  const setHobby = useUserStore((s) => s.setHobby);
  const resetUser = useUserStore((s) => s.reset);

  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);
  const resetRoadmap = useRoadmapStore((s) => s.reset);

  const { roadmap, invalidate } = useRoadmap(hobbyId ?? '');
  const stages = roadmap?.stages ?? [];
  const completedTopics = hobbyId
    ? stages.filter((s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true).length
    : 0;

  const nextTopicIndex = stages.findIndex((s) => !getTopicProgress(hobbyId ?? '', s.conceptId)?.completed);
  const nextTopic = nextTopicIndex >= 0 ? stages[nextTopicIndex] : null;

  const hobby = hobbyId ? getHobbyById(hobbyId) : null;
  const [resetOpen, setResetOpen] = useState(false);
  const [hobbySheetOpen, setHobbySheetOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleConfirmReset = useCallback(() => {
    resetRoadmap();
    resetUser();
    setResetOpen(false);
  }, [resetRoadmap, resetUser]);

  const handleChangeHobby = useCallback(
    async (newHobbyId: string) => {
      if (newHobbyId === hobbyId) { setHobbySheetOpen(false); return; }
      setGenerating(true);
      invalidate();
      try {
        const data = await roadmapService.generateRoadmap(newHobbyId, skillLevel, dailyTimeMinutes);
        setHobby(data.hobbyId ?? newHobbyId);
      } catch (e) {
        console.warn('[DashboardScreen] Change hobby failed:', e);
        setHobby(newHobbyId);
      } finally {
        setGenerating(false);
        setHobbySheetOpen(false);
      }
    },
    [hobbyId, skillLevel, dailyTimeMinutes, setHobby, invalidate],
  );

  if (!hobbyId) return null;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        {/* ── Greeting header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>HEY THERE 👋</Text>
            <Text style={styles.subGreeting}>Let's level up your skills today.</Text>
          </View>
        </View>

        {/* ── Hero card ── */}
        <DashboardHeroCard
          emoji={hobby?.emoji ?? '🎯'}
          name={hobby?.name ?? hobbyId}
          category={hobby?.category}
          level={level}
          xp={xp}
          streak={streak}
          skillLevel={skillLevel}
          accentColor={hobby?.accentColor}
          completedTopics={completedTopics}
          totalTopics={stages.length}
          onChangeHobby={() => setHobbySheetOpen(true)}
        />

        {/* ── Section: Continue Learning ── */}
        {nextTopic && (
          <>
            <Text style={styles.sectionTitle}>CONTINUE LEARNING</Text>
            <NextUpCard
              hobbyId={hobbyId}
              hobbyName={hobby?.name ?? hobbyId}
              topicId={nextTopic.conceptId}
              topicName={nextTopic.title}
              topicIndex={nextTopicIndex}
              skillLevel={skillLevel}
              onPress={() => navigation.navigate(ROUTES.FEED, {
                hobbyId,
                topicId: nextTopic.conceptId,
                topicName: nextTopic.title,
                stageIndex: nextTopicIndex,
              })}
            />
          </>
        )}

        {/* ── Section: Stats ── */}
        <Text style={styles.sectionTitle}>YOUR STATS</Text>
        <StatsGrid
          stats={[
            { value: xp, label: 'Total XP', icon: STAT_ICONS[2], accent: STAT_ACCENTS[2] },
            { value: streak > 0 ? streak : 0, label: 'Day Streak', icon: STAT_ICONS[3], accent: STAT_ACCENTS[3] },
            { value: completedTopics, label: 'Topics Done', icon: STAT_ICONS[0], accent: STAT_ACCENTS[0] },
            { value: Math.max(0, stages.length - completedTopics), label: 'Remaining', icon: STAT_ICONS[1], accent: STAT_ACCENTS[1] },
          ]}
        />

        {/* ── Section: Weekly hustle ── */}
        <Text style={styles.sectionTitle}>WEEKLY HUSTLE</Text>
        <WeeklyActivityChart />

        {/* ── Reset button ── */}
        <Pressable
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
          onPress={() => setResetOpen(true)}>
          <Text style={styles.resetBtnText}>RESET PROFILE</Text>
        </Pressable>
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="dashboard" />

      <ResetConfirmModal
        visible={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={handleConfirmReset}
      />

      <ChangeHobbySheet
        visible={hobbySheetOpen}
        currentHobbyId={hobbyId}
        generating={generating}
        onSelect={handleChangeHobby}
        onClose={() => setHobbySheetOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subGreeting: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 2,
    marginTop: spacing.xs,
    marginBottom: -spacing.xs,
  },
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
    marginTop: spacing.sm,
  },
  resetBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.danger,
    letterSpacing: 1.5,
  },
});
