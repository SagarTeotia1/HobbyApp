export interface FeedVideo {
  id: string;
  title: string;
  creator: string;
  youtubeId?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  keyInsight: string;
  durationSeconds?: number;
}

export interface FeedTopic {
  id: string;
  name: string;
  videos: FeedVideo[];
}
