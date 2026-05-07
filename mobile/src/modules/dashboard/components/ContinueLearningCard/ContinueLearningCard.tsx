import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Icon } from '../../../../shared/components/ui/Icon/Icon';
import { continueLearningCardStyles as styles } from './ContinueLearningCard.styles';
import { colors } from '../../../../app/theme';

export interface ContinueLearningCardProps {
  nextCardTitle: string;
  onPress: () => void;
}

export function ContinueLearningCard({ nextCardTitle, onPress }: ContinueLearningCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.root}>
      <View style={styles.text}>
        <Typography variant="caption" muted weight="semibold">CONTINUE LEARNING</Typography>
        <Typography variant="body" weight="semibold">{nextCardTitle}</Typography>
      </View>
      <Icon name="chevron-right" size={20} color={colors.textMuted} />
    </Pressable>
  );
}
