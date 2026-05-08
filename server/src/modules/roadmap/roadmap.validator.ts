import { z } from 'zod';

export const topicDetailBodySchema = z.object({
  hobbyId:   z.string().min(1),
  topicId:   z.string().min(1),
  topicName: z.string().min(1),
  hobbyName: z.string().min(1),
});

export const learnGraphBodySchema = z.object({
  hobbyId:   z.string().min(1),
  topicId:   z.string().min(1),
  topicName: z.string().min(1),
  hobbyName: z.string().min(1),
});

export type TopicDetailInput = z.infer<typeof topicDetailBodySchema>;
export type LearnGraphInput  = z.infer<typeof learnGraphBodySchema>;
