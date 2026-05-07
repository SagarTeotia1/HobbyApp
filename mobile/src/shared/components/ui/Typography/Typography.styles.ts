import { StyleSheet } from 'react-native';
import { typography } from '../../../../app/theme';

export const typographyStyles = StyleSheet.create({
  display:  { fontSize: typography.size.display, fontWeight: '700' },
  title:    { fontSize: typography.size.xxl,     fontWeight: '700' },
  heading:  { fontSize: typography.size.xl,      fontWeight: '600' },
  body:     { fontSize: typography.size.md,      fontWeight: '400' },
  caption:  { fontSize: typography.size.sm,      fontWeight: '400' },
  micro:    { fontSize: typography.size.xs,      fontWeight: '500' },
});
