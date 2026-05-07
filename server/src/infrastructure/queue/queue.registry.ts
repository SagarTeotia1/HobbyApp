import { cardGenerationQueue } from './cardGeneration.queue';
import { cardGenerationWorker } from './cardGeneration.worker';
import { logger } from '../../shared/logger/winston';

export const queues = {
  cardGeneration: cardGenerationQueue,
} as const;

export async function closeQueues(): Promise<void> {
  await Promise.all([cardGenerationWorker.close(), ...Object.values(queues).map((q) => q.close())]);
  logger.info('[queue] all queues closed');
}
