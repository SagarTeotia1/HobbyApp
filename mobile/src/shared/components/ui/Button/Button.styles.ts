import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    gap: 8,
    ...shadows.md,
  },

  // ─── Variants ─────────────────────────────────────────────────
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.bgElevated,
  },
  ghost: {
    backgroundColor: 'transparent',
    ...shadows.none,
    borderColor: colors.border,
  },

  // ─── States ───────────────────────────────────────────────────
  disabled: {
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
    ...shadows.none,
  },
  pressed: {
    // Translate matches shadow offset — creates "click into shadow" effect
    transform: [{ translateX: 4 }, { translateY: 4 }],
    ...shadows.none,
  },

  // ─── Labels ───────────────────────────────────────────────────
  label: {
    fontSize: typography.size.md,
    fontWeight: '700',
    color: colors.textInverse,
    letterSpacing: 0.2,
  },
  labelSecondary: {
    color: colors.text,
  },
  labelGhost: {
    color: colors.primary,
  },
  labelDisabled: {
    color: colors.textDim,
  },
});
