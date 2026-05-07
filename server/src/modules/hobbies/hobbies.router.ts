import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { hobbiesController } from './hobbies.controller';

export const hobbiesRouter = Router();

hobbiesRouter.get('/', asyncHandler(hobbiesController.list));
hobbiesRouter.post('/custom', asyncHandler(hobbiesController.createCustom));
hobbiesRouter.get('/:slug', asyncHandler(hobbiesController.getBySlug));
