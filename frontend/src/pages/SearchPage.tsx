/**
 * Search page — main landing page of the application.
 * Contains the search bar and will display results once
 * search functionality is implemented in Phase 6.
 */
export default function SearchPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Explore GitHub
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Search for any GitHub user to view their profile, repositories, and
          language analytics.
        </p>
      </div>

      {/* Search Bar Placeholder — will be replaced in Phase 6 */}
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
            placeholder="Search GitHub username..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-lg transition-all duration-200"
            id="search-input"
            disabled
          />
        </div>
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-3">
          Search functionality coming soon...
        </p>
      </div>
    </div>
  );
}
