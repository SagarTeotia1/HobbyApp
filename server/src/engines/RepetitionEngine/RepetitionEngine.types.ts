export interface SM2Item {
  conceptId: string;
  easinessFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
}

export type SM2Grade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SM2UpdateResult {
  item: SM2Item;
  previousInterval: number;
  isDue: boolean;
}

export interface RepetitionSchedule {
  dueConceptIds: string[];
  upcomingConceptIds: string[];
  newConceptIds: string[];
}
