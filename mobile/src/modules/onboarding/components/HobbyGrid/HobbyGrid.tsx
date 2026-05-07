import React from 'react';
import { View } from 'react-native';
import { HobbyChip } from '../HobbyChip/HobbyChip';
import { hobbyGridStyles as styles } from './HobbyGrid.styles';

export interface HobbyOption {
  id: string;
  name: string;
  emoji: string;
}

export interface HobbyGridProps {
  hobbies: HobbyOption[];
  selectedId: string | null;
  onSelect: (hobby: HobbyOption) => void;
}

export function HobbyGrid({ hobbies, selectedId, onSelect }: HobbyGridProps) {
  return (
    <View style={styles.grid}>
      {hobbies.map((h) => (
        <HobbyChip
          key={h.id}
          label={h.name}
          emoji={h.emoji}
          selected={selectedId === h.id}
          onPress={() => onSelect(h)}
        />
      ))}
    </View>
  );
}
