import React, { useMemo, useRef, useState, useCallback } from 'react';
import { Pressable, Text, View, Modal, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import { styles } from './FloatingAIButton.styles';
import { AIChatInterface } from '../AIChatInterface/AIChatInterface';

interface Props {
  hobbyId: string;
  context?: string;
  bottomOffset?: number;
}

export function FloatingAIButton({ hobbyId, bottomOffset = 0 }: Props) {
  const [open, setOpen] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const bounds = useMemo(() => {
    const minX = 12;
    const minY = 12;
    const maxX = screenWidth - 56 - 12;
    const maxY = screenHeight - 56 - 12 - bottomOffset;
    return { minX, minY, maxX: Math.max(minX, maxX), maxY: Math.max(minY, maxY) };
  }, [screenWidth, screenHeight, bottomOffset]);

  const initialX = bounds.maxX;
  const initialY = Math.min(bounds.maxY, screenHeight - 56 - 32 - bottomOffset);

  const position = useRef(new Animated.ValueXY({ x: initialX, y: initialY })).current;
  const dragStart = useRef({ x: initialX, y: initialY });

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,
        onPanResponderGrant: () => {
          dragStart.current = {
            x: position.x.__getValue(),
            y: position.y.__getValue(),
          };
        },
        onPanResponderMove: (_, gesture) => {
          const nextX = Math.min(bounds.maxX, Math.max(bounds.minX, dragStart.current.x + gesture.dx));
          const nextY = Math.min(bounds.maxY, Math.max(bounds.minY, dragStart.current.y + gesture.dy));
          position.setValue({ x: nextX, y: nextY });
        },
        onPanResponderRelease: () => {
          const clampedX = Math.min(bounds.maxX, Math.max(bounds.minX, position.x.__getValue()));
          const clampedY = Math.min(bounds.maxY, Math.max(bounds.minY, position.y.__getValue()));
          position.setValue({ x: clampedX, y: clampedY });
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
