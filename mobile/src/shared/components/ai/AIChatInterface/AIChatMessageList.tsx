import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { AIChatBubble } from './AIChatBubble';
import { AIChatTypingIndicator } from './AIChatTypingIndicator';
import { aiChatStyles } from './AIChatInterface.styles';
import type { AIMessage } from '../../../../modules/ai/store/ai.store';

export interface AIChatMessageListProps {
  messages: AIMessage[];
  isStreaming: boolean;
}

export function AIChatMessageList({ messages, isStreaming }: AIChatMessageListProps) {
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      ref.current?.scrollToEnd({ animated: true });
    }
  }, [messages.length, isStreaming]);

  return (
    <FlatList
      ref={ref}
      data={messages}
      keyExtractor={(m) => m.id}
      style={aiChatStyles.messageList}
      contentContainerStyle={aiChatStyles.messageListContent}
      renderItem={({ item }) => <AIChatBubble role={item.role} content={item.content} />}
      ListFooterComponent={isStreaming ? <AIChatTypingIndicator /> : null}
    />
  );
}
