import React from 'react';
import { Pressable } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { skillLevelCardStyles as styles } from './SkillLevelCard.styles';
import type { DifficultyLevel } from '../../../../shared/types/card.types';

export interface SkillLevelCardProps {
  level: DifficultyLevel;
  selected: boolean;
  onPress: () => void;
}

const meta: Record<DifficultyLevel, { emoji: string; label: string; description: string }> = {
  beginner:     { emoji: '🌱', label: 'Beginner',     description: 'Just starting out' },
  intermediate: { emoji: '🔥', label: 'Mid-level',    description: 'Know the basics' },
  advanced:     { emoji: '⚡', label: 'Advanced',     description: 'Going deep' },
};

export function SkillLevelCard({ level, selected, onPress }: SkillLevelCardProps) {
  const { emoji, label, description } = meta[level];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.base, selected && styles.selected]}>
      <Typography variant="title">{emoji}</Typography>
      <Typography variant="body" weight="semibold">{label}</Typography>
      <Typography variant="caption" muted>{description}</Typography>
    </Pressable>
  );
}
