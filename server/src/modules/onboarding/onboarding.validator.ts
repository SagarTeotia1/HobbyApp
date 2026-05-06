import { z } from 'zod';

export const onboardingSchema = z.object({
  hobbySlug: z.string().min(1).max(80),
  dailyTimeMinutes: z.number().int().min(5).max(120),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
