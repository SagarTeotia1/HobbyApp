import React, { useCallback, useState } from 'react';
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
import { useRoadmap } from '../hooks/useRoadmap';
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
  const getCompletedCount = useRoadmapStore((s) => s.getCompletedTopicCount);

  const { roadmap, loading: roadmapLoading } = useRoadmap(hobbyId);

  const hobbyMeta = CURRICULUM.find((c) => c.id === hobbyId);

  const stages: RoadmapStage[] = roadmap?.stages ?? [];
  const completedCount = getCompletedCount(hobbyId);
  const totalCount = stages.length || 1;

  const [pickerOpen, setPickerOpen] = useState(false);
  const [generatingHobby, setGeneratingHobby] = useState(false);
  const [actionSheet, setActionSheet] = useState<{ topicId: string; topicName: string } | null>(null);

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

  const handleGoDetail = useCallback(() => {
    if (!actionSheet) return;
    setActionSheet(null);
    navigation.navigate(ROUTES.TOPIC_DETAIL, {
      hobbyId,
      topicId:   actionSheet.topicId,
      topicName: actionSheet.topicName,
      hobbyName: hobbyMeta?.name ?? hobbyId,
    });
  }, [navigation, hobbyId, hobbyMeta, actionSheet]);

  const handleGoGraph = useCallback(() => {
    if (!actionSheet) return;
    setActionSheet(null);
    navigation.navigate(ROUTES.LEARN_GRAPH, {
      hobbyId,
      topicId:   actionSheet.topicId,
      topicName: actionSheet.topicName,
      hobbyName: hobbyMeta?.name ?? hobbyId,
    });
  }, [navigation, hobbyId, hobbyMeta, actionSheet]);

  const handleDashboard = useCallback(() => {
    navigation.navigate(ROUTES.DASHBOARD);
  }, [navigation]);

  const handleChangeHobby = useCallback(
    async (newHobbyId: string) => {
      if (newHobbyId === hobbyId) {
        setPickerOpen(false);
        return;
      }
      setGeneratingHobby(true);
      try {
        await roadmapService.generateRoadmap(newHobbyId, skillLevel, dailyTimeMinutes);
        setHobby(newHobbyId);
      } catch {
        // Server failed — still switch hobby; useRoadmap will show empty state
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

  const progressPct = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Hero header */}
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <View style={styles.emojiWrap}>
            <Text style={styles.hobbyEmoji}>{hobbyMeta?.emoji ?? '🎯'}</Text>
          </View>
          <View style={styles.heroText}>
            <Text style={styles.hobbyName} numberOfLines={1}>
              {hobbyMeta?.name ?? hobbyId}
            </Text>
            <Text style={styles.levelBadge}>Lv {level} · {xp} XP</Text>
          </View>
        </View>

        {/* Stats button — filled teal */}
        <Pressable
          style={({ pressed }) => [styles.statsBtn, pressed && styles.statsBtnPressed]}
          onPress={handleDashboard}>
          <Text style={styles.statsBtnText}>📊 Stats</Text>
        </Pressable>
      </View>

      {/* Change Hobby pill — yellow, prominent */}
      <Pressable
        style={({ pressed }) => [styles.changeHobbyPill, pressed && styles.changeHobbyPillPressed]}
        onPress={() => setPickerOpen(true)}>
        <Text style={styles.changeHobbyText}>🔄 Change Hobby</Text>
      </Pressable>

      {/* Progress strip */}
      <View style={styles.progressStrip}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressLabel}>{completedCount}/{totalCount} topics</Text>
          <Text style={styles.progressPct}>{Math.round(progressPct)}%</Text>
        </View>
        <View style={styles.progressBarOuter}>
          <View style={[styles.progressBarInner, { width: `${progressPct}%` }]} />
        </View>
      </View>

      {/* Roadmap list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionTitle}>Your Learning Roadmap</Text>

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

  // ── Hero ──────────────────────────────────────────────────────────
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  emojiWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hobbyEmoji: { fontSize: 26 },
  heroText: { flex: 1 },
  hobbyName: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: -0.3,
  },
  levelBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    letterSpacing: 0.3,
  },

  // ── Stats button ──────────────────────────────────────────────────
  statsBtn: {
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
  statsBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  statsBtnText: { fontWeight: '900', fontSize: 13, color: colors.text },

  // ── Change Hobby pill ──────────────────────────────────────────────
  changeHobbyPill: {
    alignSelf: 'center',
    marginTop: spacing.md,
    backgroundColor: colors.yellow,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  changeHobbyPillPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  changeHobbyText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 0.2,
  },

  // ── Progress strip ────────────────────────────────────────────────
  progressStrip: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  progressPct: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  progressBarOuter: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: colors.primary,
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
});
