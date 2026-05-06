import type { Request, Response, NextFunction } from 'express';
import { redis } from '../../infrastructure/redis/upstash';
import { cacheKeys, cacheTTL } from '../constants/cacheKeys';
import { ApiError } from '../utils/ApiError';

export function rateLimiter(opts: { windowSec?: number; max: number; keyPrefix?: string }) {
  const { windowSec = cacheTTL.rateLimit, max, keyPrefix = 'global' } = opts;

  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.user?.uuid ?? req.ip ?? 'anonymous';
      const key = cacheKeys.rateLimit(id, keyPrefix);
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, windowSec);
      }
      if (count > max) {
        return next(ApiError.tooManyRequests());
      }
      return next();
    } catch (err) {
      return next(err as Error);
    }
  };
}
