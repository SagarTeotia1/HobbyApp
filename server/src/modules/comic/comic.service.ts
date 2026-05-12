import { redis } from '../../infrastructure/redis/upstash';
import { generateImage } from '../../infrastructure/comic/gradio.client';
import { aiService } from '../ai/ai.service';
import { logger } from '../../shared/logger/winston';
import { cacheKeys, cacheTTL } from '../../shared/constants/cacheKeys';
import { PAGE_ANGLES, COMIC_TOTAL_PAGES } from './comic.types';
import type { ComicPanel } from './comic.types';
import type { ComicPanelQueryInput } from './comic.validator';

const MANGA_BASE_STYLE =
  'manga-style educational comic panel, black and white manga shading with selective ink highlights, ' +
  'speed lines, dramatic composition, clean sharp line art, modern anime art style, ' +
  'detailed readable background, no foreign text, English text only, no speech bubbles, ' +
  'ultra detailed, cinematic manga framing';

async function buildMangaPrompt(
  hobbyName: string,
  topicName: string,
  page: number,
): Promise<string> {
  const angle = PAGE_ANGLES[page];
  const textOverlay = `"${angle.textOverlay}: ${topicName.toUpperCase()}"`;

  const systemPrompt =
    'You are a manga art director. Generate a detailed Stable Diffusion image prompt for an educational manga panel. ' +
    'Output strict JSON only: { "prompt": "..." }';

  const userPrompt =
    `Hobby: "${hobbyName}". Topic: "${topicName}". Page ${page} of ${COMIC_TOTAL_PAGES}.\n` +
    `Narrative angle: ${angle.angle}.\n` +
    `Required English text overlay in the image: ${textOverlay}.\n` +
    `Include hobby-specific visual elements (${hobbyName} equipment, setting, symbols).\n` +
    `Add to this base style: "${MANGA_BASE_STYLE}"\n` +
    `Output a single cohesive prompt string that extends the base style with specific scene details.`;

  try {
    const result = await aiService.generateRawJSON<{ prompt: string }>(systemPrompt, userPrompt);
    return `${result.prompt}, ${MANGA_BASE_STYLE}`;
  } catch {
    // Fallback prompt
    return (
      `${hobbyName} ${topicName} educational manga panel page ${page}, ${angle.angle}, ` +
      `English text overlay "${angle.textOverlay}: ${topicName}", ${MANGA_BASE_STYLE}`
    );
  }
}

export const comicService = {
  async getPanel(params: ComicPanelQueryInput): Promise<ComicPanel> {
    const cacheKey = cacheKeys.comicPanel(params.hobbyId, params.topicId, params.page);
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        logger.info(`[comic] cache hit: ${cacheKey}`);
        return JSON.parse(cached) as ComicPanel;
      }
    } catch (err) {
      logger.warn('[comic] Redis unavailable, skipping cache read', { err: err instanceof Error ? err.message : String(err) });
    }

    logger.info(`[comic] generating panel ${params.page}/${COMIC_TOTAL_PAGES} for ${params.hobbyName}/${params.topicName}`);

    const prompt = await buildMangaPrompt(params.hobbyName, params.topicName, params.page);
    logger.info(`[comic] prompt: ${prompt.slice(0, 120)}...`);

    const { imageUrl, seed } = await generateImage(prompt);

    const panel: ComicPanel = {
      imageUrl,
      prompt,
      page: params.page,
      totalPages: COMIC_TOTAL_PAGES,
      seed,
      cachedAt: new Date().toISOString(),
    };

    try {
      await redis.set(cacheKey, JSON.stringify(panel), 'EX', cacheTTL.comicPanel);
      logger.info(`[comic] cached panel ${params.page} for ${cacheKey}`);
    } catch (err) {
      logger.warn('[comic] Redis unavailable, result not cached', { err: err instanceof Error ? err.message : String(err) });
    }

    return panel;
  },
};
