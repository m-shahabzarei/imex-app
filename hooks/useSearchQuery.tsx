// hooks/useSearchQuery.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface UseSearchQueryProps {
  url: string;
  search: string;
}

export function useSearchQuery<T>({
  url,
  search,
}: UseSearchQueryProps) {
  return useQuery<T[]>({
    queryKey: [url, search],
    queryFn: async () => {
      const res = await api.get(url, {
        params: search ? { search } : {},
      });
      return res.data;
    },
  });
}
