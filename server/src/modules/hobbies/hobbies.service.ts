import { HobbyModel } from '../../models/Hobby.model';
import { aiService } from '../ai/ai.service';
import { ApiError } from '../../shared/utils/ApiError';

const PREDEFINED_HOBBIES = [
  'Chess',
  'Guitar',
  'Drawing',
  'Coding',
  'Photography',
  'Cooking',
  'Yoga',
  'Piano',
  'Public Speaking',
  'Writing',
];

export const hobbiesService = {
  async seedPredefined(): Promise<void> {
    const docs = PREDEFINED_HOBBIES.map((name) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Learn ${name} with adaptive AI micro-lessons.`,
      categories: ['general'],
      isActive: true,
    }));

    await Promise.all(
      docs.map((doc) => HobbyModel.updateOne({ slug: doc.slug }, { $setOnInsert: doc }, { upsert: true })),
    );
  },

  async list(limit = 50): Promise<unknown[]> {
    return HobbyModel.find({ isActive: true }).sort({ name: 1 }).limit(limit).lean();
  },

  async search(query: string, limit = 20): Promise<unknown[]> {
    const q = query.trim();
    if (!q) return [];

    return HobbyModel.find({
      isActive: true,
      $or: [{ name: { $regex: q, $options: 'i' } }, { slug: { $regex: q, $options: 'i' } }],
    })
      .sort({ name: 1 })
      .limit(limit)
      .lean();
  },

  async findBySlug(slug: string): Promise<unknown | null> {
    return HobbyModel.findOne({ slug, isActive: true }).lean();
  },

  async createCustom(name: string): Promise<unknown> {
    const validated = await aiService.validateHobby(name);
    if (!validated.isValid) throw ApiError.badRequest('Invalid hobby name');

    const hobby = await HobbyModel.findOneAndUpdate(
      { slug: validated.slug },
      {
        $setOnInsert: {
          slug: validated.slug,
          name: validated.normalizedName,
          description: `Custom hobby: ${validated.normalizedName}`,
          categories: ['custom'],
          isActive: true,
        },
      },
      { upsert: true, new: true },
    ).lean();

    return hobby;
  },
};
