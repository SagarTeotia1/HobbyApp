import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { hobbyChipStyles as styles } from './HobbyChip.styles';
import { colors } from '../../../../app/theme';

export type HobbyChipVariant = 'chip' | 'card';

export interface HobbyChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress: () => void;
  variant?: HobbyChipVariant;
  /** Background color for unselected card tiles */
  tileBg?: string;
}

export function HobbyChip({
  label,
  emoji,
  selected = false,
  onPress,
  variant = 'chip',
  tileBg,
}: HobbyChipProps) {
  if (variant === 'card') {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: selected ? undefined : (tileBg ?? colors.primaryLight) },
          selected && styles.cardSelected,
          !selected && pressed && styles.cardPressed,
        ]}>
        {selected && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        )}
        <Text style={styles.cardEmoji}>{emoji}</Text>
        <Text style={[styles.cardLabel, selected && styles.cardLabelSelected]}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        !selected && pressed && styles.chipPressed,
      ]}>
      {emoji ? <Text style={styles.chipEmoji}>{emoji}</Text> : null}
      <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}
