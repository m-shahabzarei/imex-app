"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Search from "@/component/panel/common/Search";
import Filters from "@/component/panel/common/Filter/Filter";
import InfiniteLoader from "@/component/panel/common/InfiniteLoader";
import LoadingSpinner from "@/component/ui/Loading";
import { useInfiniteDataList } from "@/hooks/useInfiniteDataList";
import { FilterConfig } from "@/component/panel/common/Filter/type";
import DateFilter from "./DateFilter/DateFilter";
import Link from "next/link";

interface Props<T> {
  queryKey: string | (string | number)[];
  fetcher: (params: any) => Promise<{
    results: T[];
    next: number | null;
  }>;
  filtersConfig?: FilterConfig[];
  searchPlaceholder?: string;
  renderItem: (item: T, search?: string) => ReactNode;
  emptyComponent?: ReactNode;
  grid4?: boolean;
  grid1?: boolean;
  gridS?: boolean;
  Ment?: boolean;
  Date?: boolean;
  NoFilter?: boolean;
  count?: number | null;
}

export default function DataListWithFilters<T>({
  queryKey,
  fetcher,
  filtersConfig = [],
  searchPlaceholder = "جستجو...",
  renderItem,
  grid4,
  grid1,
  Date,
  NoFilter,
  gridS,
  Ment,
  count,
  emptyComponent,
}: Props<T>) {
  const {
    data,
    params,
    setParams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useInfiniteDataList(queryKey, fetcher);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(params.search || "");

  const allResults = data?.pages.flatMap((p) => p.results) || [];

  const isInitialLoading = isPending || (!data && isFetching);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams({
        ...params,
        search: searchInput || undefined,
        page: undefined,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <div className="max-md:pb-4 relative">
      <div className="flex justify-between w-full gap-3">
        <Search
          Date={Date}
          NoFilter={NoFilter}
          variant="secondary"
          placeholder={searchPlaceholder}
          value={searchInput}
          onChange={(value) => setSearchInput(value)}
          onClick={() => setIsFilterOpen(true)}
        />

        {Date && <DateFilter />}

        {Ment && (
          <Link
            href="/panel/profile/myMentor"
            className="bg-blue-100 p-2 rounded-xl text-custom2 border-[1.5px] border-custom flex w-[120px] items-center justify-center"
          >
            سوابق گفتگو
          </Link>
        )}
      </div>

      {filtersConfig.length > 0 && (
        <Filters
          config={filtersConfig}
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <div className="mt-4">
        {isInitialLoading ? (
          <LoadingSpinner />
        ) : allResults.length === 0 ? (
          emptyComponent ?? null
        ) : (
          <div className="w-full flex flex-col gap-2">
            {count && (
              <span className="text-center w-full text-sm text-gray-400">
                {count} نتیجه یافت شد
              </span>
            )}

            <div
              className={`grid ${
                grid4
                  ? "lg:grid-cols-4 max-lg:grid-cols-3"
                  : grid1
                  ? ""
                  : gridS
                  ? "lg:grid-cols-2"
                  : "md:grid-cols-2"
              } gap-7 md:pb-4`}
            >
              {allResults.map((item: T) => renderItem(item, searchInput))}
            </div>
          </div>
        )}

        {isFetchingNextPage && <LoadingSpinner />}

        <InfiniteLoader
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
