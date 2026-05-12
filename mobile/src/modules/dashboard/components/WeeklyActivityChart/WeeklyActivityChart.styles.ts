import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.lg,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barCol: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  barTrack: {
    width: 24,
    height: 100,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: radius.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: colors.yellow,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textMuted,
  },
});
