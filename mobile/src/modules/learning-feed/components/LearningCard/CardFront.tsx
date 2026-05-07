import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Badge } from '../../../../shared/components/ui/Badge/Badge';
import { learningCardStyles as styles } from './LearningCard.styles';
import type { LearningCard } from '../../../../shared/types/card.types';

export interface CardFrontProps {
  card: LearningCard;
}

export function CardFront({ card }: CardFrontProps) {
  return (
    <View style={styles.face}>
      <Badge label={card.type.replace('_', ' ').toUpperCase()} tone="primary" style={styles.typeBadge} />
      <Typography variant="heading">{card.title}</Typography>
      <Typography variant="body">{card.frontContent}</Typography>
      <View style={styles.flipHint}>
        <Typography variant="caption" muted>── tap to flip ──</Typography>
      </View>
    </View>
  );
}
