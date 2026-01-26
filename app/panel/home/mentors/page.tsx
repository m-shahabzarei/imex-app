// import Item from '@/component/panel/home/mentors/Item'

// function page() {
//   return (
//     <div>
//         <Item image="/image/blog.jpg" name={'منوچهر پوررحیم'} country={'ایران'} progress={"حسابرسی و ممیزی مالیاتی و بیمه"} group={'محصولات نفت ، گاز و پتروشیمی'} />

//     </div>
//   )
// }

// export default page

// src/app/consultants/page.tsx
"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useListQuery } from "@/hooks/useListQuery";
import Item from "@/component/panel/home/mentors/Item";
import LoadingSpinner from "@/component/ui/Loading";
import { Imentor } from "@/component/panel/home/mentors/type";

interface Consultant{
  id: number;
  full_name: string;
  education: string;
  age: number;
}

export default function ConsultantsPage() {
  const [search, setSearch] = useState("");
  const [page] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useListQuery<Consultant>({
    url: "/users/consultants/",
    page,
    search: debouncedSearch,
  });

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className="grid w-full lg:grid-cols-2 gap-6">
        {data?.results.map((item:Imentor) => (
          <Item
            key={item.id}
            image={item.image}
            name={item.full_name}
            group={item.product_group.title}
            progress={item.process.title}
            country={item.country.name}
            link={`/panel/home/mentors/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
