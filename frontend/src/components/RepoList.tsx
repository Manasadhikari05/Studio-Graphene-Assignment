import { useState } from 'react';
import { useUserRepos } from '../hooks/useGitHub';
import RepoCard from './RepoCard';
import SkeletonRepoCard from './SkeletonRepoCard';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

interface RepoListProps {
  username: string;
}

export default function RepoList({ username }: RepoListProps) {
  const [sort, setSort] = useState<string>('updated');
  // We'll add pagination in later phases.
  const { data, isLoading, isError, error } = useUserRepos(username, { sort });

  if (isLoading) {
    return (
      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonRepoCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8">
        <ErrorState message={error?.message || 'Failed to load repositories.'} />
      </div>
    );
  }

  const repos = data?.data || [];

  if (repos.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          title="No public repositories"
          message="This user doesn't have any public repositories yet."
        />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Repositories
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm py-0.5 px-2.5 rounded-full font-medium ml-2">
            {data?.pagination.returned}
          </span>
        </h3>
        
        <div className="flex items-center gap-2">
          <label htmlFor="sort-repos" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            id="sort-repos"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 transition-colors"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
