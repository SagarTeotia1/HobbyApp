import { Schema, model, type InferSchemaType } from 'mongoose';

const hobbySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    categories: { type: [String], default: [] },
    icon: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type HobbyDoc = InferSchemaType<typeof hobbySchema>;
export const HobbyModel = model('Hobby', hobbySchema);
