import { z } from 'zod';
import { COMIC_TOTAL_PAGES } from './comic.types';

export const comicPanelQuerySchema = z.object({
  hobbyId: z.string().min(1),
  topicId: z.string().min(1),
  topicName: z.string().min(1),
  hobbyName: z.string().min(1),
  page: z.coerce.number().int().min(1).max(COMIC_TOTAL_PAGES).default(1),
});

export type ComicPanelQueryInput = z.infer<typeof comicPanelQuerySchema>;
