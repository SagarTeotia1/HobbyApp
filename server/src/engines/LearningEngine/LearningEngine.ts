import type { LearningEngineContext, NextCardSuggestion } from './LearningEngine.types';

export const LearningEngine = {
  pickNext(ctx: LearningEngineContext): NextCardSuggestion {
    const weakConcept = ctx.weakConcepts[0];
    if (weakConcept) {
      return {
        conceptId: weakConcept,
        reason: 'reinforce_weak_concept',
        difficulty: ctx.currentDifficulty,
      };
    }

    const masteredSet = new Set(ctx.masteredConcepts);
    const fallbackConcept = `${ctx.hobbyId}_core_foundations`;
    const conceptId = masteredSet.has(fallbackConcept)
      ? `${ctx.hobbyId}_next_progression`
      : fallbackConcept;

    return {
      conceptId,
      reason: 'normal_progression',
      difficulty: ctx.currentDifficulty,
    };
  },
};
