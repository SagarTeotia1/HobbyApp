export interface YouTubeVideo {
  id: string;
  title: string;
  creator: string;
  youtubeId: string;
  thumbnailUrl: string;
  keyInsight: string;
  durationSeconds: number;
}

export interface YouTubeVideosResponse {
  videos: YouTubeVideo[];
  query: string;
  cachedAt: string;
}
