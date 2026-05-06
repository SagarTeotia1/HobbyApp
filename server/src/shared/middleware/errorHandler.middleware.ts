import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { logger } from '../logger/winston';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Response {
  if (err instanceof ApiError) {
    if (!err.isOperational) {
      logger.error(err.message, { stack: err.stack, path: req.path });
    }
    return ApiResponse.error(res, err.statusCode, err.code, err.message, err.details);
  }

  if (err instanceof ZodError) {
    return ApiResponse.error(
      res,
      400,
      'VALIDATION_ERROR',
      'Invalid request payload',
      err.flatten().fieldErrors,
    );
  }

  logger.error('Unhandled error', { error: err.message, stack: err.stack, path: req.path });
  return ApiResponse.error(res, 500, 'INTERNAL_ERROR', 'Internal server error');
}
