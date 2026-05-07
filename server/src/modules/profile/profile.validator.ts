import { z } from 'zod';

export const updateProfileSchema = z.object({
  avatar: z.string().emoji().optional(),
  dailyTimeMinutes: z.number().int().min(5).max(120).optional(),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

export const switchHobbySchema = z.object({
  hobbyId: z.string().min(1),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type SwitchHobbyInput = z.infer<typeof switchHobbySchema>;
