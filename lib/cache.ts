// High-performance server-side in-memory cache with TTL and prefix invalidation
type CacheEntry = {
  data: any;
  expiresAt: number;
};

declare global {
  // Maintain cache across hot-reloads and serverless module executions
  var __serverCache: Map<string, CacheEntry> | undefined;
}

const cache: Map<string, CacheEntry> = global.__serverCache || new Map<string, CacheEntry>();
if (!global.__serverCache) {
  global.__serverCache = cache;
}

/**
 * Retrieve cached data if valid and not expired
 */
export function getCache<T = any>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Store data in cache with TTL in seconds
 */
export function setCache(key: string, data: any, ttlSeconds: number = 180): void {
  // Keep cache size bounded
  if (cache.size > 1000) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey) cache.delete(oldestKey);
  }

  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * Invalidate all cache keys matching a prefix or pattern (e.g., 'products', 'categories')
 */
export function invalidateCache(prefix?: string): void {
  if (!prefix) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}
