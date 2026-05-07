import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { curriculumController } from './curriculum.controller';

export const curriculumRouter = Router();

curriculumRouter.get('/', asyncHandler(curriculumController.listHobbies));
curriculumRouter.post('/cache/invalidate', asyncHandler(curriculumController.invalidateCache));
curriculumRouter.get('/:hobbyId', asyncHandler(curriculumController.getHobby));
curriculumRouter.get('/:hobbyId/topics/:topicId', asyncHandler(curriculumController.getTopic));
