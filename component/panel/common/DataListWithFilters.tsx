"use client";

import { ReactNode, useEffect, useState } from "react";
import Search from "@/component/panel/common/Search";
import Filters from "@/component/panel/common/Filter/Filter";
import InfiniteLoader from "@/component/panel/common/InfiniteLoader";
import LoadingSpinner from "@/component/ui/Loading";
import { useInfiniteDataList } from "@/hooks/useInfiniteDataList";
import { FilterConfig } from "@/component/panel/common/Filter/type";
import DateFilter from "./DateFilter/DateFilter";
import Link from "next/link";

interface Props<T> {
  queryKey: string;
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
  Ment?: boolean;
  Date?: boolean;
  NoFilter?: boolean;
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
  Ment,
  emptyComponent,
}: Props<T>) {
  const {
    data,
    params,
    setParams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDataList(queryKey, fetcher);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /** 🔹 state مخصوص ورودی سرچ (debounce) */
  const [searchInput, setSearchInput] = useState(params.search || "");

  const allResults = data?.pages.flatMap((p) => p.results) || [];

  const getBool = () => {
    return Ment || Date === true;
  };

  /** 🔹 debounce logic */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams({
        ...params,
        search: searchInput || undefined,
        page: undefined, // برای جلوگیری از تداخل با infinite scroll
      });
    }, 500); // ⏱ زمان دیبانس (می‌تونی 300 یا 700 بذاری)

    return () => clearTimeout(timeout);
  }, [searchInput]);

  return (
    <div className="max-md:pb-4 relative">
      {/* Search */}
      <div className="flex justify-between w-full gap-3">
        <Search
          Date={getBool()}
          NoFilter={NoFilter}
          variant="secondary"
          placeholder={searchPlaceholder}
          value={searchInput}
          onChange={(value) => setSearchInput(value)}
          onClick={() => setIsFilterOpen(true)}
        />

        {Date ? <DateFilter /> : null}

        {Ment ? (
          <Link
            href="/panel/profile/myMentor"
            className="bg-blue-100 p-2 rounded-xl text-custom2 border-[1.5px] border-custom hover:cursor-pointer flex w-[120px] items-center text-center justify-center"
          >
            سوابق گفتگو
          </Link>
        ) : null}
      </div>

      {/* Filters */}
      {filtersConfig.length > 0 && (
        <Filters
          config={filtersConfig}
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {/* Content */}
      <div className="mt-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : allResults.length === 0 ? (
          emptyComponent ?? null
        ) : (
          <div
            className={`grid ${
              grid4
                ? "lg:grid-cols-4 max-md:grid-cols-3"
                : grid1
                ? ""
                : "md:grid-cols-2"
            } gap-7 md:pb-4`}
          >
            {allResults.map((item: T) =>
              renderItem(item, searchInput)
            )}
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
