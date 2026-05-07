export interface RepetitionItem {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewAt: string;
}

export type RepetitionGrade = 0 | 1 | 2 | 3 | 4 | 5;

export const RepetitionEngine = {
  schedule(item: RepetitionItem, grade: RepetitionGrade): RepetitionItem {
    let easeFactor = item.easeFactor;
    let repetitions = item.repetitions;
    let interval = item.interval;

    if (grade < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      repetitions += 1;
      if (repetitions === 1) interval = 1;
      else if (repetitions === 2) interval = 6;
      else interval = Math.max(1, Math.round(interval * easeFactor));
    }

    easeFactor = Math.max(
      1.3,
      easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
    );

    const nextReviewAt = new Date(Date.now() + interval * 24 * 60 * 60 * 1000).toISOString();

    return {
      cardId: item.cardId,
      easeFactor,
      interval,
      repetitions,
      nextReviewAt,
    };
  },
};
