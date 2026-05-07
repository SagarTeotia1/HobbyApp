import React from 'react';
import { Pressable, Text, type ViewStyle } from 'react-native';
import { buttonStyles } from './Button.styles';
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

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={[
        buttonStyles.base,
        variant === 'primary' && buttonStyles.primary,
        variant === 'secondary' && buttonStyles.secondary,
        variant === 'ghost' && buttonStyles.ghost,
        disabled && buttonStyles.disabled,
        style,
      ]}>
      <Text style={[buttonStyles.label, variant === 'ghost' && buttonStyles.labelGhost]}>
        {label}
      </Text>
    </Pressable>
  );
}
