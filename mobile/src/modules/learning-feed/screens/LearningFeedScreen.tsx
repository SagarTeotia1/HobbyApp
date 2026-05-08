import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { VideoFlashcard } from '../components/VideoFlashcard/VideoFlashcard';
import { FeedXPBar } from '../components/FeedXPBar/FeedXPBar';
import { VideoListSheet } from '../components/VideoListSheet/VideoListSheet';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { useFeedVideos } from '../hooks/useFeedVideos';
import { CURRICULUM } from '../../../shared/constants/curriculum';
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.FEED>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.FEED>;

const XP_PER_VIDEO = 25;
const BOTTOM_BAR_HEIGHT = 72;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const VIDEO_HEIGHT = Math.round(SCREEN_HEIGHT * 0.45);

export function LearningFeedScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { hobbyId, topicId, topicName, stageIndex, accumulatedVideos = 0 } = route.params;

  const addXP = useUserStore((s) => s.addXP);
  const streak = useUserStore((s) => s.streak);
  const markVideoWatched = useRoadmapStore((s) => s.markVideoWatched);
  const getTopicProgress = useRoadmapStore((s) => s.getTopicProgress);

  const { roadmap } = useRoadmap(hobbyId);
  const roadmapStages = roadmap?.stages ?? [];
  const completedTopics = roadmapStages.filter(
    (s) => getTopicProgress(hobbyId, s.conceptId)?.completed === true,
  ).length;
  const totalTopics = roadmapStages.length;

  const hobbyMeta = CURRICULUM.find((c) => c.id === hobbyId);
  const hobbyName = hobbyMeta?.name ?? hobbyId;

  const { data: videos = [], isLoading } = useFeedVideos(hobbyId, topicId, stageIndex);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [xpDelta, setXpDelta] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const watchedSet = useRef(new Set<number>());

  const isLast = currentIndex === videos.length - 1;
  const currentVideo = videos[currentIndex];

  const awardXP = useCallback(() => {
    if (watchedSet.current.has(currentIndex)) return;
    addXP(XP_PER_VIDEO);
    setXpDelta(XP_PER_VIDEO);
    markVideoWatched(hobbyId, topicId, videos.length);
    watchedSet.current.add(currentIndex);
    setTimeout(() => setXpDelta(0), 1000);
  }, [addXP, markVideoWatched, hobbyId, topicId, videos.length, currentIndex]);

  const goNextTopic = useCallback(() => {
    const currentStageIdx = roadmapStages.findIndex((s) => s.conceptId === topicId);
    const nextStage = roadmapStages[currentStageIdx + 1];
    const totalWatched = accumulatedVideos + watchedSet.current.size;
    if (nextStage) {
      navigation.replace(ROUTES.FEED, {
        hobbyId,
        topicId: nextStage.conceptId,
        topicName: nextStage.title,
        stageIndex: currentStageIdx + 1,
        accumulatedVideos: totalWatched,
      });
    } else {
      navigation.navigate(ROUTES.ROADMAP);
    }
  }, [roadmapStages, topicId, hobbyId, navigation, accumulatedVideos]);

  const handleContinue = useCallback(() => {
    awardXP();
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
    } else {
      goNextTopic();
    }
  }, [awardXP, isLast, goNextTopic]);

  const handleBreak = useCallback(() => {
    if (!watchedSet.current.has(currentIndex)) {
      addXP(XP_PER_VIDEO);
      markVideoWatched(hobbyId, topicId, videos.length);
      watchedSet.current.add(currentIndex);
    }
    const totalWatched = accumulatedVideos + watchedSet.current.size;
    navigation.replace(ROUTES.PROGRESS, {
      hobbyId,
      videosWatched: totalWatched,
      xpEarned: totalWatched * XP_PER_VIDEO,
    });
  }, [navigation, hobbyId, currentIndex, addXP, markVideoWatched, topicId, videos.length, accumulatedVideos]);

  const handleDetail = useCallback(() => {
    navigation.navigate(ROUTES.TOPIC_DETAIL, { hobbyId, topicId, topicName, hobbyName });
  }, [navigation, hobbyId, topicId, topicName, hobbyName]);

  const handleGraph = useCallback(() => {
    navigation.navigate(ROUTES.LEARN_GRAPH, { hobbyId, topicId, topicName, hobbyName });
  }, [navigation, hobbyId, topicId, topicName, hobbyName]);

  const bottomBarHeight = BOTTOM_BAR_HEIGHT + insets.bottom;

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loaderText}>Loading playlist...</Text>
      </View>
    );
  }

  if (!currentVideo) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No videos for this topic</Text>
          <Text style={styles.emptyText}>Move on to the next topic.</Text>
          <Pressable
            style={({ pressed }) => [styles.nextTopicBtn, pressed && styles.nextTopicBtnPressed]}
            onPress={goNextTopic}>
            <Text style={styles.nextTopicBtnText}>Next Topic →</Text>
          </Pressable>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.emptyBack}>← Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeTop} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.backBtnPressed]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Back</Text>
          </Pressable>
          <View style={styles.topicPill}>
            <Text style={styles.topicPillText} numberOfLines={1}>{topicName}</Text>
          </View>
        </View>

        <FeedXPBar
          xpDelta={xpDelta}
          streak={streak}
          completedTopics={completedTopics}
          totalTopics={totalTopics}
        />
      </SafeAreaView>

      <View style={[styles.videoContainer, { height: VIDEO_HEIGHT }]}>
        <VideoPlayer
          youtubeId={currentVideo.youtubeId}
          videoUrl={currentVideo.videoUrl}
        />
        <Pressable
          style={({ pressed }) => [styles.playlistOverlay, pressed && styles.playlistOverlayPressed]}
          onPress={() => setSheetOpen(true)}>
          <Text style={styles.playlistOverlayText}>☰ {currentIndex + 1}/{videos.length}</Text>
        </Pressable>
      </View>

      {/* Scrollable flashcard content */}
      <ScrollView
        style={styles.flashcardScroll}
        contentContainerStyle={[styles.flashcardScrollContent, { paddingBottom: bottomBarHeight + 16 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <VideoFlashcard
          videoTitle={currentVideo.title}
          creator={currentVideo.creator}
          keyInsight={currentVideo.keyInsight}
          onDetail={handleDetail}
          onGraph={handleGraph}
        />
      </ScrollView>

      {/* Sticky bottom nav bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <Pressable
          style={({ pressed }) => [styles.breakBtn, pressed && styles.breakBtnPressed]}
          onPress={handleBreak}>
          <Text style={styles.breakBtnText}>☕ Need Break</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.continueBtn, pressed && styles.continueBtnPressed]}
          onPress={handleContinue}>
          <Text style={styles.continueBtnText}>
            {isLast ? 'Next Topic →' : '▶ Next Video'}
          </Text>
        </Pressable>
      </View>

      <FloatingAIButton hobbyId={hobbyId} context={topicId} bottomOffset={bottomBarHeight} />

      <VideoListSheet
        visible={sheetOpen}
        videos={videos}
        currentIndex={currentIndex}
        watchedIndices={watchedSet.current}
        topicName={topicName}
        onSelect={setCurrentIndex}
        onClose={() => setSheetOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  loader: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loaderText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  safeTop: { backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
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
  topicPill: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary,
  },
  topicPillText: { fontSize: 12, fontWeight: '800', color: colors.textInverse },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000',
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  playlistOverlay: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  playlistOverlayPressed: { opacity: 0.7 },
  playlistOverlayText: { color: '#fff', fontSize: 12, fontWeight: '900' },
  flashcardScroll: { flex: 1 },
  flashcardScrollContent: { },

  // ── Sticky bottom bar ─────────────────────────────────────────────
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.bg,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  breakBtn: {
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
  },
  breakBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  breakBtnText: { fontSize: 13, fontWeight: '800', color: colors.textMuted },
  continueBtn: {
    flex: 2,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  continueBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: { fontSize: 13, fontWeight: '900', color: colors.textInverse },

  // ── Empty state ───────────────────────────────────────────────────
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, gap: spacing.md },
  emptyTitle: { fontSize: 20, fontWeight: '900', color: colors.text },
  emptyText: { fontSize: 14, fontWeight: '600', color: colors.textMuted, textAlign: 'center' },
  nextTopicBtn: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 3,
  },
  nextTopicBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  nextTopicBtnText: { fontSize: 15, fontWeight: '900', color: colors.textInverse },
  emptyBack: { fontSize: 13, fontWeight: '700', color: colors.textMuted },
});
