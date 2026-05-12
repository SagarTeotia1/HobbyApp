import { env } from './config/env';
import { createApp } from './app';
import { connectMongo, disconnectMongo } from './infrastructure/database/mongodb';
import { redis } from './infrastructure/redis/upstash';
import { logger } from './shared/logger/winston';
import { hobbiesService } from './modules/hobbies/hobbies.service';

async function main(): Promise<void> {
  await connectMongo();
  await hobbiesService.seedPredefined();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`[server] HobbyForge API listening on http://localhost:${env.PORT}`);
    logger.info(`[server] env=${env.NODE_ENV}`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`[server] received ${signal}, shutting down gracefully...`);
    server.close();
    await disconnectMongo();
    await redis.quit();
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    logger.error('[server] unhandledRejection', { reason });
  });
  process.on('uncaughtException', (err) => {
    logger.error('[server] uncaughtException', { err: err.message, stack: err.stack });
  });
}

void main().catch((err) => {
  logger.error('[server] fatal startup error', { err });
  process.exit(1);
});
