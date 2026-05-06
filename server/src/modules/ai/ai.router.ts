import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { aiController } from './ai.controller';

export const aiRouter = Router();

aiRouter.post('/hobbies/suggest', asyncHandler(aiController.suggestHobbies));

aiRouter.use(authMiddleware);
aiRouter.post('/simplify', asyncHandler(aiController.simplifyCard));
aiRouter.post('/chat', asyncHandler(aiController.chatStream));
