declare global {
  namespace Express {
    interface UserPayload {
      uuid: string;
      type: 'anonymous' | 'linked';
    }

    interface Request {
      user?: UserPayload;
      requestId?: string;
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: Express.UserPayload;
    requestId?: string;
  }
}

export {};
