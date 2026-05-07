import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../../app/theme';

export const comboCounterStyles = StyleSheet.create({
  banner: {
    backgroundColor: colors.streak,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
