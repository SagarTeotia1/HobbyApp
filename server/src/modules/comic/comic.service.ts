import { redis } from '../../infrastructure/redis/upstash';
import { generateImage } from '../../infrastructure/comic/gradio.client';
import { aiService } from '../ai/ai.service';
import { logger } from '../../shared/logger/winston';
import { cacheKeys, cacheTTL } from '../../shared/constants/cacheKeys';
import { PAGE_ANGLES, COMIC_TOTAL_PAGES } from './comic.types';
import type { ComicPanel } from './comic.types';
import type { ComicPanelQueryInput } from './comic.validator';

// Define consistent character appearances for Flux
const CHARACTER_MAYA = 'A young female mentor named Maya with a short purple bob haircut, wearing a sleek white jacket with black trim and round glasses. Calm and confident.';
const CHARACTER_LEO = 'A teenage boy learner named Leo with messy brown hair, wearing a signature bright yellow hoodie and blue jeans. Highly expressive and energetic.';

const MANGA_BASE_STYLE =
  'manga-style educational comic panel, black and white manga shading with selective ink highlights, ' +
  'speed lines, dramatic composition, clean sharp line art, modern anime art style, ' +
  'ultra detailed, cinematic manga framing, NO speech bubbles, minimal clear English text';

async function buildMangaPrompt(
  hobbyName: string,
  topicName: string,
  page: number,
): Promise<string> {
  const angle = PAGE_ANGLES[page];
  
  // Keep the text extremely short for Flux to render perfectly
  const shortText = `${angle.textOverlay}: ${topicName}`.split(' ').slice(0, 4).join(' ').toUpperCase();

  const systemPrompt =
    'You are a master manga art director. Generate a detailed image prompt for an educational manga panel. ' +
    'The comic features two recurring characters: Maya (the mentor) and Leo (the student). ' +
    'Output strict JSON only: { "prompt": "...", "textOverlay": "..." }';

  const userPrompt =
    `Hobby: "${hobbyName}". Topic: "${topicName}". Page ${page} of ${COMIC_TOTAL_PAGES}.\n` +
    `Narrative angle: ${angle.angle}.\n` +
    `Characters to include: Maya and/or Leo depending on the scene.\n` +
    `Required character visuals: Maya (${CHARACTER_MAYA}), Leo (${CHARACTER_LEO}).\n` +
    `Text: Provide exactly 1 to 3 very short English words to overlay in the image (e.g., "FOCUS", "STEP 1", "CHECKMATE").\n` +
    `Include hobby-specific visual elements (${hobbyName} equipment, setting, symbols).\n` +
    `Add to this base style: "${MANGA_BASE_STYLE}"\n` +
    `Output a cohesive prompt string describing the visual scene, and the short text string.`;

  try {
    const result = await aiService.generateRawJSON<{ prompt: string, textOverlay: string }>(systemPrompt, userPrompt);
    
    // Construct the final prompt for Replicate (Flux-2-pro)
    // We explicitly tell Flux to render the text in a specific way
    return `${result.prompt}. The characters are Maya (${CHARACTER_MAYA}) and Leo (${CHARACTER_LEO}). ` +
           `Boldly written in the image is the text "${result.textOverlay}" in clean, large manga typography. ` +
           `${MANGA_BASE_STYLE}`;
  } catch {
    // Fallback prompt ensuring character consistency
    return (
      `Leo (${CHARACTER_LEO}) and Maya (${CHARACTER_MAYA}) doing ${hobbyName} ${topicName}, manga panel page ${page}, ${angle.angle}. ` +
      `Boldly written in the image is the text "${shortText}". ${MANGA_BASE_STYLE}`
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
