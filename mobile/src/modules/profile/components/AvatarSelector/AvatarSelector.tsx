import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { avatarSelectorStyles as styles } from './AvatarSelector.styles';

const AVATARS = ['🧑', '👩', '🧔', '👱', '🧕', '🎭', '🤖', '👾', '🦊', '🐉'];

export interface AvatarSelectorProps {
  selected: string;
  onSelect: (avatar: string) => void;
}

export function AvatarSelector({ selected, onSelect }: AvatarSelectorProps) {
  return (
    <View style={styles.root}>
      <Typography variant="caption" muted weight="semibold">CHOOSE AVATAR</Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {AVATARS.map((a) => (
            <Pressable
              key={a}
              accessibilityRole="button"
              onPress={() => onSelect(a)}
              style={[styles.avatar, selected === a && styles.selected]}>
              <Typography variant="title">{a}</Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
