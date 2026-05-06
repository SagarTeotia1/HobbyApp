import { Schema, model, type InferSchemaType } from 'mongoose';

const bossRoundSessionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    hobbyId: { type: String, required: true, index: true },
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    maxCombo: { type: Number, default: 0 },
    xpGained: { type: Number, default: 0 },
    xpLost: { type: Number, default: 0 },
    durationMs: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type BossRoundSessionDoc = InferSchemaType<typeof bossRoundSessionSchema>;
export const BossRoundSessionModel = model('BossRoundSession', bossRoundSessionSchema);
