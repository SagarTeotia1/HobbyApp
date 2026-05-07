import { z } from 'zod';

export const onboardingInitSchema = z.object({});

export const onboardingCompleteSchema = z.object({
  hobbySlug: z.string().min(1).max(80),
  dailyMinutes: z.union([
    z.literal(5),
    z.literal(10),
    z.literal(15),
    z.literal(30),
    z.literal(60),
  ]),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

export type OnboardingInitInput = z.infer<typeof onboardingInitSchema>;
export type OnboardingCompleteInput = z.infer<typeof onboardingCompleteSchema>;
