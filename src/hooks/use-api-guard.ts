import { useState, useRef } from 'react';

type FetchOptions<TParams, TData> = {
  key: string;
  query: (params?: TParams) => Promise<TData>;
};

type FetchResult<TData> = {
  fetchData: (params?: any) => Promise<TData>;
  isLoading: boolean;
  error: Error | null;
};

export const useGetApiGuard = <TParams, TData>({
  key,
  query,
}: FetchOptions<TParams, TData>): FetchResult<TData> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Record<string, TData>>({});
  const ongoingRequestsRef = useRef<Record<string, Promise<TData>>>({});

  const fetchData = async (params?: TParams): Promise<TData> => {
    const cacheKey = `${key}_${JSON.stringify(params)}`;

    // Return cached data if available
    if (cacheRef.current[cacheKey]) {
      return cacheRef.current[cacheKey];
    }

    // Return ongoing request if it exists
    if (await ongoingRequestsRef.current[cacheKey]) {
      return ongoingRequestsRef.current[cacheKey];
    }

    setIsLoading(true);
    setError(null);

    const request = query(params)
      .then((data) => {
        cacheRef.current[cacheKey] = data; // Cache the result
        delete ongoingRequestsRef.current[cacheKey]; // Remove from ongoing requests
        return data;
      })
      .catch((err) => {
        setError(err);
        delete ongoingRequestsRef.current[cacheKey]; // Remove from ongoing requests
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });

    ongoingRequestsRef.current[cacheKey] = request; // Track the ongoing request
    return request;
  };

  return { fetchData, isLoading, error };
};
