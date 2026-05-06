import Redis from 'ioredis';
import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';

export const redis = new Redis(env.UPSTASH_REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  lazyConnect: false,
  retryStrategy: (times) => {
    if (times > 5) {
      logger.error('[redis] giving up after 5 retries; check UPSTASH_REDIS_URL');
      return null;
    }
    return Math.min(times * 500, 3_000);
  },
});

redis.on('connect', () => logger.info('[redis] connected'));
redis.on('ready', () => logger.info('[redis] ready'));
redis.on('error', (err) => logger.error('[redis] error', { err: err.message }));
redis.on('close', () => logger.warn('[redis] connection closed'));
redis.on('end', () => logger.warn('[redis] connection ended'));
