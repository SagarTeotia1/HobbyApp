import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Icon } from '../../../../shared/components/ui/Icon/Icon';
import { flashcardPreviewCardStyles as styles } from './FlashcardPreviewCard.styles';
import { colors } from '../../../../app/theme';

export interface FlashcardPreviewCardProps {
  title: string;
  conceptLabel: string;
  onPress: () => void;
}

export function FlashcardPreviewCard({ title, conceptLabel, onPress }: FlashcardPreviewCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.root}>
      <View style={styles.content}>
        <Typography variant="caption" muted weight="semibold">NEXT CARD</Typography>
        <Typography variant="body" weight="semibold">{title}</Typography>
        <Typography variant="caption" muted>{conceptLabel}</Typography>
      </View>
      <Icon name="chevron-right" size={20} color={colors.textMuted} />
    </Pressable>
  );
}
