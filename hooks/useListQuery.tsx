// src/hooks/useListQuery.ts
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface UseListQueryProps {
  url: string;
  page?: number;
  search?: string;
}

export function useListQuery<T>({
  url,
  page,
  search,
}: UseListQueryProps) {
  return useQuery({
    queryKey: [url, page, search],
    queryFn: async () => {
      console.log("QUERY FN RUNNING", { page, search });

      const res = await api.get(url, {
        params: {
          page,
          search: search?.trim() || undefined,
        },
      });


      return res.data as PaginatedResponse<T>;
    },

    enabled: true,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
