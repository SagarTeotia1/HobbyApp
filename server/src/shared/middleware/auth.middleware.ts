import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { ApiError } from '../utils/ApiError';

interface JwtPayload {
  sub: string;
  type: 'anonymous' | 'linked';
  iat?: number;
  exp?: number;
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Missing or invalid Authorization header'));
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = { uuid: decoded.sub, type: decoded.type };
    return next();
  } catch {
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
}
