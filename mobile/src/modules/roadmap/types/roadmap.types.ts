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
