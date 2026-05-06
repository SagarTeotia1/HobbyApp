import { Schema, model, type InferSchemaType } from 'mongoose';

const userProgressSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    hobbyId: { type: String, required: true, index: true },
    masteredConcepts: { type: [String], default: [] },
    weakConcepts: { type: [String], default: [] },
    cardsSeen: { type: Number, default: 0 },
    cardsUnderstood: { type: Number, default: 0 },
    averageResponseTimeMs: { type: Number, default: 0 },
    currentDifficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { timestamps: true },
);

userProgressSchema.index({ userId: 1, hobbyId: 1 }, { unique: true });

export type UserProgressDoc = InferSchemaType<typeof userProgressSchema>;
export const UserProgressModel = model('UserProgress', userProgressSchema);
