import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { learningJourneyCardStyles as styles } from './LearningJourneyCard.styles';
import { colors } from '../../../../app/theme';

export interface RoadmapStageItem {
  id: string;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface LearningJourneyCardProps {
  stages: RoadmapStageItem[];
}

export function LearningJourneyCard({ stages }: LearningJourneyCardProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted weight="semibold">LEARNING JOURNEY</Typography>
      {stages.map((stage) => (
        <View key={stage.id} style={styles.stageRow}>
          <Typography variant="body">
            {stage.isCompleted ? '✅' : stage.isCurrent ? '🔵' : '⚪'}
          </Typography>
          <Typography
            variant="body"
            weight={stage.isCurrent ? 'semibold' : 'regular'}
            color={stage.isCurrent ? colors.text : colors.textMuted}>
            {stage.title}
          </Typography>
          {stage.isCurrent ? (
            <Typography variant="micro" muted>← you are here</Typography>
          ) : null}
        </View>
      ))}
    </View>
  );
}
