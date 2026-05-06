import type { LearningEngineContext, NextCardSuggestion } from './LearningEngine.types';

export const LearningEngine = {
  pickNext(_ctx: LearningEngineContext): NextCardSuggestion {
    throw new Error('LearningEngine.pickNext not implemented');
  },
};
