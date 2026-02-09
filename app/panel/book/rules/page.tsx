"use client";
import NoItem from "@/component/Error/no-item";
import Accordion from "@/component/panel/book/tariffs/Accordion";
import DataListWithFilters from "@/component/panel/common/DataListWithFilters";
import HighlightText from "@/component/panel/common/HighlightText";
import LoadingSpinner from "@/component/ui/Loading";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IData {
  id: number;
  rule_text: string;
  search_text: string;
}

const getRules = async (): Promise<{ results: IData[]; next: number | null }> => {
  const res = await api.get(`https://api.imexapp.ir/book/rule/`);

  return {
    results: Array.isArray(res.data.results) ? res.data.results : [],
    next: null, // چون pagination نداره
  };
};


function Item() {
  const [data, setData] = useState<IData[]>();
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(null);

  useEffect(() => {
    api.get("https://api.imexapp.ir/book/rule/").then((res) => setCount(res.data.count));
  }, []);

  console.log(data);

  return (
    <>
      <DataListWithFilters<IData>
        count={count}
        NoFilter
        Date
        grid1
        queryKey="Rules"
        fetcher={getRules}
        searchPlaceholder="جستجو در تعرفه ها،ارزش ها و ..."
        emptyComponent={<NoItem />}
        renderItem={(item, search) => (
          <Link href={`${item.id}`} key={item.id}>
            <div className="overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.12)] p-4 rounded-xl text-custom2 font-bold">
              <HighlightText highlight={search} text={item.rule_text} />
            </div>
          </Link>
        )}
      />
    </>
  );
}

export default Item;
