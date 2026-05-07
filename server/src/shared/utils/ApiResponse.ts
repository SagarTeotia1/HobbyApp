import type { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: { pagination?: PaginationMeta };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const ApiResponse = {
  ok<T>(res: Response, data: T, meta?: SuccessResponse<T>['meta']): Response {
    const body: SuccessResponse<T> = { success: true, data };
    if (meta) body.meta = meta;
    return res.status(200).json(body);
  },

  created<T>(res: Response, data: T): Response {
    return res.status(201).json({ success: true, data } satisfies SuccessResponse<T>);
  },

  noContent(res: Response): Response {
    return res.status(204).send();
  },

  error(
    res: Response,
    statusCode: number,
    code: string,
    message: string,
    details?: unknown,
  ): Response {
    const body: ErrorResponse = { success: false, error: { code, message } };
    if (details !== undefined) body.error.details = details;
    return res.status(statusCode).json(body);
  },
};
