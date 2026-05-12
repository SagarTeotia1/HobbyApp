import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { DashboardHeroCard } from '../components/DashboardHeroCard/DashboardHeroCard';
import { StatsGrid } from '../components/StatsGrid/StatsGrid';
import { RoadmapProgressCard } from '../components/RoadmapProgressCard/RoadmapProgressCard';
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
import type { AppStackParamList } from '../../../app/navigation/types';
import { ROUTES } from '../../../app/navigation/routes';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.DASHBOARD>;

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
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>DASHBOARD</Text>
        </View>

        <DashboardHeroCard
          emoji={hobby?.emoji ?? '🎯'}
          name={hobby?.name ?? hobbyId}
          category={hobby?.category}
          level={level}
          skillLevel={skillLevel}
          accentColor={hobby?.accentColor}
          onChangeHobby={() => setHobbySheetOpen(true)}
        />

        <Pressable
          style={({ pressed }) => [styles.roadmapBtn, pressed && styles.roadmapBtnPressed]}
          onPress={() => navigation.navigate(ROUTES.ROADMAP)}>
          <Text style={styles.roadmapBtnText}>VIEW FULL ROADMAP</Text>
        </Pressable>

        {nextTopic && (
          <NextUpCard 
            topicName={nextTopic.title} 
            topicIndex={nextTopicIndex} 
            onPress={() => navigation.navigate(ROUTES.FEED, { 
              hobbyId, 
              topicId: nextTopic.conceptId, 
              topicName: nextTopic.title, 
              stageIndex: nextTopicIndex 
            })} 
          />
        )}

        <StatsGrid
          stats={[
            { value: xp, label: 'Total XP' },
            { value: streak > 0 ? `🔥 ${streak}` : '—', label: 'Day Streak' },
            { value: completedTopics, label: 'Topics Done' },
            { value: Math.max(0, stages.length - completedTopics), label: 'Remaining' },
          ]}
        />

        <WeeklyActivityChart />

        <RoadmapProgressCard
          completedTopics={completedTopics}
          totalTopics={stages.length}
        />

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
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  screenTitle: { fontSize: 28, fontWeight: '900', color: colors.text, letterSpacing: 2 },
  roadmapBtn: {
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 5,
  },
  roadmapBtnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
  },
  roadmapBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: 2,
  },
  resetBtn: {
    borderWidth: 3,
    borderColor: colors.danger,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.bgElevated,
    shadowColor: colors.danger,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  resetBtnPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  resetBtnText: { fontSize: 14, fontWeight: '900', color: colors.danger, letterSpacing: 1 },
});
