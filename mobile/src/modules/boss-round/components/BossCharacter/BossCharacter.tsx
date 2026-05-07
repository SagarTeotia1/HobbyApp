import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { bossCharacterStyles as styles } from './BossCharacter.styles';

export type BossReaction = 'idle' | 'hurt' | 'attack';

export interface BossCharacterProps {
  reaction: BossReaction;
}

const reactionEmoji: Record<BossReaction, string> = {
  idle:   '👾',
  hurt:   '😤',
  attack: '💥',
};

export function BossCharacter({ reaction }: BossCharacterProps) {
  return (
    <View style={styles.root}>
      {/* TODO: replace with Lottie boss character */}
      <Typography variant="display" style={styles.emoji}>
        {reactionEmoji[reaction]}
      </Typography>
    </View>
  );
}
