import React, { useMemo, useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import { LearningCardView } from '../LearningCard/LearningCard';
import { colors, spacing } from '../../../../app/theme';
import type { LearningCard } from '../../../../shared/types/card.types';

export interface SwipeDeckProps {
  cards: LearningCard[];
  onSwipe?: (cardId: string, direction: 'left' | 'right' | 'down') => void;
}

const SWIPE_THRESHOLD = 80;

export function SwipeDeck({ cards, onSwipe }: SwipeDeckProps) {
  const top = cards[0];
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: translate.x, dy: translate.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_evt, gesture) => {
          let direction: 'left' | 'right' | 'down' | null = null;
          if (gesture.dx > SWIPE_THRESHOLD) direction = 'right';
          else if (gesture.dx < -SWIPE_THRESHOLD) direction = 'left';
          else if (gesture.dy > SWIPE_THRESHOLD) direction = 'down';

          if (direction && top) {
            onSwipe?.(top.id, direction);
            Animated.timing(translate, {
              toValue:
                direction === 'right'
                  ? { x: 500, y: gesture.dy }
                  : direction === 'left'
                    ? { x: -500, y: gesture.dy }
                    : { x: 0, y: 500 },
              duration: 180,
              useNativeDriver: true,
            }).start(() => translate.setValue({ x: 0, y: 0 }));
            return;
          }

          Animated.spring(translate, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        },
      }),
    [onSwipe, top, translate],
  );

  return (
    <View style={styles.root}>
      {top ? (
        <Animated.View
          {...panResponder.panHandlers}
          style={{ transform: [{ translateX: translate.x }, { translateY: translate.y }] }}>
          <LearningCardView card={top} />
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
    justifyContent: 'center',
  },
});
