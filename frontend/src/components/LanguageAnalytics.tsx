import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { GitHubRepository } from '../types/github';

interface LanguageAnalyticsProps {
  repos: GitHubRepository[];
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

export default function LanguageAnalytics({ repos }: LanguageAnalyticsProps) {
  const data = useMemo(() => {
    if (!repos || repos.length === 0) return [];

    const counts: Record<string, number> = {};
    let totalWithLanguage = 0;

    repos.forEach((repo) => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        totalWithLanguage++;
      }
    });

    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / totalWithLanguage) * 100).toFixed(1),
        color: languageColors[name] || '#8b949e',
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Keep top 6 languages for visual clarity
  }, [repos]);

  if (data.length === 0) {
    return null; // Don't render anything if no language data exists
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 mt-8 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        Language Distribution
      </h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string, props: any) => [
                  `${value} repos (${props.payload.percentage}%)`,
                  name,
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  color: '#111827',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-3">
          {data.map((lang, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {lang.name}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{lang.percentage}%</span>
                <span className="font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-2 py-0.5 rounded shadow-sm">
                  {lang.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
