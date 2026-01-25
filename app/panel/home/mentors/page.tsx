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
import Search from "@/component/panel/common/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { useListQuery } from "@/hooks/useListQuery";

interface Consultant {
  id: number;
  full_name: string;
  age: string;
}

export default function ConsultantsPage() {
  const [search, setSearch] = useState("");
  const [page] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useListQuery<Consultant>({
    url: "/consultants/",
    page,
    search: debouncedSearch,
  });
  console.log(data)

  return (
    <div className="p-6">
      <Search
        variant="secondary"
        placeholder="جستجوی مشاور..."
        value={search}
        onChange={setSearch}
      />

      {isLoading && <p className="mt-4">در حال دریافت اطلاعات...</p>}

      <ul className="mt-6 space-y-3">
        {data?.results.map((item) => (
          <li key={item.id} className="border p-4 rounded-xl">
            <p>{item.full_name}</p>
            <p className="text-gray-400">{item.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

