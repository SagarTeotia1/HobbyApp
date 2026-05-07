import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { planGeneratingStyles as styles } from './PlanGeneratingAnimation.styles';

export interface PlanGeneratingAnimationProps {
  hobbyName: string;
}

export function PlanGeneratingAnimation({ hobbyName }: PlanGeneratingAnimationProps) {
  return (
    <View style={styles.root}>
      {/* TODO: replace with Lottie animation */}
      <Typography variant="display">🧠</Typography>
      <Typography variant="heading">Building your {hobbyName} roadmap...</Typography>
      <Typography variant="body" muted>
        AI is crafting a personalized plan just for you.
      </Typography>
    </View>
  );
}
