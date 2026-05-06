import { HobbyModel } from '../../models/Hobby.model';

export const hobbiesService = {
  async list(): Promise<unknown[]> {
    return HobbyModel.find({ isActive: true }).lean();
  },

  async findBySlug(slug: string): Promise<unknown | null> {
    return HobbyModel.findOne({ slug, isActive: true }).lean();
  },
};
