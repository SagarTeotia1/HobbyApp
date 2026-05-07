import React from 'react';
import { Pressable, Text, type ViewStyle } from 'react-native';
import { buttonStyles as styles } from './Button.styles';
import { haptics } from '../../../utils/haptics';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  hapticOnPress?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  disabled = false,
  onPress,
  style,
  hapticOnPress = true,
}: ButtonProps) {
  const handlePress = () => {
    if (hapticOnPress) haptics.light();
    onPress();
  };

  const labelStyle = [
    styles.label,
    variant === 'secondary' && styles.labelSecondary,
    variant === 'ghost' && styles.labelGhost,
    disabled && styles.labelDisabled,
  ];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={labelStyle}>{label}</Text>
    </Pressable>
  );
}
