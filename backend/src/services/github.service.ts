import axios, { AxiosInstance, AxiosError } from 'axios';
import { GitHubUser, GitHubRepository } from '../types';

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
   * Fetch repositories for a given GitHub user.
   * Supports pagination and sorting by stars, name, or updated date.
   */
  async getUserRepos(
    username: string,
    options: { sort?: string; page?: number; perPage?: number } = {}
  ): Promise<{ repos: GitHubRepository[]; totalCount: number }> {
    const { sort = 'updated', page = 1, perPage = 10 } = options;

    // Map our sort values to GitHub API params
    const sortMap: Record<string, { sort: string; direction: string }> = {
      stars: { sort: 'pushed', direction: 'desc' },
      name: { sort: 'full_name', direction: 'asc' },
      updated: { sort: 'updated', direction: 'desc' },
    };

    const sortConfig = sortMap[sort] || sortMap.updated;

    try {
      const response = await this.client.get<GitHubRepository[]>(
        `/users/${username}/repos`,
        {
          params: {
            sort: sortConfig.sort,
            direction: sortConfig.direction,
            page,
            per_page: perPage,
            type: 'owner', // exclude forks from the listing
          },
        }
      );

      // GitHub doesn't return total count in body; we get it from the user profile
      // For now, return the array length as a proxy
      return {
        repos: response.data,
        totalCount: response.data.length,
      };
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
