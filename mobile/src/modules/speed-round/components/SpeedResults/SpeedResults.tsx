import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../../shared/components/ui/Button/Button';
import { speedResultsStyles as styles } from './SpeedResults.styles';
import type { SpeedRoundResult } from '../../types/speedRound.types';

export interface SpeedResultsProps {
  result: SpeedRoundResult;
  onContinue: () => void;
}

export function SpeedResults({ result, onContinue }: SpeedResultsProps) {
  return (
    <View style={styles.root}>
      <Typography variant="display">⚡</Typography>
      <Typography variant="title">{result.correctCount} correct!</Typography>
      <Typography variant="heading" style={styles.xp}>
        +{result.xpEarned} XP
      </Typography>
      <Button label="Continue" onPress={onContinue} />
    </View>
  );
}
