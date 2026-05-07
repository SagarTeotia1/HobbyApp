import { z } from 'zod';

export const searchHobbiesSchema = z.object({
  q: z.string().min(1).max(100).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const getHobbySchema = z.object({
  hobbyId: z.string().min(1),
});

export const validateHobbySchema = z.object({
  name: z.string().min(1).max(100),
});

export type SearchHobbiesInput = z.infer<typeof searchHobbiesSchema>;
export type GetHobbyInput = z.infer<typeof getHobbySchema>;
export type ValidateHobbyInput = z.infer<typeof validateHobbySchema>;
