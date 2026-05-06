import { Schema, model, type InferSchemaType } from 'mongoose';

const speedRoundSessionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    hobbyId: { type: String, required: true, index: true },
    score: { type: Number, default: 0 },
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    durationMs: { type: Number, default: 0 },
    xpGained: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type SpeedRoundSessionDoc = InferSchemaType<typeof speedRoundSessionSchema>;
export const SpeedRoundSessionModel = model('SpeedRoundSession', speedRoundSessionSchema);
