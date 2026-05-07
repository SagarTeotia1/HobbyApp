import { StyleSheet } from 'react-native';
import { colors, radius } from '../../../../app/theme';

export const speedTimerBarStyles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
