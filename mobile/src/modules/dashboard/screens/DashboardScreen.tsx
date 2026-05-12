import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { DashboardHeroCard } from '../components/DashboardHeroCard/DashboardHeroCard';
import { StatsGrid } from '../components/StatsGrid/StatsGrid';
import { RoadmapProgressCard } from '../components/RoadmapProgressCard/RoadmapProgressCard';
import { ResetConfirmModal } from '../components/ResetConfirmModal/ResetConfirmModal';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { getHobbyById } from '../../../shared/constants/curriculum';
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
  const resetUser = useUserStore((s) => s.reset);
  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);
  const resetRoadmap = useRoadmapStore((s) => s.reset);

  const { roadmap } = useRoadmap(hobbyId ?? '');
  const stages = roadmap?.stages ?? [];
  const completedTopics = hobbyId
    ? stages.filter((s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true).length
    : 0;
  const hobby = hobbyId ? getHobbyById(hobbyId) : null;
  const [resetOpen, setResetOpen] = useState(false);

  const handleConfirmReset = useCallback(() => {
    resetRoadmap();
    resetUser();
    setResetOpen(false);
  }, [resetRoadmap, resetUser]);

  if (!hobbyId) return null;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
            onPress={() => navigation.navigate(ROUTES.ROADMAP)}>
            <Text style={styles.backBtnText}>← Roadmap</Text>
          </Pressable>
          <Text style={styles.screenTitle}>Stats</Text>
        </View>

        <DashboardHeroCard
          emoji={hobby?.emoji ?? '🎯'}
          name={hobby?.name ?? hobbyId}
          category={hobby?.category}
          level={level}
          skillLevel={skillLevel}
          accentColor={hobby?.accentColor}
        />

        <StatsGrid
          stats={[
            { value: xp, label: 'Total XP' },
            { value: streak > 0 ? `🔥 ${streak}` : '—', label: 'Day Streak' },
            { value: completedTopics, label: 'Topics Done' },
            { value: Math.max(0, stages.length - completedTopics), label: 'Remaining' },
          ]}
        />

        <RoadmapProgressCard
          completedTopics={completedTopics}
          totalTopics={stages.length}
        />

        <Pressable
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
          onPress={() => setResetOpen(true)}>
          <Text style={styles.resetBtnText}>Reset Profile</Text>
        </Pressable>
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="dashboard" />

      <ResetConfirmModal
        visible={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.sm },
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
});
