import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { AIChatBubble } from './AIChatBubble';
import { AIChatTypingIndicator } from './AIChatTypingIndicator';
import { aiChatStyles } from './AIChatInterface.styles';
import type { AIMessage } from '../../../../modules/ai/store/ai.store';

export interface AIChatMessageListProps {
  messages: AIMessage[];
  isStreaming: boolean;
}

export function AIChatMessageList({ messages, isStreaming }: AIChatMessageListProps) {
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    if (messages.length > 0) {
      ref.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length, isStreaming]);

  return (
    <ScrollView
      ref={ref}
      style={aiChatStyles.messageList}
      contentContainerStyle={aiChatStyles.messageListContent}
      showsVerticalScrollIndicator={false}>
      {messages.map((m) => (
        <AIChatBubble key={m.id} role={m.role} content={m.content} />
      ))}
      {isStreaming ? <AIChatTypingIndicator /> : null}
    </ScrollView>
  );
}
