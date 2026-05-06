import { Worker } from 'bullmq';
import { redis } from '../redis/upstash';
import { logger } from '../../shared/logger/winston';
import { QUEUE_NAMES, type CardGenerationJobData } from './cardGeneration.queue';

export const cardGenerationWorker = new Worker<CardGenerationJobData>(
  QUEUE_NAMES.CARD_GENERATION,
  async (job) => {
    logger.info(`[worker:card-generation] processing job ${job.id}`, { data: job.data });
    return { generated: 0, jobId: job.id };
  },
  {
    connection: redis,
    concurrency: 4,
  },
);

cardGenerationWorker.on('completed', (job) => {
  logger.info(`[worker:card-generation] completed ${job.id}`);
});

cardGenerationWorker.on('failed', (job, err) => {
  logger.error(`[worker:card-generation] failed ${job?.id}`, { err: err.message });
});
