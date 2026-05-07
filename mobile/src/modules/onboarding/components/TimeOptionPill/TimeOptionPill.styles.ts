import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';
import { borders } from '../../../../app/theme/borders';
import { shadows } from '../../../../app/theme/shadows';

export const timeOptionPillStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.sm,
  },
  cardSelected: {
    backgroundColor: colors.yellow,
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.none,
  },
  cardPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.none,
  },
  cardSelectedPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.none,
  },

  left: {
    gap: 2,
  },
  timeLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  timeLabelSelected: {
    color: colors.text,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.2,
  },
  subLabelSelected: {
    color: colors.text,
  },

  badge: {
    width: 44,
    height: 44,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.base,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSelected: {
    backgroundColor: colors.surface,
  },
  emoji: {
    fontSize: 22,
  },
});
