import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '@app/theme';
import type { AIRole } from '../../../../modules/ai/store/ai.store';

interface Props {
  role: AIRole;
  content: string;
  isError?: boolean;
}

export function AIChatBubble({ role, content, isError }: Props) {
  const isUser = role === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.assistant, isError && styles.error]}>
      <Text style={[styles.text, isUser ? styles.textUser : styles.textAssistant, isError && styles.textError]}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    maxWidth: '85%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: colors.bgElevated,
  },
  error: {
    backgroundColor: colors.danger + '22',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  text: { fontSize: 14, lineHeight: 20 },
  textUser: { color: colors.textInverse },
  textAssistant: { color: colors.text },
  textError: { color: colors.danger },
});
