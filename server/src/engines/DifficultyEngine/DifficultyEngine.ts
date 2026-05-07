import type { DifficultyLevel, LearningSignal } from '../../shared/types/common.types';
import type { DifficultyAdjustmentResult } from './DifficultyEngine.types';

export interface DifficultyState {
  current: DifficultyLevel;
  score: number;
}

const ORDER: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];
const SCORE_UP = 3;
const SCORE_DOWN = -3;

function getScoreDelta(signal: LearningSignal): number {
  if (signal.interaction === 'understood') return 2;
  if (signal.interaction === 'needs_review' || signal.interaction === 'needs_simpler') return -2;
  if (signal.interaction === 'skipped') return -1;
  if (signal.interaction === 'bookmarked') return 1;
  return 0;
}

export const DifficultyEngine = {
  adjust(state: DifficultyState, signal: LearningSignal): DifficultyAdjustmentResult {
    const prev = state.current;
    const delta = getScoreDelta(signal);
    const nextScore = state.score + delta;
    const currentIndex = ORDER.indexOf(state.current);

    if (nextScore >= SCORE_UP && currentIndex < ORDER.length - 1) {
      const next = ORDER[currentIndex + 1];
      return { previous: prev, next, score: 0, changed: true };
    }

    if (nextScore <= SCORE_DOWN && currentIndex > 0) {
      const next = ORDER[currentIndex - 1];
      return { previous: prev, next, score: 0, changed: true };
    }

    return { previous: prev, next: prev, score: nextScore, changed: false };
  },
};
