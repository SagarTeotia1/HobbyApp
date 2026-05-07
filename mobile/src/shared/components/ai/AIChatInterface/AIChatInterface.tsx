import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../../ui/Typography/Typography';
import { AIChatInput } from './AIChatInput';
import { AIChatSuggestions } from './AIChatSuggestions';
import { AIChatMessageList } from './AIChatMessageList';
import { aiChatStyles } from './AIChatInterface.styles';
import { useAIChat } from '../../../../modules/ai/hooks/useAIChat';

export interface AIChatInterfaceProps {
  hobbyId: string;
  suggestions?: string[];
  collapsed?: boolean;
  placeholder?: string;
  onMessageSent?: (message: string) => void;
}

export function AIChatInterface({
  hobbyId,
  suggestions = [],
  collapsed = false,
  placeholder,
  onMessageSent,
}: AIChatInterfaceProps) {
  const [input, setInput] = useState('');
  const { isOpen, messages, isStreaming, open, send } = useAIChat(hobbyId);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    onMessageSent?.(trimmed);
    void send(trimmed);
  };

  const handleSuggestionPick = (text: string) => {
    setInput(text);
  };

  if (collapsed && !isOpen) {
    return (
      <Pressable accessibilityRole="button" onPress={open} style={aiChatStyles.collapsed}>
        <Typography variant="body" muted>
          {placeholder ?? 'Ask the AI tutor...'}
        </Typography>
      </Pressable>
    );
  }

  return (
    <View style={aiChatStyles.expanded}>
      <AIChatMessageList messages={messages} isStreaming={isStreaming} />
      <AIChatSuggestions suggestions={suggestions} onPick={handleSuggestionPick} />
      <AIChatInput
        value={input}
        onChangeText={setInput}
        onSubmit={handleSubmit}
        placeholder={placeholder}
        disabled={isStreaming}
      />
    </View>
  );
}
