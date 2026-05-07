export interface RepetitionEntry {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewAt: number;
}

export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

export const RepetitionEngine = {
  schedule(entry: RepetitionEntry, quality: Quality, now = Date.now()): RepetitionEntry {
    let { easeFactor, interval, repetitions } = entry;

    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      repetitions += 1;
      if (repetitions === 1) interval = 1;
      else if (repetitions === 2) interval = 6;
      else interval = Math.round(interval * easeFactor);
    }

    easeFactor = Math.max(
      1.3,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    );

    return {
      cardId: entry.cardId,
      easeFactor,
      interval,
      repetitions,
      nextReviewAt: now + interval * 24 * 60 * 60 * 1000,
    };
  },
};
