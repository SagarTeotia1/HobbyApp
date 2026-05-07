import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { colors, spacing, radius } from '../../../../app/theme';
import type { LearningCard } from '../../../../shared/types/card.types';

export interface LearningCardProps {
  card: LearningCard;
}

export function LearningCardView({ card }: LearningCardProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted>
        {card.type.toUpperCase()}
      </Typography>
      <Typography variant="heading">{card.title}</Typography>
      <Typography variant="body">{card.frontContent}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.xl,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
