import { Worker } from 'bullmq';
import { redis } from '../redis/upstash';
import { logger } from '../../shared/logger/winston';
import { QUEUE_NAMES, type CardGenerationJobData } from './cardGeneration.queue';
import { HobbyModel } from '../../models/Hobby.model';
import { aiService } from '../../modules/ai/ai.service';
import { CardModel } from '../../models/Card.model';

export const cardGenerationWorker = new Worker<CardGenerationJobData>(
  QUEUE_NAMES.CARD_GENERATION,
  async (job) => {
    logger.info(`[worker:card-generation] processing job ${job.id}`, { data: job.data });

    const hobby = await HobbyModel.findOne({ slug: job.data.hobbyId }).lean();
    if (!hobby) {
      throw new Error(`Hobby not found for slug=${job.data.hobbyId}`);
    }

    const conceptId = job.data.conceptHints?.[0] ?? 'next-concept';
    const cards = await aiService.generateCards({
      hobby: hobby.name,
      hobbyId: hobby.slug,
      level: job.data.difficulty,
      conceptId,
      count: job.data.batchSize,
      previousCards: [],
      userWeaknesses: [],
    });

    await CardModel.insertMany(
      cards.map((card) => ({
        ...card,
        generatedFor: job.data.userId,
      })),
    );

    return { generated: cards.length, jobId: job.id };
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
