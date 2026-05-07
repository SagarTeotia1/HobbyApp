import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { comboCounterStyles as styles } from './ComboCounter.styles';
import { GAME_CONFIG } from '../../../../shared/constants/gameConfig';

export interface ComboCounterProps {
  count: number;
}

export function ComboCounter({ count }: ComboCounterProps) {
  if (count < GAME_CONFIG.BOSS_ROUND.COMBO_THRESHOLD) return null;

  const multiplier = GAME_CONFIG.BOSS_ROUND.COMBO_MULTIPLIER;

  return (
    <View style={styles.banner}>
      <Typography variant="heading" weight="bold">
        🔥 COMBO x{multiplier}!
      </Typography>
    </View>
  );
}
