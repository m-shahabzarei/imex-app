// hooks/useInfiniteSearchList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchQuery } from "./useSearchQuery";

interface FetcherResult<T> {
  results: T[];
  next: string | null; 
}

export function useInfiniteSearchList<T>(
  queryKey: string,
  fetcher: (params: { search: string; page: number }) => Promise<FetcherResult<T>>,
  paramName?: string
) {
  const { search, setSearch, query } = useSearchQuery(paramName);

  const queryResult = useInfiniteQuery({
    queryKey: [queryKey, query],
    queryFn: ({ pageParam = 1 }) =>
      fetcher({
        search: query,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      try {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page ? Number(page) : undefined;
      } catch {
        return undefined;
      }
    },
  });

  return {
    search,
    setSearch,
    query,
    data: queryResult.data,
    fetchNextPage: queryResult.fetchNextPage,
    hasNextPage: queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    isLoading: queryResult.isLoading, // اضافه شد
  };
}
