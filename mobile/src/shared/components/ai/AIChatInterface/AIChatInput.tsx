import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { aiChatStyles } from './AIChatInterface.styles';
import { colors } from '../../../app/theme';
import { Icon } from '../../ui/Icon/Icon';

export interface AIChatInputProps {
  value: string;
  onChangeText: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function AIChatInput({
  value,
  onChangeText,
  onSubmit,
  placeholder,
  disabled = false,
}: AIChatInputProps) {
  return (
    <View style={aiChatStyles.inputRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder ?? 'Ask anything...'}
        placeholderTextColor={colors.textDim}
        style={aiChatStyles.input}
        returnKeyType="send"
        editable={!disabled}
      />
      <Pressable
        accessibilityRole="button"
        onPress={onSubmit}
        disabled={disabled || value.trim().length === 0}
        style={aiChatStyles.sendButton}>
        <Icon name="send" size={16} color={colors.text} />
      </Pressable>
    </View>
  );
}
