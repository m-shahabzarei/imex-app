"use client";

import NoItem from "@/component/Error/no-item";
import Item from "@/component/panel/home/mentors/Item";
import { Imentor } from "@/component/panel/home/mentors/type";
import api from "@/lib/api";
import { useEffect, useState } from "react";


export default function Page() {
  const [items, setItems] = useState<Imentor[]>([]);

  useEffect(() => {
    api
      .get("https://api.imexapp.ir/users/consultant-request/?page=1")
      .then((res) => {
        setItems(res.data.results);
      });
  }, []);


  return (
    <div className={`flex flex-col items-center gap-7 md:pb-4`}>

      {items.map((item) => (
       <Item
          key={item.id}
          image={item.image}
          name={item.full_name}
          group={item.product_group?.title}
          progress={item.process.title}
          country={item.country.name}
          link={`/panel/home/mentors/${item.id}`}
        />
        ))}
      {!items[0] && <NoItem />}
    </div>
  );
}