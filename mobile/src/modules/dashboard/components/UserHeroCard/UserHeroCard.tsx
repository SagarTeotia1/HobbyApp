import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { userHeroCardStyles as styles } from './UserHeroCard.styles';
import { colors } from '../../../../app/theme';
import { GAME_CONFIG } from '../../../../shared/constants/gameConfig';
import { formatStreak } from '../../../../shared/utils/formatStreak';
import type { AnonymousUser } from '../../../../shared/types/user.types';

export interface UserHeroCardProps {
  user: AnonymousUser;
  hobbyName: string;
}

export function UserHeroCard({ user, hobbyName }: UserHeroCardProps) {
  const progressToNext = (user.xp % GAME_CONFIG.LEVELS.XP_PER_LEVEL) / GAME_CONFIG.LEVELS.XP_PER_LEVEL;

  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <View>
          <Typography variant="heading" weight="bold">Level {user.level} · {hobbyName}</Typography>
          <Typography variant="caption" muted>{user.xp.toLocaleString()} XP total</Typography>
        </View>
        <Typography variant="body">{formatStreak(user.streak)} 🔥</Typography>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progressToNext * 100}%` as `${number}%` }]} />
      </View>
      <Typography variant="micro" muted style={{ textAlign: 'right' }}>
        {Math.round(progressToNext * 100)}% to Level {user.level + 1}
      </Typography>
    </View>
  );
}
