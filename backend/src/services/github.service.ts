import axios, { AxiosInstance, AxiosError } from 'axios';
import { GitHubUser } from '../types';

/**
 * Service layer for interacting with the GitHub REST API.
 * Encapsulates all HTTP calls and handles GitHub-specific error scenarios.
 */
class GitHubService {
  private client: AxiosInstance;

  constructor() {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Use token if available to increase rate limit from 60 to 5000 req/hr
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    this.client = axios.create({
      baseURL: 'https://api.github.com',
      headers,
      timeout: 10000,
    });
  }

  /**
   * Fetch a GitHub user's profile by username.
   * Throws descriptive errors for 404 (user not found) and 403 (rate limit).
   */
  async getUserProfile(username: string): Promise<GitHubUser> {
    try {
      const response = await this.client.get<GitHubUser>(`/users/${username}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error as AxiosError);
    }
  }

  /**
   * Converts GitHub API errors into application-level errors
   * with clear status codes and messages.
   */
  private handleApiError(error: AxiosError): Error {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 404:
          return Object.assign(new Error('User not found'), { statusCode: 404 });
        case 403:
          return Object.assign(new Error('GitHub API rate limit exceeded. Try again later.'), {
            statusCode: 429,
          });
        case 401:
          return Object.assign(new Error('Invalid GitHub token'), { statusCode: 401 });
        default:
          return Object.assign(new Error(`GitHub API error: ${status}`), {
            statusCode: status,
          });
      }
    }

    if (error.code === 'ECONNABORTED') {
      return Object.assign(new Error('Request to GitHub timed out'), { statusCode: 504 });
    }

    return Object.assign(new Error('Unable to reach GitHub. Check your network connection.'), {
      statusCode: 503,
    });
  }
}

// Export a singleton instance
export const githubService = new GitHubService();
