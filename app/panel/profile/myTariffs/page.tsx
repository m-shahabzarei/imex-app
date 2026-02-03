"use client";

import Item from "@/component/panel/book/tariffs/Item";
import api from "@/lib/api";
import { useEffect, useState } from "react";

interface Iitem {
  tariff: {
    name: string;
    code: string;
    product_group: [];
    customs_duty: string;
    id: number;
    mark: {
      is_mark: boolean;
      id: number;
    };
  };
}

export default function Page() {
  const [items, setItems] = useState<Iitem[]>([]);

  useEffect(() => {
    api
      .get("https://api.imexapp.ir/users/marks/")
      .then((res) => {
        setItems(res.data.results);
      });
  }, []);


  return (
    <div className={`flex flex-col items-center gap-7 md:pb-4`}>

      {items.map((item) => (
        <Item
          key={item.tariff.id}
          name={item.tariff.name}
          code={item.tariff.code}
          product_group={item.tariff.product_group}
          customs_duty={item.tariff.customs_duty}
          isSaved={item.tariff.mark.is_mark}
          id={item.tariff.id}
          markID={item.tariff.mark.id}
        />      ))}
    </div>
  );
}