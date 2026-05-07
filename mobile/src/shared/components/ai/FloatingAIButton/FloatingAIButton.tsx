import React, { useState, useCallback } from 'react';
import { Pressable, Text, View, Modal, TouchableOpacity } from 'react-native';
import { styles } from './FloatingAIButton.styles';
import { AIChatInterface } from '../AIChatInterface/AIChatInterface';

interface Props {
  hobbyId: string;
  context?: string;
}

export function FloatingAIButton({ hobbyId }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const suggestions = [
    'Explain this concept simply',
    `Tips for learning ${hobbyId.replace(/-/g, ' ')}`,
    'What should I study next?',
    'Quiz me on this topic',
  ];

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={handleOpen}>
        <Text style={styles.fabEmoji}>🤖</Text>
      </Pressable>

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
