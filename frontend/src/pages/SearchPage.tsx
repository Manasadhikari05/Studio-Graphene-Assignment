import { useState, useEffect } from 'react';
import { useUserProfile } from '../hooks/useGitHub';
import { useHistory } from '../context/HistoryContext';
import UserCard from '../components/UserCard';
import RepoList from '../components/RepoList';
import SkeletonUserCard from '../components/SkeletonUserCard';
import ErrorState from '../components/ErrorState';

/**
 * Search page — main landing page of the application.
 * Users type a GitHub username and results appear below.
 * Input is debounced by 500ms to reduce API calls.
 */
export default function SearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const { data: user, isLoading, isError, error } = useUserProfile(submittedUsername);
  const { history, addSearch, clearHistory } = useHistory();

  // Record successful search to history
  useEffect(() => {
    if (user && !isLoading && !isError) {
      addSearch(user.login);
    }
  }, [user, isLoading, isError, addSearch]);

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
        <form 
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchInput.trim()) {
              setSubmittedUsername(searchInput.trim());
            }
          }}
        >
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
        </form>
        
        {/* Search History Chips */}
        {history.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Recent:</span>
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSearchInput(item.username);
                  setSubmittedUsername(item.username);
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-indigo-900/30 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 text-sm rounded-full transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800/50"
              >
                {item.username}
              </button>
            ))}
            <button
              onClick={clearHistory}
              className="px-2 py-1 text-xs text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors ml-auto"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Results Area */}
      {isError && (
        <ErrorState
          message={error?.message || 'Something went wrong. Please try again.'}
        />
      )}

      {isLoading && submittedUsername && (
        <div className="max-w-4xl mx-auto w-full">
          <SkeletonUserCard />
        </div>
      )}

      {user && !isLoading && !isError && (
        <div className="max-w-4xl mx-auto w-full">
          <UserCard user={user} />
          <RepoList username={user.login} />
        </div>
      )}

      {/* Empty state — shown when no search has been performed */}
      {!user && !isLoading && !isError && !submittedUsername && (
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
