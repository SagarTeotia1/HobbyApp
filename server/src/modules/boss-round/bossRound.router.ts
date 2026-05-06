import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { bossRoundController } from './bossRound.controller';

export const bossRoundRouter = Router();

bossRoundRouter.use(authMiddleware);
bossRoundRouter.post('/start', asyncHandler(bossRoundController.start));
bossRoundRouter.post('/submit', asyncHandler(bossRoundController.submit));
