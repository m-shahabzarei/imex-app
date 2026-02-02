import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryParams } from "./useQueryParams";

export function useInfiniteDataList<T>(
  key: string,
  fetcher: (params: any) => Promise<{
    results: T[];
    next: number | null;
  }>
) {
  const { params, setParams } = useQueryParams();

  const queryResult = useInfiniteQuery({
    queryKey: [key, params],
    queryFn: ({ pageParam = 1 }) =>
      fetcher({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined, 
  });

  return {
    params,
    setParams,
    ...queryResult,
  };
}
