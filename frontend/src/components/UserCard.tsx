import { GitHubUser } from '../types/github';

interface UserCardProps {
  user: GitHubUser;
}

/**
 * Displays a GitHub user's profile information in a visually appealing card format.
 * Incorporates glassmorphism effects and modern typography.
 */
export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Section */}
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="relative w-full h-full object-cover rounded-2xl border-2 border-white dark:border-gray-800 shadow-sm"
          />
        </div>

        {/* Info Section */}
        <div className="flex-grow w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {user.name || user.login}
              </h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-lg mt-1 inline-flex items-center gap-1 group"
              >
                @{user.login}
                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <div className="flex text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {user.bio && (
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800/80">
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {user.public_repos}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Repos
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800/80">
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {user.followers}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Followers
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800/80">
              <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {user.following}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Following
              </span>
            </div>
            {(user.location || user.company) && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800/80 text-center">
                 {user.location && (
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </span>
                )}
                {user.company && (
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {user.company}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
