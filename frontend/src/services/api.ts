import axios from 'axios';
import { ApiResponse, GitHubUser, RepoApiResponse } from '../types/github';

/**
 * Axios instance configured to call our backend API.
 * In development, Vite proxies /api requests to the backend.
 * In production, this should point to the deployed backend URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch a GitHub user's profile from our backend proxy.
 */
export async function fetchUserProfile(username: string): Promise<GitHubUser> {
  const response = await api.get<ApiResponse<GitHubUser>>(
    `/github/user/${username}`
  );
  return response.data.data;
}

/**
 * Fetch a GitHub user's repositories from our backend proxy.
 * Supports sorting and pagination via query parameters.
 */
export async function fetchUserRepos(
  username: string,
  options: { sort?: string; page?: number; perPage?: number } = {}
): Promise<RepoApiResponse> {
  const { sort = 'updated', page = 1, perPage = 10 } = options;

  const response = await api.get<RepoApiResponse>(
    `/github/repos/${username}`,
    {
      params: { sort, page, per_page: perPage },
    }
  );
  return response.data;
}

export default api;
