"use client";

import Item from "@/component/panel/blog/Item";
import LoadingSpinner from "@/component/ui/Loading";
import { useFetch } from "@/hooks/useFetch";

interface Iitem {
  id: number;
  title: string;
  image: string;
  description: string;
  category:{
    title:string
  };
}

export default function Page() {
  const { data, isLoading, error } = useFetch<Iitem>({
    queryKey: ["items"],
    url: "/users/knowledge/business-knowledge/",
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <LoadingSpinner error />;

  return (
    <div className="grid lg:grid-cols-2 gap-8 pb-6">
      {data?.map((item) => (
        <Item
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          category={item.category.title}
          link={`/panel/blog/${item.id}`}
        />
      ))}
    </div>
  );
}