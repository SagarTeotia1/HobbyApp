import type { AnonymousUser } from '../../shared/types/common.types';

export type ProfileResponse = AnonymousUser;

export interface UpdateProfilePayload {
  currentHobbyId?: string;
  dailyTimeMinutes?: number;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
}
