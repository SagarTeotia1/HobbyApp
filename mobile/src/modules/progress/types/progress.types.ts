export interface ProgressSession {
  sessionId: string;
  xpGained: number;
  cardsSeen: number;
  cardsUnderstood: number;
  cardsBookmarked: number;
  weakTopics: string[];
  streak: number;
  totalXP: number;
  level: number;
  completedAt: string;
}

export interface ProgressSummaryView {
  xpGainedSession: number;
  streak: number;
  cardsMastered: number;
  weakTopics: string[];
}
