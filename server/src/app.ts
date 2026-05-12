import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './config/corsOptions';
import { requestLogger } from './shared/middleware/requestLogger.middleware';
import { errorHandler } from './shared/middleware/errorHandler.middleware';
import { ApiResponse } from './shared/utils/ApiResponse';

import { onboardingRouter } from './modules/onboarding/onboarding.router';
import { learningFeedRouter } from './modules/learning-feed/learningFeed.router';
import { progressRouter } from './modules/progress/progress.router';
import { aiRouter } from './modules/ai/ai.router';
import { hobbiesRouter } from './modules/hobbies/hobbies.router';
import { curriculumRouter } from './modules/curriculum/curriculum.router';
import { roadmapRouter } from './modules/roadmap/roadmap.router';
import { youtubeRouter } from './modules/youtube/youtube.router';
import { comicRouter } from './modules/comic/comic.router';

export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  app.get('/', (_req, res) => {
    ApiResponse.ok(res, { status: 'ok', message: 'HobbyForge API is running' });
  });

  app.get('/health', (_req, res) => {
    ApiResponse.ok(res, { status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/v1/onboarding', onboardingRouter);
  app.use('/api/v1/feed', learningFeedRouter);
  app.use('/api/v1/progress', progressRouter);
  app.use('/api/v1/ai', aiRouter);
  app.use('/api/v1/hobbies', hobbiesRouter);
  app.use('/api/v1/curriculum', curriculumRouter);
  app.use('/api/v1/roadmap',    roadmapRouter);
  app.use('/api/v1/youtube',   youtubeRouter);
  app.use('/api/v1/comic',     comicRouter);

  app.use((_req, res) => {
    ApiResponse.error(res, 404, 'NOT_FOUND', 'Route not found');
  });

  app.use(errorHandler);

  return app;
}
