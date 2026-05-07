import { z } from 'zod';

export const getProgressSchema = z.object({
  hobbyId: z.string().min(1),
});

export const getSessionSchema = z.object({
  sessionId: z.string().min(1),
});

export const updateStreakSchema = z.object({
  userId: z.string().min(1),
  localDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
});

export type GetProgressInput = z.infer<typeof getProgressSchema>;
export type GetSessionInput = z.infer<typeof getSessionSchema>;
export type UpdateStreakInput = z.infer<typeof updateStreakSchema>;
