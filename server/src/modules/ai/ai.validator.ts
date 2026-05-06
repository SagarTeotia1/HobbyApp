import { z } from 'zod';

export const aiChatSchema = z.object({
  message: z.string().min(1).max(1000),
  hobbyId: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1),
      }),
    )
    .max(40)
    .default([]),
});

export const hobbySuggestSchema = z.object({
  query: z.string().min(1).max(200),
});

export const simplifyCardSchema = z.object({
  cardId: z.string().min(1),
  hobbyId: z.string().min(1),
});

export type AIChatInput = z.infer<typeof aiChatSchema>;
export type HobbySuggestInput = z.infer<typeof hobbySuggestSchema>;
export type SimplifyCardInput = z.infer<typeof simplifyCardSchema>;
