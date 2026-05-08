import { groqClient } from '../../infrastructure/ai/groq.client';
import { ApiError } from '../../shared/utils/ApiError';
import type { TopicDetailResponse, LearnGraphResponse } from './roadmap.types';
import type { TopicDetailInput, LearnGraphInput } from './roadmap.validator';

function extractJSON(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const first = text.indexOf('{');
  const last  = text.lastIndexOf('}');
  if (first !== -1 && last !== -1) return text.slice(first, last + 1);
  return text.trim();
}

export const roadmapService = {
  async getTopicDetail(input: TopicDetailInput): Promise<TopicDetailResponse> {
    const system = `You are an expert educator. Generate detailed, engaging learning content.
Return ONLY valid JSON with no markdown fences, no explanation.`;

    const user = `Generate detailed content for topic "${input.topicName}" in "${input.hobbyName}".

Return exactly this JSON:
{
  "topicName": "${input.topicName}",
  "hobbyName": "${input.hobbyName}",
  "overview": "2-3 sentence overview",
  "sections": [
    { "title": "Core Concept", "content": "3-4 sentence explanation" },
    { "title": "How It Works", "content": "3-4 sentence explanation" },
    { "title": "Common Mistakes", "content": "3-4 sentence explanation" },
    { "title": "Real-World Use", "content": "3-4 sentence explanation" }
  ],
  "keyTakeaways": ["takeaway 1", "takeaway 2", "takeaway 3", "takeaway 4"],
  "practicePrompt": "A specific hands-on exercise"
}`;

    const raw = await groqClient.generateText(system, [], user, 2048);
    const cleaned = extractJSON(raw);

    try {
      return JSON.parse(cleaned) as TopicDetailResponse;
    } catch {
      throw new ApiError(500, 'AI_PARSE_ERROR', 'Failed to parse topic detail', { raw });
    }
  },

  async getLearnGraph(input: LearnGraphInput): Promise<LearnGraphResponse> {
    const system = `You are a knowledge graph expert. Create a hierarchical learning graph.
Return ONLY valid JSON with no markdown fences, no explanation, no trailing commas.`;

    const user = `Create a knowledge graph for "${input.topicName}" in "${input.hobbyName}".
Include 8-12 nodes showing how concepts connect.

Return exactly this JSON:
{
  "title": "Knowledge Graph: ${input.topicName}",
  "nodes": [
    { "id": "1", "label": "Short Label", "type": "root", "description": "What this topic is about" },
    { "id": "2", "label": "Short Label", "type": "concept", "description": "Core concept explanation" },
    { "id": "3", "label": "Short Label", "type": "concept", "description": "Core concept explanation" },
    { "id": "4", "label": "Short Label", "type": "detail", "description": "Specific detail" },
    { "id": "5", "label": "Short Label", "type": "detail", "description": "Specific detail" },
    { "id": "6", "label": "Short Label", "type": "detail", "description": "Specific detail" },
    { "id": "7", "label": "Short Label", "type": "example", "description": "Practical example" },
    { "id": "8", "label": "Short Label", "type": "example", "description": "Practical example" }
  ],
  "edges": [
    { "from": "1", "to": "2", "label": "includes" },
    { "from": "1", "to": "3", "label": "includes" },
    { "from": "2", "to": "4", "label": "uses" },
    { "from": "2", "to": "5", "label": "uses" },
    { "from": "3", "to": "6", "label": "requires" },
    { "from": "4", "to": "7", "label": "enables" },
    { "from": "5", "to": "8", "label": "enables" }
  ]
}

Node types: "root" (1 only), "concept", "detail", "example".
Labels must be 2-4 words max.`;

    const raw = await groqClient.generateText(system, [], user, 1536);
    const cleaned = extractJSON(raw);

    try {
      return JSON.parse(cleaned) as LearnGraphResponse;
    } catch {
      throw new ApiError(500, 'AI_PARSE_ERROR', 'Failed to parse learn graph', { raw });
    }
  },
};
