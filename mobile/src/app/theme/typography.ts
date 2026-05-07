import { Platform } from 'react-native';

export const typography = {
  family: {
    regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    medium: Platform.select({ ios: 'System', android: 'Roboto-Medium', default: 'System' }),
    bold: Platform.select({ ios: 'System', android: 'Roboto-Bold', default: 'System' }),
  },
  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 36,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export type Typography = typeof typography;
