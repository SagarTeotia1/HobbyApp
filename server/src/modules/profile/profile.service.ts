import { UserModel } from '../../models/User.model';
import type { UpdateProfilePayload } from './profile.types';

export const profileService = {
  async getMine(userId: string): Promise<unknown | null> {
    return UserModel.findOne({ uuid: userId }).lean();
  },

  async update(userId: string, payload: UpdateProfilePayload): Promise<unknown | null> {
    return UserModel.findOneAndUpdate({ uuid: userId }, payload, { new: true }).lean();
  },
};
