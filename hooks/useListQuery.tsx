// src/hooks/useListQuery.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

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
  return useQuery<T[]>({
    queryKey: [url, page, search],
    queryFn: async () => {
      const res = await api.get(url, {
        params: {
          page,
          search,
        },
      });
      return res.data;
    },
  });
}
