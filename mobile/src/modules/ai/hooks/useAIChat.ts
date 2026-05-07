import { useCallback } from 'react';
import { useAIStore } from '../store/ai.store';
import { aiService } from '../services/ai.service';

export function useAIChat(hobbyId: string) {
  const isOpen = useAIStore((s) => s.isOpen);
  const messages = useAIStore((s) => s.messages);
  const isStreaming = useAIStore((s) => s.isStreaming);
  const open = useAIStore((s) => s.open);
  const close = useAIStore((s) => s.close);

  const send = useCallback(
    async (message: string) => {
      const store = useAIStore.getState();
      if (!message.trim() || store.isStreaming) return;

      const history = store.messages.map((m) => ({ role: m.role, content: m.content }));

      store.appendMessage({ id: `u-${Date.now()}`, role: 'user', content: message, createdAt: Date.now() });

      const assistantId = `a-${Date.now()}`;
      store.appendMessage({ id: assistantId, role: 'assistant', content: '', createdAt: Date.now() });
      store.setStreaming(true);

      try {
        const reply = await aiService.chat(message, hobbyId, history);
        useAIStore.getState().appendChunk(assistantId, reply);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[useAIChat] chat failed:', msg, err);
        useAIStore.getState().appendChunk(assistantId, `Error: ${msg}`);
      } finally {
        useAIStore.getState().setStreaming(false);
      }
    },
    [hobbyId],
  );

  return { isOpen, messages, isStreaming, open, close, send };
}
