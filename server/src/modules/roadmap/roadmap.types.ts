export interface TopicDetailSection {
  title: string;
  content: string;
}

export interface TopicDetailResponse {
  topicName: string;
  hobbyName: string;
  overview: string;
  sections: TopicDetailSection[];
  keyTakeaways: string[];
  practicePrompt: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'root' | 'concept' | 'detail' | 'example';
  description: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface LearnGraphResponse {
  title: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}
