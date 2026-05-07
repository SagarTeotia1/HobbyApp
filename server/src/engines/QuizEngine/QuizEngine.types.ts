import type { DifficultyLevel, QuizQuestion, BossQuestion } from '../../shared/types/common.types';

export interface QuizGenerationParams {
  hobbyId: string;
  conceptIds: string[];
  difficulty: DifficultyLevel;
  count: number;
}

export interface QuizAttempt {
  questionId: string;
  selectedIndex: number;
  responseTimeMs: number;
  isCorrect: boolean;
  xpEarned: number;
}

export interface QuizResult {
  sessionId: string;
  attempts: QuizAttempt[];
  totalXP: number;
  correctCount: number;
  totalQuestions: number;
  accuracy: number;
  completedAt: string;
}

export interface BossRoundState {
  questions: BossQuestion[];
  currentXP: number;
  comboCount: number;
  attempts: QuizAttempt[];
}

export interface BossRoundResult {
  attempts: QuizAttempt[];
  correctCount: number;
  wrongCount: number;
  xpGained: number;
  xpLost: number;
  netXP: number;
  maxCombo: number;
  didWin: boolean;
  completedAt: string;
}
