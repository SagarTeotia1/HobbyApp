import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { aiChatStyles } from './AIChatInterface.styles';
import { useAIStore } from '../../store/ai.store';

export function AIChatInterface() {
  const isOpen = useAIStore((s) => s.isOpen);
  const open = useAIStore((s) => s.open);

  if (isOpen) {
    return (
      <View style={aiChatStyles.expanded}>
        <Typography variant="caption" muted>
          AI chat (placeholder)
        </Typography>
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="button" onPress={open} style={aiChatStyles.collapsed}>
      <Typography variant="body" muted>
        Ask the AI tutor...
      </Typography>
    </Pressable>
  );
}
