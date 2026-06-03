import { Request, Response, NextFunction } from 'express';
import cache from '../cache';

/**
 * Express middleware that caches GET responses.
 *
 * On cache hit:  Returns the cached response immediately (skips controller).
 * On cache miss: Intercepts res.json() to store the response before sending.
 *
 * Cache key is the full original URL (path + query string),
 * so /api/github/repos/octocat?sort=stars is cached separately
 * from /api/github/repos/octocat?sort=name.
 */
export const cacheMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    next();
    return;
  }

  const cacheKey = req.originalUrl;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    console.log(`[CACHE HIT] ${cacheKey}`);
    res.json(cachedResponse);
    return;
  }

  console.log(`[CACHE MISS] ${cacheKey}`);

  // Intercept res.json to cache the response before sending
  const originalJson = res.json.bind(res);
  res.json = (body: unknown) => {
    // Only cache successful responses
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(cacheKey, body);
    }
    return originalJson(body);
  };

  next();
};
