/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";
import NoItem from "@/component/Error/no-item";
import Accordion from "@/component/panel/book/tariffs/Accordion";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AdvancedFilter from "@/component/panel/common/AdvanceFilter/AdvancedFilter";
import LoadingSpinner from "@/component/ui/Loading";

interface IData {
  name: string;
  code: string;
  id: number;
  season: {
    name: string;
    description: string;
  };
  product_group: { tariffCode: string; faDescription: string }[];
  section: {
    name: string;
  };
  commercial_profit: string;
  customs_duty: string;
  unit: string;
}

interface ITrade {
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
}

interface IReport {
  total_weight: number;
  total_price_in_toman: number;
  total_price_in_dollar: number;
  last_month: number;
  per_unit_toman: number;
  per_unit_dollar: number;
}

function Page() {
  const { id } = useParams();
  const [data1, setData] = useState<IData>();
  const [trade, setTrade] = useState<ITrade>();
  const [report, setReport] = useState<IReport>();
  
  const [reportLoading, setReportLoading] = useState(false); 
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      api.get(`https://api.imexapp.ir/book/tariff/${id}`),
      api.get(`https://api.imexapp.ir/book/tariff/${id}/trade/`)
    ])
    .then(([resData, resTrade]) => {
      setData(resData.data);
      setTrade(resTrade.data.results[0]);
    })
    .catch(err => console.error(err))
    .finally(() => setPageLoading(false));

  }, [id]);

  const fetchReport = useCallback((filterQuery: string = "") => {
    if (!data1?.code) return;

    setReportLoading(true);
    const finalQuery = `code=${data1.code}&${filterQuery}`;

    api
      .get(`https://api.imexapp.ir/book/statistics/report/?${finalQuery}`)
      .then((res) => setReport(res.data))
      .catch((err) => console.error("Report fetch error:", err))
      .finally(() => setReportLoading(false));
  }, [data1?.code]);

  useEffect(() => {
    if (data1?.code) {
      fetchReport("");
    }
  }, [data1?.code, fetchReport]);


  if (pageLoading) return <LoadingSpinner />;

  return (
    <div className="w-full py-5 md:py-20 md:pr-16 max-md:flex max-md:flex-col max-md:items-center md:grid md:grid-cols-2 gap-8 md:gap-20 justify-center max-md:pt-12" dir="rtl">
      <Link href="/panel/book/tariffs" className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 absolute top-12 max-md:top-51 max-md:right-7" >
        <Image src="/image/Alt Arrow Left.svg" width={23} height={25} className="rotate-180" alt="arrow" />
        <span>بازگشت</span>
      </Link>

      {/* Right Column */}
      <div className="md:w-[120%] w-[83%] flex flex-col gap-8">
        
        <Accordion title="اطلاعات کلی" defaultOpen share>
          <div className="w-full mt-4">
            <div className="flex gap-4">
              <InfoBox variant="single" label={"شماره تعرفه"} value={data1?.code} />
              <InfoBox variant="single" label={"قسمت"} value={data1?.section.name} />
              <InfoBox variant="single" label={"فصل"} value={data1?.season.name} />
            </div>
          </div>
          <div className="w-full mt-4">
            <InfoBox variant="single" label={"شرح تعرفه"} value={data1?.name} />
          </div>
          <div className="w-full mt-4">
             <InfoBox
            variant="single"
            label={"حقوق ورودی"}
            value={
                data1?.customs_duty
                ? `حقوق گمرکی ${data1?.customs_duty} % + سودبازرگانی ${data1?.commercial_profit} % `
                : "-"
            }
            />
          </div>
           <div className="w-full mt-4">
            <div className="flex gap-4">
            <InfoBox
                variant="single"
                label={"واحد"}
                value={data1?.unit ? data1.unit : "-"}
            />
            </div>
          </div>
        </Accordion>

        <Accordion title="تعرفه های ترجیحی" share>
          {trade ? (
            <InfoBox
              CountryID={trade?.country.id}
              CountryName={trade?.country.title}
              type={trade?.direction}
              description={trade?.description_fa}
              tariffRate={trade?.extra_data?.d8_tariff_rate}
              tariffPrecent={trade?.tariff_reduction_percent}
              variant="frame"
            />
          ) : (
            <NoItem />
          )}
        </Accordion>

        <Accordion title="آمار صادرات و واردات" share>
          {data1?.code && (
            <AdvancedFilter 
              onApply={fetchReport} 
              hiddenFields={['code']} 
            />
          )}

          <div className="flex flex-col gap-3 mb-3">
            <InfoBox variant="single" label="شماره تعرفه" value={data1?.code} />
            <InfoBox variant="single" label="شرح تعرفه" value={data1?.name} />
          </div>

          {reportLoading ? (
             <div className="flex justify-center items-center py-8">
                 <div className="animate-pulse text-blue-600 text-sm">در حال بروزرسانی آمار...</div>
             </div>
          ) : (
            <div className="animate-in fade-in duration-500">
                {/* 
                   تغییرات اصلی اینجا انجام شد:
                   استفاده از (value ?? 0) باعث می‌شود اگر مقدار undefined یا null بود، عدد 0 جایگزین شود.
                   این کار هم مشکل تایپ‌اسکریپت با Math.floor را حل می‌کند و هم مشکل toLocaleString
                */}
                <div className="flex gap-3 mt-3">
                    <InfoBox variant="single" label="مجموع وزن(U)" value={(report?.total_weight ?? 0).toLocaleString("fa-IR")} />
                    <InfoBox variant="single" label="مجموع ارزش(ریال)" value={Math.floor(report?.total_price_in_toman ?? 0).toLocaleString("fa-IR")} />
                    <InfoBox variant="single" label="مجموع ارزش(دلار)" value={Math.floor(report?.total_price_in_dollar ?? 0).toLocaleString("fa-IR")} />
                </div>
                <div className="flex gap-3 mt-3">
                    <InfoBox variant="single" label="فی(ریالی)" value={Math.floor(report?.per_unit_toman ?? 0).toLocaleString("fa-IR")} />
                    <InfoBox variant="single" label="فی(ارزی)" value={Math.floor(report?.per_unit_dollar ?? 0).toLocaleString("fa-IR")} />
                </div>
            </div>
          )}
        </Accordion>
      </div>

      {/* Left Column */}
      <div className="md:w-[70%] w-[83%] md:mr-20 flex flex-col gap-8">
         <Accordion title="یادداشت های فصل" defaultOpen share>
            <div className="overflow-hidden ">
                <div className="text-[0.9rem] p-3 opacity-80 text-gray-700">
                <p className="whitespace-pre-line">{data1?.season.description}</p>
                </div>
            </div>
         </Accordion>
         <Accordion title="منابع" share>
            <div className=" ">
                <ul className="list-item text-sm space-y-2">
                <li> - سایت رسمی گمرک ایران </li>
                <li> - کتاب مقررات صادرات و واردات 1404</li>
                </ul>
            </div>
        </Accordion>
      </div>
    </div>
  );
}

export default Page;