import type { Request, Response } from 'express';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { ApiError } from '../../shared/utils/ApiError';
import { aiChatActionSchema, aiChatSchema, hobbySuggestSchema, simplifyCardSchema } from './ai.validator';
import { aiService } from './ai.service';

export const aiController = {
  async suggestHobbies(req: Request, res: Response): Promise<Response> {
    const input = hobbySuggestSchema.parse(req.body);
    const data = await aiService.suggestHobbies(input);
    return ApiResponse.ok(res, data);
  },

  async simplifyCard(req: Request, res: Response): Promise<Response> {
    if (!req.user) throw ApiError.unauthorized();
    const input = simplifyCardSchema.parse(req.body);
    const data = await aiService.simplifyCard(req.user.uuid, input);
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
