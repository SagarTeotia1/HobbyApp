import React, { type PropsWithChildren } from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, radius } from '../../../app/theme';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function BottomSheet({ visible, onClose, children }: PropsWithChildren<BottomSheetProps>) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    minHeight: 240,
  },
});
