import { Schema, model, type InferSchemaType } from 'mongoose';

const cardInteractionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    cardId: { type: String, required: true, index: true },
    hobbyId: { type: String, required: true, index: true },
    interaction: {
      type: String,
      enum: ['understood', 'needs_review', 'needs_simpler', 'bookmarked', 'skipped'],
      required: true,
    },
    responseTimeMs: { type: Number, required: true },
    sessionId: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

export type CardInteractionDoc = InferSchemaType<typeof cardInteractionSchema>;
export const CardInteractionModel = model('CardInteraction', cardInteractionSchema);
