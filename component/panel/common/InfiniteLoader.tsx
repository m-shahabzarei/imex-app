// components/InfiniteLoader.tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function InfiniteLoader({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { threshold: 1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  return <div ref={ref} className="h-10" />;
}
