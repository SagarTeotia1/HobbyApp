import { Worker } from 'bullmq';
import { redis } from '../redis/upstash';
import { logger } from '../../shared/logger/winston';
import { QUEUE_NAMES, type CardGenerationJobData } from './cardGeneration.queue';
import { HobbyModel } from '../../models/Hobby.model';
import { aiService } from '../../modules/ai/ai.service';
import { CardModel } from '../../models/Card.model';
import type { DifficultyLevel, LearningCardType } from '../../shared/types/common.types';

function buildFallbackCards(params: {
  hobbyId: string;
  hobbyName: string;
  difficulty: DifficultyLevel;
  conceptId: string;
  count: number;
}): Array<{
  hobbyId: string;
  type: LearningCardType;
  difficulty: DifficultyLevel;
  conceptId: string;
  title: string;
  frontContent: string;
  backContent: string;
  tags: string[];
  estimatedReadSeconds: number;
  generatedAt: Date;
}> {
  return Array.from({ length: params.count }).map((_, index) => ({
    hobbyId: params.hobbyId,
    type: 'concept' as const,
    difficulty: params.difficulty,
    conceptId: params.conceptId,
    title: `${params.hobbyName} Micro Lesson ${index + 1}`,
    frontContent: `Core ${params.hobbyName} idea #${index + 1}.`,
    backContent: `Practical ${params.hobbyName} tip #${index + 1}.`,
    tags: [params.hobbyId, 'fallback'],
    estimatedReadSeconds: 30,
    generatedAt: new Date(),
  }));
}

export const cardGenerationWorker = new Worker<CardGenerationJobData>(
  QUEUE_NAMES.CARD_GENERATION,
  async (job) => {
    logger.info(`[worker:card-generation] processing job ${job.id}`, { data: job.data });

    const hobby = await HobbyModel.findOne({ slug: job.data.hobbyId }).lean();
    if (!hobby) {
      throw new Error(`Hobby not found for slug=${job.data.hobbyId}`);
    }

    const conceptId = job.data.conceptHints?.[0] ?? 'next-concept';
    let cards: Array<{
      hobbyId: string;
      type: LearningCardType;
      difficulty: DifficultyLevel;
      conceptId: string;
      title: string;
      frontContent: string;
      backContent: string;
      tags: string[];
      estimatedReadSeconds: number;
      generatedAt: Date;
    }> = buildFallbackCards({
      hobbyId: hobby.slug,
      hobbyName: hobby.name,
      difficulty: job.data.difficulty,
      conceptId,
      count: job.data.batchSize,
    });
    try {
      cards = await aiService.generateCards({
        hobby: hobby.name,
        hobbyId: hobby.slug,
        level: job.data.difficulty,
        conceptId,
        count: job.data.batchSize,
        previousCards: [],
        userWeaknesses: [],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('429') || message.includes('quota')) {
        logger.warn('[worker:card-generation] Gemini quota hit, using fallback cards', {
          jobId: job.id,
          hobbyId: hobby.slug,
        });
      } else {
        logger.warn('[worker:card-generation] Gemini generation failed, using fallback cards', {
          jobId: job.id,
          hobbyId: hobby.slug,
        });
      }
    }

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
