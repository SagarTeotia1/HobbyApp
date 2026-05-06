import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { leaderboardController } from './leaderboard.controller';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', asyncHandler(leaderboardController.get));
