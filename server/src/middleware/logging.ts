import { Request, Response, NextFunction } from 'express';
import { sanitizeToken } from '../utils/shared-utils';

export const errorLoggingMiddleware = (error: Error, req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers['x-gh-token'] as string;
  const sanitizedToken = token ? sanitizeToken(token) : 'none';

  console.error('Request error:', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
    token: sanitizedToken
  });

  next(error);
};


