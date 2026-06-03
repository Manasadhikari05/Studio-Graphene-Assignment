import { Router } from 'express';
import { getUserProfile } from '../controllers/user.controller';

const router = Router();

/**
 * GET /api/github/user/:username
 * Fetches a GitHub user's profile information.
 */
router.get('/user/:username', getUserProfile);

export default router;
