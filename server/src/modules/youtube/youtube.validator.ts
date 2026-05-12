import { z } from 'zod';

export const youtubeVideosQuerySchema = z.object({
  hobbyId: z.string().min(1),
  topicId: z.string().min(1),
  topicName: z.string().min(1),
  hobbyName: z.string().min(1),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
});

export type YouTubeVideosQueryInput = z.infer<typeof youtubeVideosQuerySchema>;
