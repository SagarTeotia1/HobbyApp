import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LearningCardView } from '../LearningCard/LearningCard';
import { colors, spacing } from '../../../../app/theme';
import type { LearningCard } from '../../../../shared/types/card.types';

export interface SwipeDeckProps {
  cards: LearningCard[];
  onSwipe?: (cardId: string, direction: 'left' | 'right' | 'down') => void;
}

export function SwipeDeck({ cards }: SwipeDeckProps) {
  const top = cards[0];

  return (
    <View style={styles.root}>
      {top ? <LearningCardView card={top} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
    justifyContent: 'center',
  },
});
