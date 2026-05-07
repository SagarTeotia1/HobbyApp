import { colors } from './colors';
import { typography } from './typography';
import { spacing, radius } from './spacing';
import { shadows, shadowPressTranslate } from './shadows';
import { borders } from './borders';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  borders,
} as const;

export type Theme = typeof theme;

export { colors, typography, spacing, radius, shadows, shadowPressTranslate, borders };
