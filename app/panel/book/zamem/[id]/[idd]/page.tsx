"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/api";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import LoadingSpinner from "@/component/ui/Loading";
import NoItem from "@/component/Error/no-item";

interface Iitem{
  hs_code:string;
  country: {
    title: string;
    id: number;
  };
  description_fa: string;
  direction: string;
  tariff_reduction_percent: string;
  extra_data: {
    d8_tariff_rate: string;
  };
  tariff:{
    fa_description:string;
  }
}


export default function Page() {
  const { id, idd } = useParams<{
    id: string;
    idd: string;
  }>();

  const [item, setItem] = useState<Iitem>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


const getType = (type : string)=>{
  if(type == null ){
    return "-"
  }
  if(type === "to_iran"){
    return "واردات"
  }else{
    return "صادرات"
  }
}


useEffect(() => {
  if (!id || !idd) return

  const fetchData = async () => {
    try {
      setLoading(true)

      const res = await api.get(
        `https://api.imexapp.ir/book/preferential-tariff/?page=&search=&date_after=2025-03-21&date_before=2026-03-20&country=${id}`
      )

      const foundItem = res.data.results?.find(
        (x: any) => x.id.toString() === idd
      )

      setItem(foundItem ?? null)
    } catch (err) {
      console.error(err)
      setError("خطا در دریافت اطلاعات")
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [id, idd])

console.log(item)
  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!item) return <NoItem />;

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 shadow-[0_0_20px_rgba(0,0,0,0.12)] max-md:w-[83%] w-full p-4 rounded-xl">
        <InfoBox variant="single" value={item.hs_code} label="شماره تعرفه" />
        <InfoBox variant="single" value={item.description_fa} label="شرح تعرفه" />
        <InfoBox variant="single" value={item.country.title} label="نام کشور" />
        <InfoBox variant="single" value={item.tariff.fa_description} label="شرح" />
        <InfoBox variant="single" value={getType(item.direction)} label="نوع تجارت" />
        <InfoBox variant="single" value={item.tariff_reduction_percent} label="درصد کاهش تعرفه" />
        <InfoBox variant="single" value={item.hs_code} label="شماره تعرفه Tariff No" />
      </div>
    </div>
  );
}
