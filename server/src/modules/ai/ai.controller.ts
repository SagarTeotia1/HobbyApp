import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { aiChatActionSchema, aiChatSchema, hobbySuggestSchema, simplifyCardSchema } from './ai.validator';
import { aiService } from './ai.service';
import { CardModel } from '../../models/Card.model';
import { UserModel } from '../../models/User.model';
import { HobbyModel } from '../../models/Hobby.model';
import type { DifficultyLevel } from '../../shared/types/common.types';

export const aiController = {
  async suggestHobbies(req: Request, res: Response): Promise<Response> {
    const input = hobbySuggestSchema.parse(req.body);
    const data = await aiService.suggestHobbies(input);
    return ApiResponse.ok(res, data);
  },

  async generateVideoTitle(req: Request, res: Response): Promise<Response> {
    const hobbyId = typeof req.query['hobbyId'] === 'string' ? req.query['hobbyId'] : '';
    const videoUrl = typeof req.query['videoUrl'] === 'string' ? req.query['videoUrl'] : '';
    if (!hobbyId || !videoUrl) throw new ApiError(400, 'INVALID_PARAMS', 'hobbyId and videoUrl are required');
    // Use hobbyId as the display name (capitalize and replace dashes)
    const hobbyName = hobbyId.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const data = await aiService.generateVideoTitle(hobbyName, videoUrl);
    return ApiResponse.ok(res, data);
  },

  async simplifyCard(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const { cardId, hobbyId } = simplifyCardSchema.parse(req.body);
    const [card, user, hobby] = await Promise.all([
      CardModel.findOne({ _id: cardId, hobbyId }).lean(),
      UserModel.findOne({ uuid: req.user.uuid }).lean(),
      HobbyModel.findOne({ slug: hobbyId }).lean(),
    ]);
    if (!card) throw ApiError.notFound('Card not found');
    const data = await aiService.simplifyCard({
      hobby: hobby?.name ?? hobbyId,
      originalContent: card.frontContent,
      userLevel: (user?.skillLevel as DifficultyLevel) ?? 'beginner',
    });
    await CardModel.updateOne({ _id: cardId }, { $set: { simplifiedContent: data.simplifiedContent } });
    return ApiResponse.ok(res, data);
  },

  async chatStream(req: Request, res: Response): Promise<void> {
    if (!req.user) throw ApiError.unauthorized();
    const input = aiChatSchema.parse(req.body);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    try {
      for await (const chunk of aiService.streamChat(input)) {
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }
      res.write(`data: [DONE]\n\n`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'stream error';
      res.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
    } finally {
      res.end();
    }
  },

  async chatSync(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const input = aiChatSchema.parse(req.body);

    const reply = await aiService.chatReply(input);
    return ApiResponse.ok(res, { reply });
  },

  async chatAction(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const input = aiChatActionSchema.parse(req.body);
    if (input.userId !== req.user.uuid) throw ApiError.forbidden('userId mismatch');
    const data = await aiService.chatAction(input);
    return ApiResponse.ok(res, data);
  },
};
