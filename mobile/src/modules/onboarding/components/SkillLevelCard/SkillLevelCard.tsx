import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { skillLevelCardStyles as styles } from './SkillLevelCard.styles';
import type { DifficultyLevel } from '../../../../shared/types/card.types';

export interface SkillLevelCardProps {
  level: DifficultyLevel;
  selected: boolean;
  onPress: () => void;
}

const META: Record<DifficultyLevel, {
  emoji: string;
  label: string;
  description: string;
  traits: string[];
  accentBg: string;
}> = {
  beginner: {
    emoji: '🌱',
    label: 'Beginner',
    description: 'Just starting out',
    traits: ['Core concepts first', 'Simple language', 'Lots of examples'],
    accentBg: '#BBF7D0',
  },
  intermediate: {
    emoji: '🔥',
    label: 'Mid-level',
    description: 'Know the basics',
    traits: ['Skip the obvious', 'Practical techniques', 'Faster progression'],
    accentBg: '#FED7AA',
  },
  advanced: {
    emoji: '⚡',
    label: 'Advanced',
    description: 'Going deep',
    traits: ['Edge cases & nuance', 'Expert-level detail', 'Challenge mode on'],
    accentBg: '#C4B5FD',
  },
};

export function SkillLevelCard({ level, selected, onPress }: SkillLevelCardProps) {
  const { emoji, label, description, traits, accentBg } = META[level];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && { ...styles.cardSelected, backgroundColor: accentBg },
        (pressed && !selected) && styles.cardPressed,
        (pressed && selected) && styles.cardSelectedPressed,
      ]}>

      {/* Left: content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>{emoji}</Text>
          <View style={styles.titleBlock}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.traits}>
          {traits.map((trait) => (
            <View key={trait} style={[styles.traitChip, selected && styles.traitChipSelected]}>
              <Text style={styles.traitText}>{trait}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Right: selection indicator */}
      <View style={[styles.indicator, selected && styles.indicatorSelected]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>

    </Pressable>
  );
}
