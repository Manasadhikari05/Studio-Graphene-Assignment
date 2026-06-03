import { Request, Response, NextFunction } from 'express';
import { ApiErrorResponse } from '../types';

/**
 * Global error handling middleware.
 * Catches errors thrown by controllers/services and returns
 * a consistent JSON error response.
 */
export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;

  const errorResponse: ApiErrorResponse = {
    error: getErrorLabel(statusCode),
    message: err.message || 'An unexpected error occurred',
    statusCode,
  };

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  res.status(statusCode).json(errorResponse);
};

/**
 * Maps HTTP status codes to human-readable error labels.
 */
function getErrorLabel(statusCode: number): string {
  const labels: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    429: 'Rate Limit Exceeded',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
  };

  return labels[statusCode] || 'Error';
}
