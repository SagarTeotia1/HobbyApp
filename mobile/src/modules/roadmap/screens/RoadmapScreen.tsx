import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../store/roadmap.store';
import { useRoadmap, invalidateRoadmapCache } from '../hooks/useRoadmap';
import { roadmapService } from '../services/roadmap.service';
import { RoadmapNode } from '../components/RoadmapNode/RoadmapNode';
import { TopicActionSheet } from '../components/TopicActionSheet';
import { ChangeHobbySheet } from '../components/ChangeHobbySheet';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { CURRICULUM } from '../../../shared/constants/curriculum';
import { colors, spacing, radius } from '../../../app/theme';
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
  const hobbyId = useUserStore((s) => s.currentHobbyId) ?? 'chess';
  const xp = useUserStore((s) => s.xp);
  const level = useUserStore((s) => s.level);
  const skillLevel = useUserStore((s) => s.skillLevel);
  const dailyTimeMinutes = useUserStore((s) => s.dailyTimeMinutes);
  const setHobby = useUserStore((s) => s.setHobby);

  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);

  const { roadmap, loading: roadmapLoading, refetch: refetchRoadmap } = useRoadmap(hobbyId);

  const hobbyMeta = CURRICULUM.find((c) => c.id === hobbyId);

  const stages: RoadmapStage[] = roadmap?.stages ?? [];
  const completedCount = stages.filter(
    (s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true,
  ).length;
  const totalCount = stages.length;

  const setPreferences = useUserStore((s) => s.setPreferences);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [generatingHobby, setGeneratingHobby] = useState(false);
  const [actionSheet, setActionSheet] = useState<{ topicId: string; topicName: string } | null>(null);
  const [levelUpVisible, setLevelUpVisible] = useState(false);

  const nextSkillLevel = SKILL_PROGRESSION[skillLevel] ?? null;

  useEffect(() => {
    if (!roadmapLoading && totalCount > 0 && completedCount === totalCount) {
      setLevelUpVisible(true);
    } else if (completedCount < totalCount) {
      setLevelUpVisible(false);
    }
  }, [completedCount, totalCount, roadmapLoading]);

  const handleTopicPress = useCallback(
    (topicId: string, topicName: string, stageIndex: number) => {
      navigation.navigate(ROUTES.FEED, { hobbyId, topicId, topicName, stageIndex });
    },
    [navigation, hobbyId],
  );

  const handleTopicLongPress = useCallback(
    (topicId: string, topicName: string) => {
      setActionSheet({ topicId, topicName });
    },
    [],
  );

  const navigateToDetail = useCallback(
    (topicId: string, topicName: string) => {
      setActionSheet(null);
      navigation.navigate(ROUTES.TOPIC_DETAIL, {
        hobbyId, topicId, topicName, hobbyName: hobbyMeta?.name ?? hobbyId,
      });
    },
    [navigation, hobbyId, hobbyMeta],
  );

  const navigateToGraph = useCallback(
    (topicId: string, topicName: string) => {
      setActionSheet(null);
      navigation.navigate(ROUTES.LEARN_GRAPH, {
        hobbyId, topicId, topicName, hobbyName: hobbyMeta?.name ?? hobbyId,
      });
    },
    [navigation, hobbyId, hobbyMeta],
  );

  // kept for TopicActionSheet (long-press sheet still uses these)
  const handleGoDetail = useCallback(() => {
    if (!actionSheet) return;
    navigateToDetail(actionSheet.topicId, actionSheet.topicName);
  }, [actionSheet, navigateToDetail]);

  const handleGoGraph = useCallback(() => {
    if (!actionSheet) return;
    navigateToGraph(actionSheet.topicId, actionSheet.topicName);
  }, [actionSheet, navigateToGraph]);

  const handleDashboard = useCallback(() => {
    navigation.navigate(ROUTES.DASHBOARD);
  }, [navigation]);

  const handleLevelUp = useCallback(async () => {
    if (!nextSkillLevel) return;
    setLevelUpVisible(false);
    setGeneratingHobby(true);
    setPreferences(dailyTimeMinutes, nextSkillLevel);
    invalidateRoadmapCache(hobbyId);
    try {
      await roadmapService.generateRoadmap(hobbyId, nextSkillLevel, dailyTimeMinutes);
    } catch {
      // generation failed — refetch will show empty state
    } finally {
      setGeneratingHobby(false);
      refetchRoadmap();
    }
  }, [nextSkillLevel, hobbyId, dailyTimeMinutes, setPreferences, refetchRoadmap]);

  const handleChangeHobby = useCallback(
    async (newHobbyId: string) => {
      if (newHobbyId === hobbyId) {
        setPickerOpen(false);
        return;
      }
      setGeneratingHobby(true);
      invalidateRoadmapCache(newHobbyId);
      try {
        const data = await roadmapService.generateRoadmap(newHobbyId, skillLevel, dailyTimeMinutes);
        // use server-normalized hobbyId (server may rename "web-dev" → "web_development")
        setHobby(data.hobbyId ?? newHobbyId);
      } catch {
        setHobby(newHobbyId);
      } finally {
        setGeneratingHobby(false);
        setPickerOpen(false);
      }
    },
    [hobbyId, skillLevel, dailyTimeMinutes, setHobby],
  );

  const isTopicLocked = (stage: RoadmapStage, index: number): boolean => {
    if (index === 0) return false;
    if (!stage.isUnlocked) {
      const prevStage = stages[index - 1];
      if (!prevStage) return true;
      const prev = getTopicProgress(hobbyId, prevStage.conceptId);
      return !prev?.completed;
    }
    return false;
  };

  const progressPct = totalCount > 0 ? Math.min((completedCount / totalCount) * 100, 100) : 0;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Hero card — all top info + progress + actions */}
      <View style={styles.hero}>
        {/* Row 1: emoji + name/xp + stats button */}
        <View style={styles.heroTop}>
          <View style={styles.emojiWrap}>
            <Text style={styles.hobbyEmoji}>{hobbyMeta?.emoji ?? '🎯'}</Text>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.hobbyName} numberOfLines={1}>
              {hobbyMeta?.name ?? hobbyId}
            </Text>
            <Text style={styles.levelBadge}>Lv {level} · {xp} XP</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.statsBtn, pressed && styles.heroBtnPressed]}
            onPress={handleDashboard}>
            <Text style={styles.statsBtnIcon}>📊</Text>
            <Text style={styles.statsBtnLabel}>Stats</Text>
          </Pressable>
        </View>

        {/* Row 2: change hobby */}
        <Pressable
          style={({ pressed }) => [styles.changeHobbyBtn, pressed && styles.changeHobbyBtnPressed]}
          onPress={() => setPickerOpen(true)}>
          <Text style={styles.changeHobbyBtnText}>🔄  Change Hobby</Text>
          <Text style={styles.changeHobbyArrow}>›</Text>
        </Pressable>

        {/* Row 3: progress bar */}
        <View style={styles.heroProgress}>
          <View style={styles.heroProgressMeta}>
            <Text style={styles.heroProgressLabel}>{completedCount}/{totalCount} topics</Text>
            <Text style={styles.heroProgressPct}>{Math.round(progressPct)}%</Text>
          </View>
          <View style={styles.heroBarOuter}>
            <View style={[styles.heroBarInner, { width: `${progressPct}%` }]} />
          </View>
        </View>
      </View>

      {/* Roadmap list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionTitle}>Your Learning Roadmap</Text>

        {levelUpVisible && nextSkillLevel && (
          <View style={styles.levelUpCard}>
            <Text style={styles.levelUpEmoji}>🏆</Text>
            <Text style={styles.levelUpTitle}>Roadmap Complete!</Text>
            <Text style={styles.levelUpBody}>
              You've mastered all {totalCount} topics at {skillLevel} level.{'\n'}
              Ready to unlock the <Text style={styles.levelUpHighlight}>{nextSkillLevel}</Text> roadmap?
            </Text>
            <Pressable
              style={({ pressed }) => [styles.levelUpBtn, pressed && styles.levelUpBtnPressed]}
              onPress={handleLevelUp}>
              <Text style={styles.levelUpBtnText}>
                Generate {nextSkillLevel.charAt(0).toUpperCase() + nextSkillLevel.slice(1)} Roadmap →
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.levelUpDismissBtn, pressed && styles.levelUpDismissBtnPressed]}
              onPress={() => setLevelUpVisible(false)}>
              <Text style={styles.levelUpDismissText}>Maybe later</Text>
            </Pressable>
          </View>
        )}

        {levelUpVisible && !nextSkillLevel && (
          <View style={styles.levelUpCard}>
            <Text style={styles.levelUpEmoji}>🎓</Text>
            <Text style={styles.levelUpTitle}>Mastery Achieved!</Text>
            <Text style={styles.levelUpBody}>
              You've completed all levels for this hobby. You're a master!
            </Text>
            <Pressable
              style={({ pressed }) => [styles.levelUpDismissBtn, styles.levelUpDismissBtnSolid, pressed && styles.levelUpDismissBtnPressed]}
              onPress={() => setLevelUpVisible(false)}>
              <Text style={styles.levelUpDismissTextSolid}>🎉 Awesome, Dismiss</Text>
            </Pressable>
          </View>
        )}

        {roadmapLoading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Building your AI roadmap…</Text>
          </View>
        )}

        {!roadmapLoading && stages.length === 0 && (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No roadmap yet. Complete onboarding to generate one.</Text>
          </View>
        )}

        {!roadmapLoading && stages.map((stage, index) => {
          const locked = isTopicLocked(stage, index);
          const progress = getTopicProgress(hobbyId, stage.conceptId);
          return (
            <RoadmapNode
              key={stage.conceptId}
              topicName={stage.title}
              topicIndex={index}
              progress={progress}
              isFirst={index === 0}
              isLast={index === stages.length - 1}
              isLocked={locked}
              onPress={() => handleTopicPress(stage.conceptId, stage.title, index)}
              onLongPress={() => handleTopicLongPress(stage.conceptId, stage.title)}
              onDetail={() => navigateToDetail(stage.conceptId, stage.title)}
              onGraph={() => navigateToGraph(stage.conceptId, stage.title)}
            />
          );
        })}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <FloatingAIButton hobbyId={hobbyId} context="roadmap" />

      <TopicActionSheet
        visible={actionSheet !== null}
        topicName={actionSheet?.topicName ?? ''}
        onDetail={handleGoDetail}
        onGraph={handleGoGraph}
        onClose={() => setActionSheet(null)}
      />

      <ChangeHobbySheet
        visible={pickerOpen}
        currentHobbyId={hobbyId}
        generating={generatingHobby}
        onSelect={handleChangeHobby}
        onClose={() => setPickerOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // ── Hero card ─────────────────────────────────────────────────────
  hero: {
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
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
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
  hobbyEmoji: { fontSize: 24 },
  heroText: { flex: 1 },
  hobbyName: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: -0.3,
  },
  levelBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.65)',
    marginTop: 1,
  },
  statsBtn: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    minWidth: 52,
  },
  statsBtnIcon: { fontSize: 14 },
  statsBtnLabel: { fontSize: 9, fontWeight: '800', color: 'rgba(255,255,255,0.9)', marginTop: 1, letterSpacing: 0.3 },

  heroBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },

  changeHobbyBtn: {
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
  changeHobbyBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  changeHobbyBtnText: { fontSize: 13, fontWeight: '900', color: colors.text },
  changeHobbyArrow: { fontSize: 18, fontWeight: '900', color: colors.text },

  // ── Hero progress bar ─────────────────────────────────────────────
  heroProgress: { gap: 5 },
  heroProgressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroProgressLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heroProgressPct: {
    fontSize: 10,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.9)',
  },
  heroBarOuter: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  heroBarInner: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: radius.pill,
  },

  // ── Scroll ────────────────────────────────────────────────────────
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

  // ── Loading / empty ───────────────────────────────────────────────
  loadingWrap: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.md },
  loadingText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  emptyWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyText: { fontSize: 14, fontWeight: '600', color: colors.textMuted, textAlign: 'center' },

  bottomSpacer: { height: 120 },

  // ── Level-up banner ───────────────────────────────────────────────
  levelUpCard: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
    gap: spacing.sm,
  },
  levelUpEmoji: { fontSize: 40 },
  levelUpTitle: { fontSize: 20, fontWeight: '900', color: colors.text, textAlign: 'center' },
  levelUpBody: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.85,
  },
  levelUpHighlight: { fontWeight: '900', color: colors.primary },
  levelUpBtn: {
    marginTop: spacing.xs,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
    width: '100%',
    alignItems: 'center',
  },
  levelUpBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  levelUpBtnText: { fontSize: 14, fontWeight: '900', color: colors.textInverse },
  levelUpDismissBtn: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  levelUpDismissBtnSolid: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelUpDismissBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  levelUpDismissText: { fontSize: 13, fontWeight: '800', color: colors.text },
  levelUpDismissTextSolid: { fontSize: 13, fontWeight: '800', color: colors.textInverse },
});
