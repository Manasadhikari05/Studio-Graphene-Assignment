import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import githubRoutes from '../src/routes/github.routes';
import { errorHandler } from '../src/middlewares/errorHandler';
import { githubService } from '../src/services/github.service';

// Mock the github service methods
vi.mock('../src/services/github.service', () => ({
  githubService: {
    getUserProfile: vi.fn(),
    getUserRepos: vi.fn()
  }
}));

const app = express();
app.use('/api/github', githubRoutes);
app.use(errorHandler);

describe('GitHub API Routes', () => {
  describe('GET /api/github/user/:username', () => {
    it('should return user profile for a valid username', async () => {
      const mockUser = { login: 'octocat', id: 1, public_repos: 5 };
      vi.mocked(githubService.getUserProfile).mockResolvedValueOnce(mockUser as any);

      const response = await request(app).get('/api/github/user/octocat');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.login).toBe('octocat');
    });

    it('should return 404 for a non-existent user', async () => {
      vi.mocked(githubService.getUserProfile).mockRejectedValueOnce(
        Object.assign(new Error('User not found'), { statusCode: 404 })
      );

      const response = await request(app).get('/api/github/user/nonexistentuser12345');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('GET /api/github/repos/:username', () => {
    it('should return repositories and pagination metadata', async () => {
      const mockRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];
      vi.mocked(githubService.getUserRepos).mockResolvedValueOnce({
        repos: mockRepos as any,
        totalCount: 2
      });

      const response = await request(app).get('/api/github/repos/octocat?sort=stars&page=1&per_page=2');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toEqual({
        page: 1,
        perPage: 2,
        returned: 2,
      });
    });
  });
});
