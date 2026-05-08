export interface CurriculumVideo {
  id: string;
  title: string;
  creator: string;
  youtubeId?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  keyInsight: string;
  durationSeconds?: number;
}

export interface CurriculumTopic {
  id: string;
  name: string;
  videos: CurriculumVideo[];
}

export interface CurriculumHobby {
  id: string;
  name: string;
  category: string;
  emoji: string;
  accentColor: string;
  topics: CurriculumTopic[];
}
