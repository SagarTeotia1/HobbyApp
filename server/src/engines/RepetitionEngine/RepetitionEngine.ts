export interface RepetitionItem {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewAt: string;
}

export type RepetitionGrade = 0 | 1 | 2 | 3 | 4 | 5;

export const RepetitionEngine = {
  schedule(_item: RepetitionItem, _grade: RepetitionGrade): RepetitionItem {
    throw new Error('RepetitionEngine.schedule not implemented');
  },
};
