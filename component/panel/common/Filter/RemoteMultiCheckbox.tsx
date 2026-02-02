"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteLoader from "../InfiniteLoader";

export default function RemoteMultiCheckbox({
  filter,
  value = [],
  onChange,
}: any) {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["filter", filter.key, search],
    queryFn: ({ pageParam = 1 }) =>
      filter.fetcher({ search, page: pageParam }),
    getNextPageParam: (last) => last.next,
    initialPageParam: 1,
  });

  const options =
    data?.pages.flatMap((p) => p.results) || [];

  const toggle = (val: string) => {
    const next = value.includes(val)
      ? value.filter((v: string) => v !== val)
      : [...value, val];

    onChange(filter.key, next);
  };

  return (
    <div className="space-y-2">
      <input
        className="w-full border-0 rounded p-2 text-sm bg-gray-100 focus:outline-gray-200"
        placeholder="جستجو..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="max-h-60 overflow-auto text-xs space-y-2">
        {options.map((opt: any) => (
          <label key={opt.value} className="flex gap-2">
            <input
              type="checkbox"
              checked={value.includes(opt.value)}
              onChange={() => toggle(opt.value)}
            />
            {opt.label}
          </label>
        ))}

        <InfiniteLoader
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
