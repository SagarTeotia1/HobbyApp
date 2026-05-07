import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const sessionProgressBarStyles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
});
