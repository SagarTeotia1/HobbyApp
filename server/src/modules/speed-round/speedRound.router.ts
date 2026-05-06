import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { speedRoundController } from './speedRound.controller';

export const speedRoundRouter = Router();

speedRoundRouter.use(authMiddleware);
speedRoundRouter.post('/start', asyncHandler(speedRoundController.start));
speedRoundRouter.post('/submit', asyncHandler(speedRoundController.submit));
