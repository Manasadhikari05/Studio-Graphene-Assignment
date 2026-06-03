import { useState } from 'react';
import { useUserRepos } from '../hooks/useGitHub';
import RepoCard from './RepoCard';
import SkeletonRepoCard from './SkeletonRepoCard';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import LanguageAnalytics from './LanguageAnalytics';

interface RepoListProps {
  username: string;
}

export default function RepoList({ username }: RepoListProps) {
  const [sort, setSort] = useState<string>('updated');
  const [page, setPage] = useState<number>(1);
  const perPage = 10;
  
  const { data, isLoading, isError, error, isFetching } = useUserRepos(username, { sort, page, perPage });

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
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1); // Reset to page 1 on sort change
            }}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 transition-colors"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
      
      {/* Analytics Module */}
      {repos.length > 0 && (
        <LanguageAnalytics repos={repos} />
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isFetching}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Page <span className="font-medium text-gray-900 dark:text-white">{page}</span>
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={repos.length < perPage || isFetching}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
