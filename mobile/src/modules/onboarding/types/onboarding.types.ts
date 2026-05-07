import type { DifficultyLevel } from '../../../shared/types/card.types';

export interface OnboardingFormState {
  hobbySlug: string | null;
  dailyTimeMinutes: number;
  skillLevel: DifficultyLevel;
}
