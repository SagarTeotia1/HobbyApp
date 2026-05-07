import { StyleSheet } from 'react-native';
import { spacing } from '../../../../app/theme';

export const cardActionsStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  button: {
    padding: spacing.sm,
  },
});
