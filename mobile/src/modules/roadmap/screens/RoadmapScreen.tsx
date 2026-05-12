import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../store/roadmap.store';
import { useRoadmap } from '../hooks/useRoadmap';
import { roadmapService } from '../services/roadmap.service';
import { RoadmapNode } from '../components/RoadmapNode/RoadmapNode';
import { RoadmapHeroCard } from '../components/RoadmapHeroCard/RoadmapHeroCard';
import { LevelUpBanner } from '../components/LevelUpBanner/LevelUpBanner';
import { TopicActionSheet } from '../components/TopicActionSheet';
import { ChangeHobbySheet } from '../components/ChangeHobbySheet';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { CURRICULUM } from '../../../shared/constants/curriculum';
import { colors, spacing } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';
import type { RoadmapStage } from '../types/roadmap.types';
import type { DifficultyLevel } from '../../../shared/types/card.types';

const SKILL_PROGRESSION: Record<DifficultyLevel, DifficultyLevel | null> = {
  beginner: 'intermediate',
  intermediate: 'advanced',
  advanced: null,
};

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.ROADMAP>;

export function RoadmapScreen() {
  const navigation = useNavigation<Nav>();
  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? '';
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const skillLevel = useUserStore((s) => s.skillLevel);
  const dailyTimeMinutes = useUserStore((s) => s.dailyTimeMinutes);
  const setHobby = useUserStore((s) => s.setHobby);
  const setPreferences = useUserStore((s) => s.setPreferences);
  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);

  const { roadmap, loading, refetch, invalidate } = useRoadmap(hobbyId);
  const hobbyMeta = CURRICULUM.find((c) => c.id === hobbyId);
  const stages: RoadmapStage[] = roadmap?.stages ?? [];
  const completedCount = stages.filter((s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true).length;
  const totalCount = stages.length;
  const nextSkillLevel = SKILL_PROGRESSION[skillLevel] ?? null;

  const [pickerOpen, setPickerOpen] = useState(false);
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

  const handleChangeHobby = useCallback(
    async (newHobbyId: string) => {
      if (newHobbyId === hobbyId) { setPickerOpen(false); return; }
      setGenerating(true);
      invalidate();
      try {
        const data = await roadmapService.generateRoadmap(newHobbyId, skillLevel, dailyTimeMinutes);
        setHobby(data.hobbyId ?? newHobbyId);
      } catch (e) {
        console.warn('[RoadmapScreen] Change hobby generation failed:', e);
        setHobby(newHobbyId);
      } finally {
        setGenerating(false);
        setPickerOpen(false);
      }
    },
    [hobbyId, skillLevel, dailyTimeMinutes, setHobby, invalidate],
  );

  const isTopicLocked = (stage: RoadmapStage, index: number): boolean => {
    if (index === 0 || stage.isUnlocked) return false;
    const prev = getTopicProgress(hobbyId, stages[index - 1]?.conceptId ?? '');
    return !prev?.completed;
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <RoadmapHeroCard
        hobbyEmoji={hobbyMeta?.emoji ?? '🎯'}
        hobbyName={hobbyName}
        level={level}
        xp={xp}
        completedCount={completedCount}
        totalCount={totalCount}
        onStats={() => navigation.navigate(ROUTES.DASHBOARD)}
        onChangeHobby={() => setPickerOpen(true)}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Learning Roadmap</Text>

        {levelUpVisible && (
          <LevelUpBanner
            nextSkillLevel={nextSkillLevel}
            skillLevel={skillLevel}
            totalCount={totalCount}
            onLevelUp={handleLevelUp}
            onDismiss={() => setLevelUpVisible(false)}
          />
        )}

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Building your AI roadmap…</Text>
          </View>
        )}

        {!loading && stages.length === 0 && (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No roadmap yet. Complete onboarding to generate one.</Text>
          </View>
        )}

        {!loading && stages.map((stage, index) => (
          <RoadmapNode
            key={stage.conceptId}
            topicName={stage.title}
            topicIndex={index}
            progress={getTopicProgress(hobbyId, stage.conceptId)}
            isFirst={index === 0}
            isLast={index === stages.length - 1}
            isLocked={isTopicLocked(stage, index)}
            onPress={() => navigation.navigate(ROUTES.FEED, { hobbyId, topicId: stage.conceptId, topicName: stage.title, stageIndex: index })}
            onLongPress={() => setActionSheet({ topicId: stage.conceptId, topicName: stage.title })}
            onDetail={() => navigateTo(ROUTES.TOPIC_DETAIL, stage.conceptId, stage.title)}
            onGraph={() => navigateTo(ROUTES.LEARN_GRAPH, stage.conceptId, stage.title)}
          />
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="roadmap" />

      <TopicActionSheet
        visible={actionSheet !== null}
        topicName={actionSheet?.topicName ?? ''}
        onDetail={() => actionSheet && navigateTo(ROUTES.TOPIC_DETAIL, actionSheet.topicId, actionSheet.topicName)}
        onGraph={() => actionSheet && navigateTo(ROUTES.LEARN_GRAPH, actionSheet.topicId, actionSheet.topicName)}
        onClose={() => setActionSheet(null)}
      />

      <ChangeHobbySheet
        visible={pickerOpen}
        currentHobbyId={hobbyId}
        generating={generating}
        onSelect={handleChangeHobby}
        onClose={() => setPickerOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  center: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.md },
  loadingText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  emptyText: { fontSize: 14, fontWeight: '600', color: colors.textMuted, textAlign: 'center' },
  bottomSpacer: { height: 120 },
});
