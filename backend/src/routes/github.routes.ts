import { Router } from 'express';
import { getUserProfile } from '../controllers/user.controller';
import { getUserRepos } from '../controllers/repo.controller';
import { cacheMiddleware } from '../middlewares/cacheMiddleware';

const router = Router();

/**
 * GET /api/github/user/:username
 * Fetches a GitHub user's profile information.
 * Responses are cached for 60 seconds.
 */
router.get('/user/:username', cacheMiddleware, getUserProfile);

/**
 * GET /api/github/repos/:username
 * Fetches a GitHub user's repositories with sorting and pagination.
 * Query params: sort (stars|name|updated), page, per_page
 * Responses are cached for 60 seconds.
 */
router.get('/repos/:username', cacheMiddleware, getUserRepos);

export default router;
