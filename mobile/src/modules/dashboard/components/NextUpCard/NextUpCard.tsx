import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './NextUpCard.styles';

interface Props {
  topicName: string;
  topicIndex: number;
  onPress: () => void;
}

export function NextUpCard({ topicName, topicIndex, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.badge}>NEXT UP</Text>
        <Text style={styles.topicIndex}>Topic {topicIndex + 1}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{topicName}</Text>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={onPress}>
        <Text style={styles.btnText}>JUMP IN ➔</Text>
      </Pressable>
    </View>
  );
}
