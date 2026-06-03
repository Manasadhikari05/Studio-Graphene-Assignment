import { Router } from 'express';
import { getUserProfile } from '../controllers/user.controller';
import { getUserRepos } from '../controllers/repo.controller';

const router = Router();

/**
 * GET /api/github/user/:username
 * Fetches a GitHub user's profile information.
 */
router.get('/user/:username', getUserProfile);

/**
 * GET /api/github/repos/:username
 * Fetches a GitHub user's repositories with sorting and pagination.
 * Query params: sort (stars|name|updated), page, per_page
 */
router.get('/repos/:username', getUserRepos);

export default router;
