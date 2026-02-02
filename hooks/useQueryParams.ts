/* eslint-disable react-hooks/preserve-manual-memoization */
// hooks/useQueryParams.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams<T extends Record<string, any>>() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries()) as T;

  const setParams = useCallback(
    (newParams: Partial<T>) => {
      const merged = {
        ...params,
        ...newParams,
      };

      Object.keys(merged).forEach(
        (key) =>
          (merged[key] === undefined ||
            merged[key] === null ||
            merged[key] === "") &&
          delete merged[key]
      );

      const query = new URLSearchParams(
        merged as Record<string, string>
      ).toString();

      router.push(`?${query}`, { scroll: false });
    },
    [params]
  );

  return {
    params,
    setParams,
  };
}
