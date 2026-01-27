"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useListQuery } from "@/hooks/useListQuery";
import LoadingSpinner from "@/component/ui/Loading";
import { Iexhibition } from "@/component/panel/home/exhibition/type";
import Item from "@/component/panel/home/exhibition/Item";
import Link from "next/link";
import Image from "next/image";

interface Consultant {
  id: number;
  full_name: string;
  education: string;
  age: number;
}

export default function ExhibitionPage() {
  const [search, setSearch] = useState("");
  const [page] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useListQuery<Consultant>({
    url: "/knowledge/exhibition/",
    page,
    search: debouncedSearch,
  });

  return (
    <div className="max-md:pt-9 md:pt-3">
      {isLoading && <LoadingSpinner />}
      <Link
        href="/panel/home"
        className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 absolute -top-2 max-md:top-51 max-md:right-7"
      >
        <Image
          src="/image/Alt Arrow Left.svg"
          width={23}
          height={25}
          className="rotate-180"
          alt="arrow"
        />
        <span>بازگشت</span>
      </Link>
      <div className="grid lg:grid-cols-2 w-full gap-6 lg:pb-4">
        {data?.results.map((item: Iexhibition) => (
          <Item
            key={item.id}
            title={item.title}
            end_date={item.end_date}
            start_date={item.start_date}
            image={item.image}
            link={`/panel/home/exhibition/${item.id}`}
            location={item.location.title}
          />
        ))}
      </div>
    </div>
  );
}
