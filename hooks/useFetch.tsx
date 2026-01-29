import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type ApiResponse<T> = {
  results: T[];
};

type UseFetchProps<T> = {
  queryKey: (string | number)[];
  url: string;
  enabled?: boolean;
};

export function useFetch<T>({
  queryKey,
  url,
  enabled = true,
}: UseFetchProps<T>) {
  return useQuery<T[]>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<T>>(url);
      return data.results; 
    },
    enabled,
  });
}