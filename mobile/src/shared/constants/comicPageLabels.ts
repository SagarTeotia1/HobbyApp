import { colors } from '../../app/theme';

export const COMIC_PAGE_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Discovery', color: colors.blue },
  2: { label: 'Principle', color: colors.violet },
  3: { label: 'In Action', color: colors.mint },
  4: { label: 'Challenge', color: colors.red },
  5: { label: 'Mastery',   color: colors.amber },
};

export const COMIC_PAGE_FALLBACK_COLOR = colors.indigo;
