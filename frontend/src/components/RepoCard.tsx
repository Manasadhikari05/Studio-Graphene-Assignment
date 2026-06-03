import { useState } from 'react';
import type { GitHubRepository } from '../types/github';

interface RepoCardProps {
  repo: GitHubRepository;
}

// Map languages to colors for UI enhancements
const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

export default function RepoCard({ repo }: RepoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const languageColor = repo.language ? languageColors[repo.language] || '#8b949e' : null;
  const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700/50 transition-all duration-300">
      <div className="flex justify-between items-start gap-4 mb-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 break-words flex-1"
        >
          {repo.name}
        </a>
        
        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/80 px-2.5 py-1 rounded-full border border-gray-100 dark:border-gray-700/50 flex-shrink-0">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {repo.stargazers_count}
          </span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/80">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColor as string }}
            />
            {repo.language}
          </div>
        )}
        
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updated {updatedAt}
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          className="ml-auto flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          {isExpanded ? 'Less details' : 'More details'}
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded Details Section */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Forks</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{repo.forks_count}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Open Issues</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{repo.open_issues_count}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Default Branch</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate" title={repo.default_branch}>
                {repo.default_branch}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
