import { Queue } from 'bullmq';
import { redis } from '../redis/upstash';

export const QUEUE_NAMES = {
  CARD_GENERATION: 'card-generation',
} as const;

export interface CardGenerationJobData {
  userId: string;
  hobbyId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  batchSize: number;
  conceptHints?: string[];
}

export const cardGenerationQueue = new Queue<CardGenerationJobData>(QUEUE_NAMES.CARD_GENERATION, {
  connection: redis,
  defaultJobOptions: {
    attempts: 1,
    backoff: { type: 'exponential', delay: 2_000 },
    removeOnComplete: { age: 60 * 60, count: 1000 },
    removeOnFail: { age: 60 * 60 * 24 },
  },
});
