import { Schema, model, type InferSchemaType } from 'mongoose';

const cardSchema = new Schema(
  {
    hobbyId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: [
        'concept',
        'quiz',
        'memory_hook',
        'analogy',
        'mistake_fix',
        'boss_prep',
        'scenario',
        'recap',
      ],
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    simplifiedContent: { type: String, default: null },
    imageUrl: { type: String, default: null },
    tags: { type: [String], default: [] },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    conceptId: { type: String, required: true, index: true },
    generatedFor: { type: String, default: null, index: true },
  },
  { timestamps: true },
);

export type CardDoc = InferSchemaType<typeof cardSchema>;
export const CardModel = model('Card', cardSchema);
