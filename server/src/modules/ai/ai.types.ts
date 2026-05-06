export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIChatRequest {
  message: string;
  hobbyId: string;
  history: AIChatMessage[];
}

export interface AIHobbySuggestion {
  slug: string;
  name: string;
  reason: string;
}
