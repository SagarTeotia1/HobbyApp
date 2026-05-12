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
import { RoadmapPreview } from '../components/RoadmapPreview/RoadmapPreview';
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

const DEFAULT_VIDEOS_PER_TOPIC = 5;
const STAT_ACCENTS = ['#DCCCF7', '#F3B0A8', '#CFE1B9', '#FFF2CC'];
const STAT_ICONS   = ['⭐', '🔥', '✓', '📋'];

export function DashboardScreen() {
  const navigation = useNavigation<Nav>();

  const hobbyId          = useUserStore((s) => s.currentHobbyId);
  const xp               = useUserStore((s) => s.xp);
  const level            = useUserStore((s) => s.level);
  const streak           = useUserStore((s) => s.streak);
  const skillLevel       = useUserStore((s) => s.skillLevel);
  const dailyTimeMinutes = useUserStore((s) => s.dailyTimeMinutes);
  const setHobby         = useUserStore((s) => s.setHobby);
  const resetUser        = useUserStore((s) => s.reset);

  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);
  const resetRoadmap     = useRoadmapStore((s) => s.reset);

  const { roadmap, invalidate } = useRoadmap(hobbyId ?? '');
  const stages = roadmap?.stages ?? [];

  const completedTopics = hobbyId
    ? stages.filter((s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true).length
    : 0;

  // ── Video-level progress (updates every time a video is watched) ──
  const totalVideosWatched = hobbyId
    ? stages.reduce((sum, s) => {
        const p = getTopicProgress(hobbyId, s.conceptId);
        return sum + (p?.videosWatched ?? 0);
      }, 0)
    : 0;

  const totalVideosExpected = hobbyId
    ? stages.reduce((sum, s) => {
        const p = getTopicProgress(hobbyId, s.conceptId);
        // Use stored totalVideos if available, else fall back to default
        return sum + (p?.totalVideos ?? DEFAULT_VIDEOS_PER_TOPIC);
      }, 0)
    : stages.length * DEFAULT_VIDEOS_PER_TOPIC;

  const progressPct = totalVideosExpected > 0
    ? Math.min(Math.round((totalVideosWatched / totalVideosExpected) * 100), 100)
    : 0;

  const nextTopicIndex = stages.findIndex(
    (s) => !getTopicProgress(hobbyId ?? '', s.conceptId)?.completed,
  );
  const nextTopic = nextTopicIndex >= 0 ? stages[nextTopicIndex] : null;

  const hobby = hobbyId ? getHobbyById(hobbyId) : null;

  const [resetOpen, setResetOpen]       = useState(false);
  const [hobbySheetOpen, setHobbySheetOpen] = useState(false);
  const [generating, setGenerating]     = useState(false);

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
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>HEY THERE 👋</Text>
            <Text style={styles.subGreeting}>Level up your skills today</Text>
          </View>

          {/* Neo-brutalist change-hobby button */}
          <Pressable style={styles.changeBtn} onPress={() => setHobbySheetOpen(true)}>
            {({ pressed }) => (
              <>
                <View style={styles.changeBtnShadow} />
                <View style={[styles.changeBtnFace, pressed && styles.changeBtnFacePressed]}>
                  <Text style={styles.changeBtnEmoji}>{hobby?.emoji ?? '🎯'}</Text>
                  <View style={styles.changeBtnTextBlock}>
                    <Text style={styles.changeBtnLabel}>SWITCH</Text>
                    <Text style={styles.changeBtnSub}>HOBBY</Text>
                  </View>
                </View>
              </>
            )}
          </Pressable>
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
          progressPct={progressPct}
          videosWatched={totalVideosWatched}
          totalVideos={totalVideosExpected}
        />

        {/* ── Continue Learning ── */}
        {nextTopic && (
          <>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>CONTINUE LEARNING</Text>
            </View>
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
              onRoadmap={() => navigation.navigate(ROUTES.MAIN_TABS, { screen: ROUTES.ROADMAP })}
              onLearnGraph={() => navigation.navigate(ROUTES.LEARN_GRAPH, {
                hobbyId,
                topicId: nextTopic.conceptId,
                topicName: nextTopic.title,
                hobbyName: hobby?.name ?? hobbyId,
              })}
              onDetails={() => navigation.navigate(ROUTES.TOPIC_DETAIL, {
                hobbyId,
                topicId: nextTopic.conceptId,
                topicName: nextTopic.title,
                hobbyName: hobby?.name ?? hobbyId,
              })}
              onComics={() => navigation.navigate(ROUTES.COMIC, {
                hobbyId,
                topicId: nextTopic.conceptId,
                topicName: nextTopic.title,
                hobbyName: hobby?.name ?? hobbyId,
              })}
            />
          </>
        )}

        {/* ── Roadmap Preview ── */}
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionDot, { backgroundColor: '#F4B183' }]} />
          <Text style={styles.sectionTitle}>YOUR PATH</Text>
        </View>
        <RoadmapPreview
          stages={stages}
          hobbyId={hobbyId}
          getTopicProgress={getTopicProgress}
          onViewFull={() => navigation.navigate(ROUTES.MAIN_TABS, { screen: ROUTES.ROADMAP })}
          onTopicPress={(stage, index) => navigation.navigate(ROUTES.FEED, {
            hobbyId,
            topicId: stage.conceptId,
            topicName: stage.title,
            stageIndex: index,
          })}
        />

        {/* ── Stats ── */}
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionDot, { backgroundColor: '#DCCCF7' }]} />
          <Text style={styles.sectionTitle}>YOUR STATS</Text>
        </View>
        <StatsGrid
          stats={[
            { value: xp,                                     label: 'Total XP',    icon: STAT_ICONS[0], accent: STAT_ACCENTS[0] },
            { value: streak > 0 ? streak : 0,               label: 'Day Streak',  icon: STAT_ICONS[1], accent: STAT_ACCENTS[1] },
            { value: completedTopics,                        label: 'Topics Done', icon: STAT_ICONS[2], accent: STAT_ACCENTS[2] },
            { value: Math.max(0, stages.length - completedTopics), label: 'Remaining',   icon: STAT_ICONS[3], accent: STAT_ACCENTS[3] },
          ]}
        />

        {/* ── Reset ── */}
        <Pressable
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
          onPress={() => setResetOpen(true)}>
          <Text style={styles.resetBtnText}>RESET PROFILE</Text>
        </Pressable>
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="dashboard" bottomOffset={120} />

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

  // ── Header ──────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingBlock: { flex: 1 },
  greeting: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  subGreeting: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 2,
  },

  // ── Change hobby button ──────────────────────────────────────
  changeBtn: {
    position: 'relative',
    marginLeft: spacing.sm,
  },
  changeBtnShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: colors.border,
    borderRadius: radius.md,
  },
  changeBtnFace: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.yellow,
    borderWidth: 2.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    zIndex: 1,
  },
  changeBtnFacePressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  changeBtnEmoji: { fontSize: 18 },
  changeBtnTextBlock: { alignItems: 'flex-start' },
  changeBtnLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 1,
    lineHeight: 13,
  },
  changeBtnSub: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    lineHeight: 11,
  },

  // ── Section headers ──────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: -spacing.xxs,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 2,
  },

  // ── Reset ────────────────────────────────────────────────────
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
