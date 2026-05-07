import { StyleSheet } from 'react-native';
import { spacing, radius } from '../../../../app/theme';

export const badgeStyles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
});
