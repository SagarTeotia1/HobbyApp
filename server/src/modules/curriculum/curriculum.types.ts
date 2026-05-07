export interface CurriculumVideo {
  id: string;
  title: string;
  creator: string;
  youtubeId?: string;
  videoUrl?: string;      // Cloudflare Stream / R2 direct URL
  thumbnailUrl: string;   // computed — YouTube thumb or explicit
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
