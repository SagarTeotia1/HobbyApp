import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../app/theme';

export const swipeDeckStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
});
