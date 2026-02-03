/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Iitem {
  search_text: string | undefined;
  rule_text: string;
  html_text: string;
}

export default function Page() {
  const { id } = useParams<{
    id: string;
  }>();

  const [item, setItem] = useState<Iitem>();

  useEffect(() => {
    api
      .get(`https://api.imexapp.ir/book/rule/${id}`)
      .then((res) => setItem(res.data));
  }, [id]);


  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 shadow-[0_0_20px_rgba(0,0,0,0.12)] max-md:w-[83%] w-full p-4 rounded-xl">
        <h1 className="text-custom2 font-bold">{item?.rule_text}</h1>
        <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">{item?.search_text}</p>
      </div>
    </div>
  );
}
