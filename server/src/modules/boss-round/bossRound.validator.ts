import { z } from 'zod';

export const startBossRoundSchema = z.object({
  hobbyId: z.string().min(1),
  sessionId: z.string().min(1),
  conceptIds: z.array(z.string().min(1)).min(1).max(10),
});

export const bossAnswerSchema = z.object({
  sessionId: z.string().min(1),
  questionId: z.string().min(1),
  selectedIndex: z.number().int().min(0).max(3),
  responseTimeMs: z.number().int().min(0),
});

export const completeBossRoundSchema = z.object({
  sessionId: z.string().min(1),
  hobbyId: z.string().min(1),
});

export type StartBossRoundInput = z.infer<typeof startBossRoundSchema>;
export type BossAnswerInput = z.infer<typeof bossAnswerSchema>;
export type CompleteBossRoundInput = z.infer<typeof completeBossRoundSchema>;
