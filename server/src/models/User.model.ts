import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    currentHobbyId: { type: String, default: null },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: () => new Date() },
    dailyTimeMinutes: { type: Number, default: 10 },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    type: { type: String, enum: ['anonymous', 'linked'], default: 'anonymous' },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema>;
export const UserModel = model('User', userSchema);
