import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware/auth.middleware';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { comicController } from './comic.controller';

export const comicRouter = Router();

comicRouter.use(authMiddleware);
comicRouter.get('/panel', asyncHandler(comicController.getPanel));
