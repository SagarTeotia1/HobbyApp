import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../store/roadmap.store';
import { FLOATING_TAB_HEIGHT } from '../../../shared/components/ui/FloatingTabBar/FloatingTabBar';
import { useRoadmap } from '../hooks/useRoadmap';
import { roadmapService } from '../services/roadmap.service';
import { RoadmapNode } from '../components/RoadmapNode/RoadmapNode';
import { RoadmapHeroCard } from '../components/RoadmapHeroCard/RoadmapHeroCard';
import { LevelUpBanner } from '../components/LevelUpBanner/LevelUpBanner';
import { TopicActionSheet } from '../components/TopicActionSheet';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { CURRICULUM, getTopicById } from '../../../shared/constants/curriculum';
import { colors, spacing } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList, MainTabParamList } from '../../../app/navigation/types';
import type { RoadmapStage } from '../types/roadmap.types';
import type { DifficultyLevel } from '../../../shared/types/card.types';

const SKILL_PROGRESSION: Record<DifficultyLevel, DifficultyLevel | null> = {
  beginner: 'intermediate',
  intermediate: 'advanced',
  advanced: null,
};

type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof ROUTES.ROADMAP>,
  NativeStackNavigationProp<AppStackParamList>
>;

export function RoadmapScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? '';
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const skillLevel = useUserStore((s) => s.skillLevel);
  const dailyTimeMinutes = useUserStore((s) => s.dailyTimeMinutes);
  const setPreferences = useUserStore((s) => s.setPreferences);
  // Subscribe to progress data directly so component re-renders on every video watch
  const hobbyProgress  = useRoadmapStore((s) => s.progress[hobbyId]);
  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);

  const { roadmap, loading, refetch, invalidate } = useRoadmap(hobbyId);
  const hobbyMeta = CURRICULUM.find((c) => c.id === hobbyId);
  const stages: RoadmapStage[] = roadmap?.stages ?? [];
  const totalCount = stages.length;

  // Topic-level count
  const completedCount = stages.filter(
    (s) => hobbyProgress?.topicsProgress[s.conceptId]?.completed === true,
  ).length;

  // Video-level progress (updates on every watched video)
  const DEFAULT_VIDEOS_PER_TOPIC = 5;
  const totalVideosWatched = stages.reduce((sum, s) => {
    return sum + (hobbyProgress?.topicsProgress[s.conceptId]?.videosWatched ?? 0);
  }, 0);
  const totalVideosExpected = stages.reduce((sum, s) => {
    return sum + (hobbyProgress?.topicsProgress[s.conceptId]?.totalVideos ?? DEFAULT_VIDEOS_PER_TOPIC);
  }, 0) || (stages.length * DEFAULT_VIDEOS_PER_TOPIC);
  const videoProgressPct = totalVideosExpected > 0
    ? Math.min(Math.round((totalVideosWatched / totalVideosExpected) * 100), 100)
    : 0;
  const nextSkillLevel = SKILL_PROGRESSION[skillLevel] ?? null;

  const [generating, setGenerating] = useState(false);
  const [actionSheet, setActionSheet] = useState<{ topicId: string; topicName: string } | null>(null);
  const [levelUpVisible, setLevelUpVisible] = useState(false);

  const hobbyName = hobbyMeta?.name ?? hobbyId;

  useEffect(() => {
    if (!loading && totalCount > 0 && completedCount === totalCount) {
      setLevelUpVisible(true);
    } else if (completedCount < totalCount) {
      setLevelUpVisible(false);
    }
  }, [completedCount, totalCount, loading]);

  const navigateTo = useCallback(
    (route: typeof ROUTES.TOPIC_DETAIL | typeof ROUTES.LEARN_GRAPH, topicId: string, topicName: string) => {
      setActionSheet(null);
      navigation.navigate(route, { hobbyId, topicId, topicName, hobbyName });
    },
    [navigation, hobbyId, hobbyName],
  );

  const handleLevelUp = useCallback(async () => {
    if (!nextSkillLevel) return;
    setLevelUpVisible(false);
    setGenerating(true);
    setPreferences(dailyTimeMinutes, nextSkillLevel);
    invalidate();
    try {
      await roadmapService.generateRoadmap(hobbyId, nextSkillLevel, dailyTimeMinutes);
    } catch (e) {
      console.warn('[RoadmapScreen] Level-up generation failed:', e);
    } finally {
      setGenerating(false);
      refetch();
    }
  }, [nextSkillLevel, hobbyId, dailyTimeMinutes, setPreferences, invalidate, refetch]);

  const isTopicLocked = (stage: RoadmapStage, index: number): boolean => {
    if (index === 0 || stage.isUnlocked) return false;
    const prev = getTopicProgress(hobbyId, stages[index - 1]?.conceptId ?? '');
    return !prev?.completed;
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <RoadmapHeroCard
        hobbyEmoji={hobbyMeta?.emoji ?? '🎯'}
        hobbyName={hobbyName}
        level={level}
        xp={xp}
        skillLevel={skillLevel}
        completedCount={completedCount}
        totalCount={totalCount}
        videosWatched={totalVideosWatched}
        totalVideos={totalVideosExpected}
        videoProgressPct={videoProgressPct}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>YOUR STAGES</Text>
          <View style={styles.sectionLine} />
        </View>

        {levelUpVisible && (
          <LevelUpBanner
            nextSkillLevel={nextSkillLevel}
            skillLevel={skillLevel}
            totalCount={totalCount}
            onLevelUp={handleLevelUp}
            onDismiss={() => setLevelUpVisible(false)}
          />
        )}

        {(loading || generating) && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingTitle}>
              {generating ? 'LEVELLING UP…' : 'BUILDING ROADMAP…'}
            </Text>
            <Text style={styles.loadingText}>
              {generating ? 'Generating your next-level path' : 'AI is crafting your personal path'}
            </Text>
          </View>
        )}

        {!loading && !generating && stages.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🗺️</Text>
            <Text style={styles.emptyTitle}>NO ROADMAP YET</Text>
            <Text style={styles.emptyText}>Complete onboarding to generate your personalised path.</Text>
          </View>
        )}

        {!loading && stages.map((stage, index) => (
          <RoadmapNode
            key={stage.conceptId}
            topicName={stage.title}
            topicIndex={index}
            progress={getTopicProgress(hobbyId, stage.conceptId)}
            fallbackTotalVideos={getTopicById(hobbyId, stage.conceptId)?.videos?.length ?? 5}
            isFirst={index === 0}
            isLast={index === stages.length - 1}
            isLocked={isTopicLocked(stage, index)}
            onPress={() => navigation.navigate(ROUTES.FEED, { hobbyId, topicId: stage.conceptId, topicName: stage.title, stageIndex: index })}
            onLongPress={() => setActionSheet({ topicId: stage.conceptId, topicName: stage.title })}
            onDetail={() => navigateTo(ROUTES.TOPIC_DETAIL, stage.conceptId, stage.title)}
            onGraph={() => navigateTo(ROUTES.LEARN_GRAPH, stage.conceptId, stage.title)}
          />
        ))}

        <View style={{ height: spacing.xxl }} />
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="roadmap" bottomOffset={FLOATING_TAB_HEIGHT + insets.bottom} />

      <TopicActionSheet
        visible={actionSheet !== null}
        topicName={actionSheet?.topicName ?? ''}
        onDetail={() => actionSheet && navigateTo(ROUTES.TOPIC_DETAIL, actionSheet.topicId, actionSheet.topicName)}
        onGraph={() => actionSheet && navigateTo(ROUTES.LEARN_GRAPH, actionSheet.topicId, actionSheet.topicName)}
        onClose={() => setActionSheet(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
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
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.borderLight,
    borderRadius: 1,
  },

  // Loading card
  loadingCard: {
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.bgElevated,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
    marginBottom: spacing.md,
  },
  loadingTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textAlign: 'center',
  },

  // Empty card
  emptyCard: {
    borderWidth: 3,
    borderColor: colors.borderLight,
    borderRadius: 20,
    borderStyle: 'dashed',
    backgroundColor: colors.surface,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textMuted,
    letterSpacing: 2,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDim,
    textAlign: 'center',
    lineHeight: 18,
  },
});
