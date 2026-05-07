import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { rateLimiter } from '../../shared/middleware/rateLimiter.middleware';
import { aiController } from './ai.controller';

export const aiRouter = Router();

aiRouter.post('/hobbies/suggest', asyncHandler(aiController.suggestHobbies));

aiRouter.use(authMiddleware);
aiRouter.use(rateLimiter({ max: 20, keyPrefix: 'ai-chat' }));
aiRouter.post('/simplify', asyncHandler(aiController.simplifyCard));
aiRouter.post('/chat', asyncHandler(aiController.chatStream));
aiRouter.post('/chat/sync', asyncHandler(aiController.chatSync));
aiRouter.post('/chat/action', asyncHandler(aiController.chatAction));
