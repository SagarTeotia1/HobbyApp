import React, { useState } from 'react';
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
import { FeedHeader } from '../components/FeedHeader/FeedHeader';
import { FeedProgressStrip } from '../components/FeedProgressStrip/FeedProgressStrip';
import { FeedBottomBar } from '../components/FeedBottomBar/FeedBottomBar';
import { ComicTeaser } from '../components/ComicTeaser/ComicTeaser';
import { VideoListSheet } from '../components/VideoListSheet/VideoListSheet';
import { FloatingAIButton } from '../../../shared/components/ai/FloatingAIButton/FloatingAIButton';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmap } from '../../roadmap/hooks/useRoadmap';
import { useFeedVideos } from '../hooks/useFeedVideos';
import { useFeedSession } from '../hooks/useFeedSession';
import { CURRICULUM } from '../../../shared/constants/curriculum';
import { colors, spacing, radius } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.FEED>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.FEED>;

const BOTTOM_BAR_HEIGHT = 72;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIDEO_HEIGHT = Math.round(SCREEN_WIDTH * (9 / 16));

export function LearningFeedScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();
  const { hobbyId, topicId, topicName, stageIndex, accumulatedVideos = 0 } = route.params;

  const skillLevel = useUserStore((s) => s.skillLevel);

  const { roadmap } = useRoadmap(hobbyId);
  const roadmapStages = roadmap?.stages ?? [];

  const hobbyMeta = CURRICULUM.find((c) => c.id === hobbyId);
  const hobbyName = hobbyMeta?.name ?? hobbyId;

  const { data: videos = [], isLoading } = useFeedVideos(
    hobbyId,
    topicId,
    stageIndex,
    hobbyName,
    topicName,
    skillLevel,
  );

  const [sheetWatchedIndices, setSheetWatchedIndices] = useState<Set<number>>(new Set());

  const {
    currentIndex,
    setCurrentIndex,
    sheetOpen,
    setSheetOpen,
    isLast,
    watchedSet,
    handleContinue,
    handleBreak,
    goNextTopic,
  } = useFeedSession({ hobbyId, topicId, topicName, stageIndex, accumulatedVideos, videos, roadmapStages });

  const currentVideo = videos[currentIndex];
  const bottomBarHeight = BOTTOM_BAR_HEIGHT + insets.bottom;

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color={colors.yellow} />
          <Text style={styles.loaderTitle}>LOADING PLAYLIST</Text>
          <Text style={styles.loaderText}>Fetching your videos…</Text>
        </View>
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
        <FeedHeader topicName={topicName} onBack={() => navigation.goBack()} />
      </SafeAreaView>

      <View style={[styles.videoContainer, { height: VIDEO_HEIGHT }]}>
        <VideoPlayer
          youtubeId={currentVideo.youtubeId}
          videoUrl={currentVideo.videoUrl}
        />
      </View>

      <FeedProgressStrip
        total={videos.length}
        currentIndex={currentIndex}
        onOpenPlaylist={() => {
          setSheetWatchedIndices(new Set(watchedSet.current));
          setSheetOpen(true);
        }}
      />

      {/* Cream zone: flashcard content */}
      <ScrollView
        style={styles.flashcardScroll}
        contentContainerStyle={{ paddingBottom: bottomBarHeight + 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <VideoFlashcard
          videoTitle={currentVideo.title}
          creator={currentVideo.creator}
          keyInsight={currentVideo.keyInsight}
          onDetail={() => navigation.navigate(ROUTES.TOPIC_DETAIL, { hobbyId, topicId, topicName, hobbyName })}
          onGraph={() => navigation.navigate(ROUTES.LEARN_GRAPH, { hobbyId, topicId, topicName, hobbyName })}
        />
        <ComicTeaser
          hobbyName={hobbyName}
          onPress={() => navigation.navigate(ROUTES.COMIC, { hobbyId, topicId, topicName, hobbyName })}
        />
      </ScrollView>

      <FeedBottomBar
        isLast={isLast}
        paddingBottom={insets.bottom + spacing.sm}
        onBreak={handleBreak}
        onContinue={handleContinue}
      />

      <FloatingAIButton hobbyId={hobbyId} context={topicId} bottomOffset={bottomBarHeight} />

      <VideoListSheet
        visible={sheetOpen}
        videos={videos}
        currentIndex={currentIndex}
        watchedIndices={sheetWatchedIndices}
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
    backgroundColor: colors.videoBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  loaderCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
  },
  loaderTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textInverse,
    letterSpacing: 2,
  },
  loaderText: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.5)' },
  safeTop: { backgroundColor: colors.bg },
  videoContainer: { width: '100%', backgroundColor: '#000' },
  flashcardScroll: { flex: 1, backgroundColor: colors.bg },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
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
