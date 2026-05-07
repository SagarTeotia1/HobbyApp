import { z } from 'zod';

export const startSpeedRoundSchema = z.object({
  hobbyId: z.string().min(1),
});

export const submitSpeedRoundSchema = z.object({
  sessionId: z.string().min(1),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedIndex: z.number().int().min(0).max(3),
      timeMs: z.number().int().min(0),
    }),
  ),
});

export type StartSpeedRoundInput = z.infer<typeof startSpeedRoundSchema>;
export type SubmitSpeedRoundInput = z.infer<typeof submitSpeedRoundSchema>;
