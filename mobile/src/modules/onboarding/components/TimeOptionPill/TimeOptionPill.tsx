import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { timeOptionPillStyles as styles } from './TimeOptionPill.styles';

export type TimeOption = 5 | 10 | 15 | 30 | 60;

export interface TimeOptionPillProps {
  minutes: TimeOption;
  selected: boolean;
  onPress: () => void;
}

const META: Record<TimeOption, { label: string; sub: string; emoji: string }> = {
  5:  { label: '5 min',   sub: 'Quick win',    emoji: '⚡' },
  10: { label: '10 min',  sub: 'Steady pace',  emoji: '🔥' },
  15: { label: '15 min',  sub: 'Good habit',   emoji: '💪' },
  30: { label: '30 min',  sub: 'Deep dive',    emoji: '🧠' },
  60: { label: '1 hour',  sub: 'Serious mode', emoji: '🚀' },
};

export function TimeOptionPill({ minutes, selected, onPress }: TimeOptionPillProps) {
  const { label, sub, emoji } = META[minutes];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        (pressed && !selected) && styles.cardPressed,
        (pressed && selected) && styles.cardSelectedPressed,
      ]}>
      <View style={styles.left}>
        <Text style={[styles.timeLabel, selected && styles.timeLabelSelected]}>{label}</Text>
        <Text style={[styles.subLabel, selected && styles.subLabelSelected]}>{sub}</Text>
      </View>
      <View style={[styles.badge, selected && styles.badgeSelected]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    </Pressable>
  );
}
