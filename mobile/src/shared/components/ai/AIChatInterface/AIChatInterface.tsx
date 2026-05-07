import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../../ui/Typography/Typography';
import { AIChatInput } from './AIChatInput';
import { AIChatSuggestions } from './AIChatSuggestions';
import { AIChatMessageList } from './AIChatMessageList';
import { aiChatStyles } from './AIChatInterface.styles';
import { useAIStore } from '../../../../modules/ai/store/ai.store';

export interface AIChatInterfaceProps {
  suggestions?: string[];
  collapsed?: boolean;
  placeholder?: string;
}

export function AIChatInterface({
  suggestions = [],
  collapsed = false,
  placeholder,
}: AIChatInterfaceProps) {
  const [input, setInput] = useState('');
  const isOpen = useAIStore((s) => s.isOpen);
  const isStreaming = useAIStore((s) => s.isStreaming);
  const messages = useAIStore((s) => s.messages);
  const open = useAIStore((s) => s.open);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setInput('');
    // AI send handled by useAIChat hook in parent
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
