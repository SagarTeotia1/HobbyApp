import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '../../../../shared/components/ui/Icon/Icon';
import { cardActionsStyles as styles } from './CardActions.styles';
import { colors } from '../../../../app/theme';

export interface CardActionsProps {
  isBookmarked: boolean;
  onBookmark: () => void;
}

export function CardActions({ isBookmarked, onBookmark }: CardActionsProps) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" onPress={onBookmark} style={styles.button}>
        <Icon
          name="bookmark"
          size={22}
          color={isBookmarked ? colors.primary : colors.textMuted}
        />
      </Pressable>
    </View>
  );
}
