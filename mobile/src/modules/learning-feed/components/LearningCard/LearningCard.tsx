import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { colors, spacing, radius } from '../../../../app/theme';
import type { LearningCard } from '../../../../shared/types/card.types';

export interface LearningCardProps {
  card: LearningCard;
}

export function LearningCardView({ card }: LearningCardProps) {
  const cardRecord = card as unknown as Record<string, unknown>;
  const rawContent = cardRecord.content;
  const fallbackText = Object.entries(cardRecord)
    .filter(([key, value]) => {
      if (typeof value !== 'string') return false;
      const excluded = new Set([
        'id',
        'hobbyId',
        'type',
        'difficulty',
        'conceptId',
        'generatedAt',
      ]);
      return !excluded.has(key) && value.trim().length > 0;
    })
    .map(([, value]) => String(value).trim())[0];
  const typeLabel = card.type ? card.type.toUpperCase() : 'CARD';
  const title = card.title?.trim() || 'Learning Card';
  const frontContent =
    card.frontContent?.trim() ||
    (typeof rawContent === 'string' ? rawContent.trim() : '') ||
    fallbackText ||
    'Content is being prepared. Swipe to continue.';

  return (
    <View style={styles.root}>
      <Typography variant="caption" color={colors.primary}>
        {typeLabel}
      </Typography>
      <Typography variant="heading" color={colors.text}>{title}</Typography>
      <Typography variant="body" color={colors.text}>{frontContent}</Typography>
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
    minHeight: 280,
    justifyContent: 'center',
  },
});
