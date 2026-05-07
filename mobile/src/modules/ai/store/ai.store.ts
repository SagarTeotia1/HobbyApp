import { create } from 'zustand';

export type AIRole = 'user' | 'assistant';

export interface AIMessage {
  id: string;
  role: AIRole;
  content: string;
  createdAt: number;
}

interface AIState {
  isOpen: boolean;
  isStreaming: boolean;
  messages: AIMessage[];

  open: () => void;
  close: () => void;
  toggle: () => void;
  setStreaming: (v: boolean) => void;
  appendMessage: (m: AIMessage) => void;
  appendChunk: (id: string, chunk: string) => void;
  clear: () => void;
}

export const useAIStore = create<AIState>((set, get) => ({
  isOpen: false,
  isStreaming: false,
  messages: [],

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
  setStreaming: (v) => set({ isStreaming: v }),
  appendMessage: (m) => set({ messages: [...get().messages, m] }),
  appendChunk: (id, chunk) =>
    set({
      messages: get().messages.map((m) =>
        m.id === id ? { ...m, content: m.content + chunk } : m,
      ),
    }),
  clear: () => set({ messages: [] }),
}));
