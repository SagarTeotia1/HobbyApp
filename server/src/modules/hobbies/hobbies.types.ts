import type { HobbyDoc } from '../../models/Hobby.model';

export type HobbyResponse = HobbyDoc & { _id: string };
