import morgan from 'morgan';
import type { StreamOptions } from 'morgan';
import { logger } from '../logger/winston';
import { env } from '../../config/env';

const stream: StreamOptions = {
  write: (message) => logger.http?.(message.trim()) ?? logger.info(message.trim()),
};

const format = env.NODE_ENV === 'production' ? 'combined' : 'dev';

export const requestLogger = morgan(format, { stream });
