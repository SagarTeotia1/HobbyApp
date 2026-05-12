import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@app/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function AIChatInput({ value, onChangeText, onSubmit, placeholder, disabled }: Props) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Ask anything...'}
        placeholderTextColor={colors.textMuted}
        onSubmitEditing={onSubmit}
        returnKeyType="send"
        editable={!disabled}
        multiline={false}
      />
      <Pressable
        style={[styles.sendBtn, disabled && styles.sendBtnDisabled]}
        onPress={onSubmit}
        disabled={disabled}>
        <Text style={styles.sendIcon}>↑</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    paddingVertical: spacing.xs,
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendIcon: { fontSize: 16, color: colors.textInverse, fontWeight: '900' },
});
