import { uploadBuffer } from '../storage/r2.client';
import { env } from '../../config/env';
import { logger } from '../../shared/logger/winston';

export interface GradioImageResult {
  imageUrl: string;
  seed: number;
}

const REPLICATE_API = 'https://api.replicate.com/v1';
const MODEL = 'black-forest-labs/flux-2-pro';

async function replicatePost(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${REPLICATE_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      Prefer: 'wait=60',  // wait up to 60s for result inline
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[replicate] POST ${path} ${res.status}: ${text}`);
  }
  return res.json();
}

async function replicateGet(url: string): Promise<unknown> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${env.REPLICATE_API_TOKEN}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`[replicate] GET ${url} ${res.status}`);
  return res.json();
}

export async function generateImage(
  prompt: string,
  width = 1024,
  height = 1024,
): Promise<GradioImageResult> {
  // Create prediction (Prefer: wait=60 returns synchronously if done in time)
  const prediction = await replicatePost(`/models/${MODEL}/predictions`, {
    input: { prompt, width, height, output_format: 'webp', output_quality: 90 },
  }) as { id: string; status: string; output?: unknown; urls?: { get: string } };

  logger.info(`[replicate] prediction ${prediction.id} status=${prediction.status}`);

  // Poll if not completed inline
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise((r) => setTimeout(r, 2000));
    result = await replicateGet(result.urls!.get) as typeof prediction;
    logger.info(`[replicate] poll ${result.id} status=${result.status}`);
  }

  if (result.status === 'failed' || !result.output) {
    throw new Error(`[replicate] prediction failed: ${JSON.stringify(result)}`);
  }

  // flux-2-pro output is a plain string URL
  const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
  logger.info(`[replicate] output type=${typeof outputUrl} value=${String(outputUrl).slice(0, 80)}`);

  if (typeof outputUrl !== 'string') {
    throw new Error(`[replicate] expected string URL, got: ${JSON.stringify(outputUrl)}`);
  }

  // Fetch image bytes and upload to R2
  const fetchRes = await fetch(outputUrl, { signal: AbortSignal.timeout(30_000) });
  if (!fetchRes.ok) throw new Error(`[replicate] fetch image failed: ${fetchRes.status}`);

  const contentType = fetchRes.headers.get('content-type') ?? 'image/webp';
  const ext = contentType.includes('png') ? 'png' : contentType.includes('jpeg') ? 'jpg' : 'webp';
  const buffer = Buffer.from(await fetchRes.arrayBuffer());

  const seed = Math.floor(Math.random() * 2 ** 32);
  const key = `comic/${Date.now()}-${seed}.${ext}`;
  const imageUrl = await uploadBuffer(key, buffer, contentType);
  logger.info(`[replicate] uploaded to R2: ${imageUrl}`);

  return { imageUrl, seed };
}
