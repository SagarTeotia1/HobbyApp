export interface AIChatContext {
  hobbyId: string;
  recentCardIds: string[];
  weakConcepts: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export const buildAIContextPayload = (ctx: AIChatContext) => ({
  hobbyId: ctx.hobbyId,
  recentCardIds: ctx.recentCardIds.slice(-10),
  weakConcepts: ctx.weakConcepts.slice(-10),
  skillLevel: ctx.skillLevel,
});
