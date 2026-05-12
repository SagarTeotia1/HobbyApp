import { useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUserStore } from '../../../app/store/rootStore';
import { useRoadmapStore } from '../../roadmap/store/roadmap.store';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';
import type { FeedVideo } from '../types/feed.types';
import type { RoadmapStage } from '../../roadmap/types/roadmap.types';

const XP_PER_VIDEO = 25;
const XP_POPUP_CLEAR_MS = 1000;

interface FeedSessionParams {
  hobbyId: string;
  topicId: string;
  topicName: string;
  stageIndex: number;
  accumulatedVideos: number;
  videos: FeedVideo[];
  roadmapStages: RoadmapStage[];
}

export function useFeedSession({
  hobbyId,
  topicId,
  topicName,
  stageIndex,
  accumulatedVideos,
  videos,
  roadmapStages,
}: FeedSessionParams) {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const addXP = useUserStore((s) => s.addXP);
  const markVideoWatched = useRoadmapStore((s) => s.markVideoWatched);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [xpDelta, setXpDelta] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const watchedSet = useRef(new Set<number>());

  const isLast = currentIndex === videos.length - 1;

  const goNextTopic = useCallback(() => {
    const stageIdx = roadmapStages.findIndex((s) => s.conceptId === topicId);
    const nextStage = roadmapStages[stageIdx + 1];
    const totalWatched = accumulatedVideos + watchedSet.current.size;
    if (nextStage) {
      navigation.replace(ROUTES.FEED, {
        hobbyId,
        topicId: nextStage.conceptId,
        topicName: nextStage.title,
        stageIndex: stageIdx + 1,
        accumulatedVideos: totalWatched,
      });
    } else {
      navigation.navigate(ROUTES.ROADMAP);
    }
  }, [roadmapStages, topicId, hobbyId, navigation, accumulatedVideos]);

  const awardXP = useCallback((index: number) => {
    if (watchedSet.current.has(index)) return;
    addXP(XP_PER_VIDEO);
    setXpDelta(XP_PER_VIDEO);
    markVideoWatched(hobbyId, topicId, videos.length);
    watchedSet.current.add(index);
    setTimeout(() => setXpDelta(0), XP_POPUP_CLEAR_MS);
  }, [addXP, markVideoWatched, hobbyId, topicId, videos.length]);

  const handleContinue = useCallback(() => {
    awardXP(currentIndex);
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
    } else {
      goNextTopic();
    }
  }, [awardXP, currentIndex, isLast, goNextTopic]);

  const handleBreak = useCallback(() => {
    awardXP(currentIndex);
    const totalWatched = accumulatedVideos + watchedSet.current.size;
    navigation.replace(ROUTES.PROGRESS, {
      hobbyId,
      topicId,
      topicName,
      stageIndex,
      accumulatedVideos: totalWatched,
      videosWatched: totalWatched,
      xpEarned: totalWatched * XP_PER_VIDEO,
    });
  }, [awardXP, currentIndex, navigation, hobbyId, topicId, topicName, stageIndex, accumulatedVideos]);

  return {
    currentIndex,
    setCurrentIndex,
    xpDelta,
    sheetOpen,
    setSheetOpen,
    isLast,
    watchedSet,
    handleContinue,
    handleBreak,
    goNextTopic,
  };
}
