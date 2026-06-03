/**
 * Frontend type definitions for GitHub data.
 * Mirror the backend types for type safety across the stack.
 */

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  updated_at: string;
  pushed_at: string;
  clone_url: string;
  topics: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface RepoApiResponse {
  success: boolean;
  data: GitHubRepository[];
  pagination: {
    page: number;
    perPage: number;
    returned: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
