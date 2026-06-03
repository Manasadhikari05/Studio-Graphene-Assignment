/**
 * A professional skeleton loader for RepoCard.
 */
export default function SkeletonRepoCard() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-12"></div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
      </div>

      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/80">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
      </div>
    </div>
  );
}
