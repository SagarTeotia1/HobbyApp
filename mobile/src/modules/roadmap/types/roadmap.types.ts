export interface RoadmapStage {
  order: number;
  conceptId: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  isMastered: boolean;
}

export interface RoadmapData {
  hobbyId: string;
  skillLevel: string;
  stages: RoadmapStage[];
}

export interface TopicProgress {
  topicId: string;
  completed: boolean;
  videosWatched: number;
  totalVideos: number;
}

export interface HobbyProgress {
  hobbyId: string;
  topicsProgress: Record<string, TopicProgress>;
  totalXP: number;
}

// ── Topic Detail ─────────────────────────────────────────────────────────────

export interface TopicDetailSection {
  title: string;
  content: string;
}

export interface TopicDetail {
  topicName: string;
  hobbyName: string;
  overview: string;
  sections: TopicDetailSection[];
  keyTakeaways: string[];
  practicePrompt: string;
}

// ── Learn Graph ──────────────────────────────────────────────────────────────

export type GraphNodeType = 'root' | 'concept' | 'detail' | 'example';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  description: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface LearnGraph {
  title: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}
