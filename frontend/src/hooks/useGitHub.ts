import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile, fetchUserRepos } from '../services/api';
import type { GitHubUser, RepoApiResponse } from '../types/github';

/**
 * React Query hook for fetching a GitHub user's profile.
 * Only runs when a username is provided (enabled flag).
 */
export function useUserProfile(username: string) {
  return useQuery<GitHubUser, Error>({
    queryKey: ['user', username],
    queryFn: () => fetchUserProfile(username),
    enabled: username.length > 0,
    retry: 1,
    staleTime: 60 * 1000, // Match backend cache TTL
  });
}

/**
 * React Query hook for fetching a GitHub user's repositories.
 * Supports sorting and pagination through options parameter.
 */
export function useUserRepos(
  username: string,
  options: { sort?: string; page?: number; perPage?: number } = {}
) {
  const { sort = 'updated', page = 1, perPage = 10 } = options;

  return useQuery<RepoApiResponse, Error>({
    queryKey: ['repos', username, sort, page, perPage],
    queryFn: () => fetchUserRepos(username, { sort, page, perPage }),
    enabled: username.length > 0,
    retry: 1,
    staleTime: 60 * 1000,
  });
}
