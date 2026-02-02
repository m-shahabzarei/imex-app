// hooks/useSearchQuery.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useSearchQuery(paramName: string = "search") {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get(paramName) || "";
  const [search, setSearch] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) params.set(paramName, search);
      else params.delete(paramName);

      router.push(`?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return {
    search,        // برای input
    setSearch,     // برای onChange
    query: initialValue, // برای API
  };
}
