import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { Button } from '../../../../shared/components/ui/Button/Button';
import { bossResultsStyles as styles } from './BossResults.styles';
import { colors } from '../../../../app/theme';
import type { BossRoundResult } from '../../types/bossRound.types';

export interface BossResultsProps {
  result: BossRoundResult;
  onContinue: () => void;
}

export function BossResults({ result, onContinue }: BossResultsProps) {
  const won = result.netXP >= 0;

  return (
    <View style={styles.root}>
      <Typography variant="display">{won ? '👑' : '💀'}</Typography>
      <Typography variant="title">{won ? 'Boss Defeated!' : 'Try Again Tomorrow'}</Typography>
      <Typography
        variant="heading"
        style={{ color: won ? colors.success : colors.danger }}>
        {result.netXP >= 0 ? '+' : ''}{result.netXP} XP
      </Typography>
      <Typography variant="body" muted>
        {result.correctCount} correct · {result.wrongCount} wrong · max combo x{result.maxCombo}
      </Typography>
      <Button label={won ? 'Keep Going' : 'See Progress'} onPress={onContinue} />
    </View>
  );
}
