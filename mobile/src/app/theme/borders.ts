/**
 * Neo-brutal border system.
 * Rule: interactive elements always use `base` (2px) border in `colors.border` (#0A0A0A).
 * `thin` is for layout dividers only — never on buttons, cards, or inputs.
 */
export const borders = {
  width: {
    thin:  1,
    base:  2,
    thick: 3,
  },
  radius: {
    none: 0,
    sm:   4,
    md:   8,
    lg:   12,
    xl:   16,
    pill: 999,
  },
} as const;

export type Borders = typeof borders;
