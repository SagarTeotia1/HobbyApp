/**
 * Neo-brutal hard offset shadows.
 * Rule: shadowRadius is always 0 — no Gaussian blur, ever.
 * Press animation counterpart: translate the element by (offsetX, offsetY)
 * to simulate "clicking into" the shadow.
 */
export const shadows = {
  sm: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  md: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  lg: {
    shadowColor: '#0A0A0A',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const;

/** Translate values that match each shadow offset — for press animations */
export const shadowPressTranslate = {
  sm: [{ translateX: 3 }, { translateY: 3 }],
  md: [{ translateX: 4 }, { translateY: 4 }],
  lg: [{ translateX: 6 }, { translateY: 6 }],
} as const;

export type ShadowSize = keyof Omit<typeof shadows, 'none'>;
