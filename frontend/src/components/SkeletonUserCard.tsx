/**
 * A professional skeleton loader for the UserCard.
 * Uses Tailwind's animate-pulse to show loading state.
 */
export default function SkeletonUserCard() {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Skeleton */}
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>

        {/* Info Skeleton */}
        <div className="flex-grow w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-32"></div>
          </div>

          {/* Bio Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-2xl h-24"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
