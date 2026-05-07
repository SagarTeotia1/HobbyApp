import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ override: true });

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
  GEMINI_MODEL_FAST: z.string().default('gemini-2.5-flash'),
  GEMINI_MODEL_PRO: z.string().default('gemini-2.5-flash'),
  GEMINI_MODEL_FALLBACK: z.string().default('gemini-2.5-flash'),
  GROQ_API_KEY: z.string().min(1, 'GROQ_API_KEY is required'),
  GROQ_MODEL_FAST: z.string().default('llama-3.1-8b-instant'),
  AI_PROVIDER: z.enum(['groq', 'gemini']).default('groq'),
  AI_FALLBACK_PROVIDER: z.enum(['groq', 'gemini']).default('gemini'),

  CURRICULUM_URL: z.string().url().optional(),

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
