import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { swipeHintsStyles as styles } from './SwipeHints.styles';

export function SwipeHints() {
  return (
    <View style={styles.row}>
      <Typography variant="caption" muted>← Review</Typography>
      <Typography variant="caption" muted>Got it →</Typography>
    </View>
  );
}
