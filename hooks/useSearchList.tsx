// hooks/useSearchList.ts
import { useQuery } from "@tanstack/react-query";
import { useSearchQuery } from "./useSearchQuery";

export function useSearchList<T>(
  queryKey: string,
  fetcher: (search: string) => Promise<T>,
  paramName?: string
) {
  const { search, setSearch, query } = useSearchQuery(paramName);

  const queryResult = useQuery({
    queryKey: [queryKey, query],
    queryFn: () => fetcher(query),
  });

  return {
    search,
    setSearch,
    query,
    ...queryResult,
  };
}
