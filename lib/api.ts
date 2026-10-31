import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const rawApi = axios.create({
  baseURL: "/api",
});

rawApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Client-side in-flight request deduplication & memory cache
interface CacheEntry {
  data: any;
  timestamp: number;
}

const clientCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<AxiosResponse<any>>>();
const DEFAULT_TTL_MS = 60 * 1000; // 60 seconds client cache

export function clearClientApiCache(prefix?: string) {
  if (!prefix) {
    clientCache.clear();
    return;
  }
  for (const key of clientCache.keys()) {
    if (key.includes(prefix)) {
      clientCache.delete(key);
    }
  }
}

// Custom wrapper with deduplication and caching for GET requests
const api = {
  ...rawApi,
  get: async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> & { bypassCache?: boolean; ttlMs?: number }
  ): Promise<R> => {
    // Only apply cache in browser environment
    const isBrowser = typeof window !== "undefined";
    const cacheKey = `${url}:${JSON.stringify(config?.params || {})}`;
    const ttl = config?.ttlMs ?? DEFAULT_TTL_MS;

    if (isBrowser && !config?.bypassCache) {
      // 1. Check existing fresh cache
      const cached = clientCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < ttl) {
        return {
          data: cached.data,
          status: 200,
          statusText: "OK (Cached)",
          headers: {},
          config: config as any,
        } as unknown as R;
      }

      // 2. Check in-flight promise to deduplicate simultaneous requests
      if (inFlightRequests.has(cacheKey)) {
        return inFlightRequests.get(cacheKey) as unknown as Promise<R>;
      }
    }

    // 3. Initiate request and track in-flight promise
    const requestPromise = rawApi
      .get<T, AxiosResponse<T>, D>(url, config)
      .then((response) => {
        if (isBrowser && !config?.bypassCache) {
          clientCache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
          });
        }
        return response as unknown as R;
      })
      .finally(() => {
        inFlightRequests.delete(cacheKey);
      });

    if (isBrowser && !config?.bypassCache) {
      inFlightRequests.set(cacheKey, requestPromise as any);
    }

    return requestPromise;
  },

  post: async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    clearClientApiCache();
    return rawApi.post<T, R, D>(url, data, config);
  },

  put: async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    clearClientApiCache();
    return rawApi.put<T, R, D>(url, data, config);
  },

  delete: async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    clearClientApiCache();
    return rawApi.delete<T, R, D>(url, config);
  },

  patch: async <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> => {
    clearClientApiCache();
    return rawApi.patch<T, R, D>(url, data, config);
  },

  interceptors: rawApi.interceptors,
  defaults: rawApi.defaults,
};

export default api;
