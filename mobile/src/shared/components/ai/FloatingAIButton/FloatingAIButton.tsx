import React, { useMemo, useRef, useState, useCallback } from 'react';
import { Pressable, Text, View, Modal, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import { styles } from './FloatingAIButton.styles';
import { AIChatInterface } from '../AIChatInterface/AIChatInterface';

interface Props {
  hobbyId: string;
  context?: string;
  bottomOffset?: number;
}

const FAB_SIZE = 56;
const FAB_PADDING = 12;
const FAB_DRAG_THRESHOLD = 4;

export function FloatingAIButton({ hobbyId, bottomOffset = 0 }: Props) {
  const [open, setOpen] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const bounds = useMemo(() => {
    const minX = FAB_PADDING;
    const minY = FAB_PADDING;
    const maxX = screenWidth - FAB_SIZE - FAB_PADDING;
    const maxY = screenHeight - FAB_SIZE - FAB_PADDING - bottomOffset;
    return { minX, minY, maxX: Math.max(minX, maxX), maxY: Math.max(minY, maxY) };
  }, [screenWidth, screenHeight, bottomOffset]);

  const initialX = bounds.maxX;
  const initialY = Math.min(bounds.maxY, screenHeight - FAB_SIZE - 32 - bottomOffset);

  const position = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;
  const dragStart = useRef({ x: initialX, y: initialY });
  const currentPos = useRef({ x: initialX, y: initialY });

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const panValue = useRef({ x: initialX, y: initialY });

  React.useEffect(() => {
    const id = position.addListener((value) => {
      panValue.current = value;
    });
    return () => position.removeListener(id);
  }, [position]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_, gesture) =>
          Math.abs(gesture.dx) > FAB_DRAG_THRESHOLD || Math.abs(gesture.dy) > FAB_DRAG_THRESHOLD,
        onPanResponderGrant: () => {
          position.setOffset({
            x: panValue.current.x,
            y: panValue.current.y,
          });
          position.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
          [null, { dx: position.x, dy: position.y }],
          { useNativeDriver: false },
        ),
        onPanResponderRelease: () => {
          position.flattenOffset();
          
          const currentX = panValue.current.x;
          const currentY = panValue.current.y;

          let clampedX = Math.min(bounds.maxX, Math.max(bounds.minX, currentX));
          let clampedY = Math.min(bounds.maxY, Math.max(bounds.minY, currentY));

          if (currentX !== clampedX || currentY !== clampedY) {
            Animated.spring(position, {
              toValue: { x: clampedX, y: clampedY },
              useNativeDriver: false,
              friction: 5,
            }).start();
          }
        },
      }),
    [bounds, position],
  );

  const suggestions = [
    'Explain this concept simply',
    `Tips for learning ${hobbyId.replace(/-/g, ' ')}`,
    'What should I study next?',
    'Quiz me on this topic',
  ];

  return (
    <>
      <Animated.View
        style={[
          styles.fabContainer,
          { transform: [{ translateX: position.x }, { translateY: position.y }] },
        ]}
        {...panResponder.panHandlers}>
        <Pressable
          style={({ pressed }) => [styles.fabButton, pressed && styles.fabPressed]}
          onPress={handleOpen}>
          <Text style={styles.fabEmoji}>🤖</Text>
        </Pressable>
      </Animated.View>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={handleClose}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <AIChatInterface
            hobbyId={hobbyId}
            collapsed={false}
            suggestions={suggestions}
            placeholder="Ask your AI tutor anything..."
          />
        </View>
      </Modal>
    </>
  );
}
