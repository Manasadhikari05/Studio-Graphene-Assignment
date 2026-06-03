import NodeCache from 'node-cache';

/**
 * Application-level cache using NodeCache.
 * Default TTL is 60 seconds as per requirements.
 *
 * Keys are typically the full request URL to ensure
 * different query parameters produce different cache entries.
 */
const CACHE_TTL_SECONDS = 60;

const cache = new NodeCache({
  stdTTL: CACHE_TTL_SECONDS,
  checkperiod: CACHE_TTL_SECONDS * 0.2, // cleanup every 12 seconds
  useClones: false, // better performance for read-heavy workloads
});

export default cache;
export { CACHE_TTL_SECONDS };
