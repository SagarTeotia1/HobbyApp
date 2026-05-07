import { useCallback } from 'react';
import { useAIStore } from '../store/ai.store';

export function useAIChat() {
  const isOpen = useAIStore((s) => s.isOpen);
  const messages = useAIStore((s) => s.messages);
  const isStreaming = useAIStore((s) => s.isStreaming);
  const open = useAIStore((s) => s.open);
  const close = useAIStore((s) => s.close);

  const send = useCallback(async (_message: string) => {
    // TODO: hit /ai/chat SSE stream and append chunks via appendChunk
  }, []);

  return { isOpen, messages, isStreaming, open, close, send };
}
