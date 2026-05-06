import { z } from 'zod';

export const feedQuerySchema = z.object({
  hobbyId: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().optional(),
});

export const cardInteractionSchema = z.object({
  cardId: z.string().min(1),
  hobbyId: z.string().min(1),
  interaction: z.enum(['understood', 'needs_review', 'needs_simpler', 'bookmarked', 'skipped']),
  responseTimeMs: z.number().int().min(0),
  sessionId: z.string().min(1),
});

export type FeedQueryInput = z.infer<typeof feedQuerySchema>;
export type CardInteractionInput = z.infer<typeof cardInteractionSchema>;
