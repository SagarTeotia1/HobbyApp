import { z } from 'zod';

export const startSpeedRoundSchema = z.object({
  hobbyId: z.string().min(1),
  sessionId: z.string().min(1),
  conceptIds: z.array(z.string().min(1)).min(1).max(10),
});

export const speedAnswerSchema = z.object({
  sessionId: z.string().min(1),
  questionId: z.string().min(1),
  selectedIndex: z.number().int().min(0).max(3),
  responseTimeMs: z.number().int().min(0),
});

export const completeSpeedRoundSchema = z.object({
  sessionId: z.string().min(1),
  hobbyId: z.string().min(1),
});

export type StartSpeedRoundInput = z.infer<typeof startSpeedRoundSchema>;
export type SpeedAnswerInput = z.infer<typeof speedAnswerSchema>;
export type CompleteSpeedRoundInput = z.infer<typeof completeSpeedRoundSchema>;
