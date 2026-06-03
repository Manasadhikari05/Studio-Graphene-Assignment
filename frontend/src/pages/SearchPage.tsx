import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useUserProfile } from '../hooks/useGitHub';
import UserCard from '../components/UserCard';

/**
 * Search page — main landing page of the application.
 * Users type a GitHub username and results appear below.
 * Input is debounced by 500ms to reduce API calls.
 */
export default function SearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedUsername = useDebounce(searchInput, 500);
  const { data: user, isLoading, isError, error } = useUserProfile(debouncedUsername);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Explore GitHub
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Search for any GitHub user to view their profile, repositories, and
          language analytics.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search GitHub username..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-lg transition-all duration-200"
            id="search-input"
            autoComplete="off"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Results Area */}
      {isError && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              {error?.message || 'Something went wrong. Please try again.'}
            </p>
          </div>
        </div>
      )}

      {user && (
        <div className="max-w-4xl mx-auto w-full">
          <UserCard user={user} />
        </div>
      )}

      {/* Empty state — shown when no search has been performed */}
      {!user && !isLoading && !isError && !debouncedUsername && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Type a GitHub username above to get started
          </p>
        </div>
      )}
    </div>
  );
}
