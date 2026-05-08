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
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.FEED>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.FEED>;

const XP_PER_VIDEO = 25;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const VIDEO_HEIGHT = Math.round(SCREEN_HEIGHT * 0.45);

export function LearningFeedScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { hobbyId, topicId, topicName, stageIndex } = route.params;

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

  const { data: videos = [], isLoading } = useFeedVideos(hobbyId, topicId, stageIndex);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [xpDelta, setXpDelta] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const watchedSet = useRef(new Set<number>());
  const sessionWatched = useRef(0);

  const currentVideo = videos[currentIndex];

  const awardXP = useCallback(() => {
    addXP(XP_PER_VIDEO);
    setXpDelta(XP_PER_VIDEO);
    setSessionXP((prev) => prev + XP_PER_VIDEO);
    markVideoWatched(hobbyId, topicId, videos.length);
    watchedSet.current.add(currentIndex);
    sessionWatched.current += 1;
    setTimeout(() => setXpDelta(0), 1000);
  }, [addXP, markVideoWatched, hobbyId, topicId, videos.length, currentIndex]);

  const finishSession = useCallback(
    (extraXP = 0) => {
      navigation.replace(ROUTES.PROGRESS, {
        hobbyId,
        videosWatched: sessionWatched.current,
        xpEarned: sessionXP + extraXP,
      });
    },
    [navigation, hobbyId, sessionXP],
  );

  const handleGotIt = useCallback(() => {
    awardXP();
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishSession(XP_PER_VIDEO);
    }
  }, [awardXP, currentIndex, videos.length, finishSession]);

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishSession();
    }
  }, [currentIndex, videos.length, finishSession]);

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
          <Text style={styles.emptyText}>No videos for this topic.</Text>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Go Back</Text>
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

          {/* Playlist button */}
          <Pressable
            style={({ pressed }) => [styles.playlistBtn, pressed && styles.playlistBtnPressed]}
            onPress={() => setSheetOpen(true)}>
            <Text style={styles.playlistBtnText}>☰</Text>
          </Pressable>
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
        <View style={styles.videoCounterOverlay}>
          <Text style={styles.videoCounter}>{currentIndex + 1} / {videos.length}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.flashcardScroll}
        contentContainerStyle={styles.flashcardScrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <VideoFlashcard
          videoTitle={currentVideo.title}
          creator={currentVideo.creator}
          keyInsight={currentVideo.keyInsight}
          currentIndex={currentIndex}
          totalVideos={videos.length}
          onGotIt={handleGotIt}
          onNext={handleNext}
          isLast={currentIndex === videos.length - 1}
        />
      </ScrollView>

      <VideoListSheet
        visible={sheetOpen}
        videos={videos}
        currentIndex={currentIndex}
        watchedIndices={watchedSet.current}
        topicName={topicName}
        onSelect={setCurrentIndex}
        onClose={() => setSheetOpen(false)}
      />

      <FloatingAIButton hobbyId={hobbyId} context={topicId} />
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
  playlistBtn: {
    width: 36,
    height: 36,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
  },
  playlistBtnPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  playlistBtnText: { fontSize: 16, fontWeight: '900', color: colors.text },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000',
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  videoCounterOverlay: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  videoCounter: { color: '#fff', fontSize: 11, fontWeight: '800' },
  flashcardScroll: { flex: 1 },
  flashcardScrollContent: { paddingBottom: 100 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  emptyText: { fontSize: 16, fontWeight: '700', color: colors.textMuted },
});
