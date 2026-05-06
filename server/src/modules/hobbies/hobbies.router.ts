import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { hobbiesController } from './hobbies.controller';

export const hobbiesRouter = Router();

hobbiesRouter.get('/', asyncHandler(hobbiesController.list));
hobbiesRouter.get('/:slug', asyncHandler(hobbiesController.getBySlug));
