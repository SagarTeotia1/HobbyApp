import { create } from 'zustand';
import { storageService } from '../../../shared/services/storage.service';
import type { HobbyProgress, TopicProgress } from '../types/roadmap.types';

interface RoadmapState {
  progress: Record<string, HobbyProgress>;
  markVideoWatched: (hobbyId: string, topicId: string, totalVideos: number) => void;
  getTopicProgress: (hobbyId: string, topicId: string) => TopicProgress | undefined;
  getCompletedTopicCount: (hobbyId: string) => number;
  reset: () => void;
}

function loadProgress(): Record<string, HobbyProgress> {
  try {
    const raw = storageService.getRoadmapProgress();
    return raw ? (JSON.parse(raw) as Record<string, HobbyProgress>) : {};
  } catch (e) {
    console.warn('[roadmap.store] Failed to parse saved progress:', e);
    return {};
  }
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  progress: loadProgress(),

  markVideoWatched: (hobbyId, topicId, totalVideos) => {
    set((state) => {
      const hobbyProgress = state.progress[hobbyId] ?? { hobbyId, topicsProgress: {}, totalXP: 0 };
      const topicProgress = hobbyProgress.topicsProgress[topicId] ?? {
        topicId,
        completed: false,
        videosWatched: 0,
        totalVideos,
      };
      const newWatched = Math.min(topicProgress.videosWatched + 1, totalVideos);
      const completed = newWatched >= totalVideos;
      const updated: HobbyProgress = {
        ...hobbyProgress,
        topicsProgress: {
          ...hobbyProgress.topicsProgress,
          [topicId]: { topicId, completed, videosWatched: newWatched, totalVideos },
        },
        totalXP: hobbyProgress.totalXP + 25,
      };
      const newProgress = { ...state.progress, [hobbyId]: updated };
      storageService.setRoadmapProgress(JSON.stringify(newProgress));
      return { progress: newProgress };
    });
  },

  getTopicProgress: (hobbyId, topicId) => {
    return get().progress[hobbyId]?.topicsProgress[topicId];
  },

  getCompletedTopicCount: (hobbyId) => {
    const hp = get().progress[hobbyId];
    if (!hp) return 0;
    return Object.values(hp.topicsProgress).filter((t) => t.completed).length;
  },

  reset: () => {
    storageService.setRoadmapProgress('{}');
    set({ progress: {} });
  },
}));
