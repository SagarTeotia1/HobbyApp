import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Chip } from '../../../../shared/components/ui/Chip/Chip';
import { learningCardStyles as styles } from './LearningCard.styles';
import type { LearningCard } from '../../../../shared/types/card.types';

export interface CardBackProps {
  card: LearningCard;
}

export function CardBack({ card }: CardBackProps) {
  return (
    <View style={styles.face}>
      <Typography variant="caption" muted>DEEPER DIVE</Typography>
      <View style={styles.divider} />
      <Typography variant="body">
        {card.simplifiedContent ?? card.backContent}
      </Typography>
      <View style={styles.tagsRow}>
        {card.tags.map((t) => (
          <Chip key={t} label={t} />
        ))}
      </View>
    </View>
  );
}
