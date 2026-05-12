import type { Request, Response, NextFunction } from 'express';
import { redis } from '../../infrastructure/redis/upstash';
import { cacheKeys, cacheTTL } from '../constants/cacheKeys';
import { ApiError } from '../utils/ApiError';

// Atomic INCR + conditional EXPIRE — avoids the race condition where EXPIRE
// never fires if the process dies between INCR and EXPIRE.
const RATE_LIMIT_SCRIPT = `
  local count = redis.call('INCR', KEYS[1])
  if count == 1 then
    redis.call('EXPIRE', KEYS[1], ARGV[1])
  end
  return count
`;

export function rateLimiter(opts: { windowSec?: number; max: number; keyPrefix?: string }) {
  const { windowSec = cacheTTL.rateLimit, max, keyPrefix = 'global' } = opts;

  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.user?.uuid ?? req.ip ?? 'anonymous';
      const key = cacheKeys.rateLimit(id, keyPrefix);
      const count = await redis.eval(RATE_LIMIT_SCRIPT, 1, key, String(windowSec)) as number;
      if (count > max) {
        return next(ApiError.tooManyRequests());
      }
      return next();
    } catch (err) {
      return next(err as Error);
    }
  };
}
