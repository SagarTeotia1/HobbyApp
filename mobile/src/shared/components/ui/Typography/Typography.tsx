import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../../../../app/theme';

export type TextVariant = 'display' | 'title' | 'heading' | 'body' | 'caption' | 'micro';
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps extends RNTextProps {
  variant?: TextVariant;
  muted?: boolean;
  weight?: FontWeight;
  color?: string;
}

const variantStyles = StyleSheet.create({
  display: { fontSize: typography.size.display, fontWeight: '700' },
  title: { fontSize: typography.size.xxl, fontWeight: '700' },
  heading: { fontSize: typography.size.xl, fontWeight: '600' },
  body: { fontSize: typography.size.md, fontWeight: '400' },
  caption: { fontSize: typography.size.sm, fontWeight: '400' },
  micro: { fontSize: typography.size.xs, fontWeight: '500' },
});

const weightMap: Record<FontWeight, '400' | '500' | '600' | '700'> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export function Typography({
  variant = 'body',
  muted = false,
  weight,
  color,
  style,
  ...rest
}: TypographyProps) {
  return (
    <RNText
      {...rest}
      style={[
        { color: color ?? (muted ? colors.textMuted : colors.text) },
        variantStyles[variant],
        weight ? { fontWeight: weightMap[weight] } : null,
        style,
      ]}
    />
  );
}
