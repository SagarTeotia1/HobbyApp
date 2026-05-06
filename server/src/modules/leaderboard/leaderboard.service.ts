import { redis } from '../../infrastructure/redis/upstash';
import { cacheKeys } from '../../shared/constants/cacheKeys';
import type { LeaderboardResponse } from './leaderboard.types';

export const leaderboardService = {
  async getGlobal(limit = 50): Promise<LeaderboardResponse> {
    const raw = await redis.zrevrange(cacheKeys.leaderboardGlobal(), 0, limit - 1, 'WITHSCORES');
    const entries: LeaderboardResponse['entries'] = [];
    for (let i = 0; i < raw.length; i += 2) {
      entries.push({ uuid: raw[i], xp: Number(raw[i + 1]), rank: Math.floor(i / 2) + 1 });
    }
    return { scope: 'global', hobbyId: null, entries };
  },

  async getHobby(hobbyId: string, limit = 50): Promise<LeaderboardResponse> {
    const raw = await redis.zrevrange(
      cacheKeys.leaderboardHobby(hobbyId),
      0,
      limit - 1,
      'WITHSCORES',
    );
    const entries: LeaderboardResponse['entries'] = [];
    for (let i = 0; i < raw.length; i += 2) {
      entries.push({ uuid: raw[i], xp: Number(raw[i + 1]), rank: Math.floor(i / 2) + 1 });
    }
    return { scope: 'hobby', hobbyId, entries };
  },
};
