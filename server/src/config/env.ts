import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('3000')
    .transform((v) => parseInt(v, 10)),

  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),

  UPSTASH_REDIS_URL: z
    .string()
    .min(1, 'UPSTASH_REDIS_URL is required')
    .refine(
      (v) => v.startsWith('redis://') || v.startsWith('rediss://'),
      'UPSTASH_REDIS_URL must start with redis:// or rediss:// (the Redis protocol URL, NOT the https:// REST endpoint). In Upstash console pick the "Node / ioredis" tab.',
    ),
  UPSTASH_REDIS_TOKEN: z.string().optional(),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 chars'),

  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
  GEMINI_MODEL_FAST: z.string().default('gemini-2.0-flash'),
  GEMINI_MODEL_PRO: z.string().default('gemini-2.0-flash'),

  CORS_ORIGIN: z.string().default('*'),
  CLIENT_URL: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().url().optional(),
  ),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('[env] Invalid environment configuration:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env: Env = parsed.data;
