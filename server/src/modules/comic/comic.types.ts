export interface ComicPanel {
  imageUrl: string;
  prompt: string;
  page: number;
  totalPages: number;
  seed: number;
  cachedAt: string;
}

export const COMIC_TOTAL_PAGES = 5;

export const PAGE_ANGLES: Record<number, { angle: string; textOverlay: string }> = {
  1: { angle: 'introduction — protagonist discovers the topic for the first time, wide-eyed discovery, establishing shot', textOverlay: 'BEGIN' },
  2: { angle: 'concept reveal — wise master explains the core principle with visual diagram annotations, glowing concept visualization', textOverlay: 'THE PRINCIPLE' },
  3: { angle: 'action — protagonist applies the technique in a real challenge, dynamic kinetic motion, speed lines', textOverlay: 'IN ACTION' },
  4: { angle: 'struggle — protagonist faces the hardest obstacle, intense expression, sweat, determined to overcome', textOverlay: 'THE CHALLENGE' },
  5: { angle: 'mastery — triumphant protagonist after achieving mastery, light rays, confident victory pose, celebratory energy', textOverlay: 'MASTERED' },
};
