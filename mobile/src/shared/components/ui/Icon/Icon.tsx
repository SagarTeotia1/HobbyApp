import React from 'react';
import { type ViewStyle } from 'react-native';
import Svg, { Path, type SvgProps } from 'react-native-svg';
import { colors } from '../../../../app/theme';

export type IconName =
  | 'check'
  | 'close'
  | 'bookmark'
  | 'send'
  | 'chevron-right'
  | 'star'
  | 'flame'
  | 'lightning'
  | 'crown';

export interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const paths: Record<IconName, string> = {
  check: 'M20 6L9 17l-5-5',
  close: 'M18 6L6 18M6 6l12 12',
  bookmark: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  'chevron-right': 'M9 18l6-6-6-6',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  flame: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
  lightning: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  crown: 'M2 20h20M5 20V10l7-7 7 7v10',
};

export function Icon({ name, size = 24, color = colors.text, style, ...rest }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} {...rest}>
      <Path d={paths[name]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
