import { cardGenerationQueue } from './cardGeneration.queue';
import { logger } from '../../shared/logger/winston';

export const queues = {
  cardGeneration: cardGenerationQueue,
} as const;

export async function closeQueues(): Promise<void> {
  await Promise.all(Object.values(queues).map((q) => q.close()));
  logger.info('[queue] all queues closed');
}
