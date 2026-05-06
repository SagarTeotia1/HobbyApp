export interface OnboardingPayload {
  hobbySlug: string;
  dailyTimeMinutes: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface OnboardingResponse {
  uuid: string;
  jwt: string;
}
