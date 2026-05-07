import React from 'react';
import { View } from 'react-native';
import { Typography } from '../../ui/Typography/Typography';
import { aiChatStyles } from './AIChatInterface.styles';
import type { AIRole } from '../../../../modules/ai/store/ai.store';

export interface AIChatBubbleProps {
  role: AIRole;
  content: string;
}

export function AIChatBubble({ role, content }: AIChatBubbleProps) {
  return (
    <View
      style={[
        aiChatStyles.bubble,
        role === 'user' ? aiChatStyles.bubbleUser : aiChatStyles.bubbleAssistant,
      ]}>
      <Typography variant="body">{content}</Typography>
    </View>
  );
}
