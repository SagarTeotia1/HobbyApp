import React from 'react';
import { TextInput, View } from 'react-native';
import { aiChatStyles } from './AIChatInterface.styles';
import { colors } from '../../../../app/theme';

export interface AIChatInputProps {
  value: string;
  onChangeText: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function AIChatInput({ value, onChangeText, onSubmit, placeholder }: AIChatInputProps) {
  return (
    <View style={aiChatStyles.collapsed}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder ?? 'Ask anything...'}
        placeholderTextColor={colors.textDim}
        style={aiChatStyles.input}
        returnKeyType="send"
      />
    </View>
  );
}
