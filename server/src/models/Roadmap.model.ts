import { Schema, model, type InferSchemaType } from 'mongoose';

const roadmapStageSchema = new Schema(
  {
    order: { type: Number, required: true },
    conceptId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isUnlocked: { type: Boolean, default: false },
    isMastered: { type: Boolean, default: false },
  },
  { _id: false },
);

const roadmapSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    hobbyId: { type: String, required: true, index: true },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    stages: [roadmapStageSchema],
    currentStageOrder: { type: Number, default: 0 },
    generatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true },
);

roadmapSchema.index({ userId: 1, hobbyId: 1 }, { unique: true });

export type RoadmapDoc = InferSchemaType<typeof roadmapSchema>;
export const RoadmapModel = model('Roadmap', roadmapSchema);
