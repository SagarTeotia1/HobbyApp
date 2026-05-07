import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { SessionProgressBar } from '../SessionProgressBar/SessionProgressBar';
import { CardActions } from '../CardActions/CardActions';
import { sessionHeaderStyles as styles } from './SessionHeader.styles';

export interface SessionHeaderProps {
  hobbyName: string;
  cardIndex: number;
  totalCards: number;
  isBookmarked: boolean;
  onBookmark: () => void;
}

export function SessionHeader({
  hobbyName,
  cardIndex,
  totalCards,
  isBookmarked,
  onBookmark,
}: SessionHeaderProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted>{hobbyName}</Typography>
      <SessionProgressBar current={cardIndex} total={totalCards} />
      <CardActions isBookmarked={isBookmarked} onBookmark={onBookmark} />
    </View>
  );
}
