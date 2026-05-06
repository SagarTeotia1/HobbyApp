import mongoose from 'mongoose';
import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';

mongoose.set('strictQuery', true);

export async function connectMongo(): Promise<typeof mongoose> {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10_000,
    });
    logger.info(`[mongo] connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    logger.error('[mongo] connection failed', { err });
    throw err;
  }
}

export async function disconnectMongo(): Promise<void> {
  await mongoose.disconnect();
  logger.info('[mongo] disconnected');
}
