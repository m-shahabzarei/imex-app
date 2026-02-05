"use client";
import NoItem from "@/component/Error/no-item";
import Accordion from "@/component/panel/book/tariffs/Accordion";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TariffFilters } from "./tariffs.filters";
import AdvancedFilter from "@/component/panel/common/AdvanceFilter/AdvancedFilter";
import { useQuery } from "@tanstack/react-query";
import { FilterState, getTrades } from "@/component/panel/common/AdvanceFilter/filter.service";

interface IData {
  name: string;
  code: string;
  id: number;
  season: {
    name: string;
    description: string;
  };
  product_group: [];
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
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    if (!id) return;
    api
      .get(`https://api.imexapp.ir/book/tariff/${id}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));

    api
      .get(`https://api.imexapp.ir/book/tariff/${id}/trade/`)
      .then((res) => setTrade(res.data.results[0]));

    api
      .get(`https://api.imexapp.ir/book/tariff/${id}/statistics/report/`)
      .then((res) => setReport(res.data));
  }, [id]);

  return (
    <div className="w-full py-5 md:py-20 md:pr-16 max-md:flex max-md:flex-col max-md:items-center md:grid md:grid-cols-2 gap-8 md:gap-20 justify-center max-md:pt-12">
      <Link
        href="/panel/book/tariffs"
        className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 absolute top-12 max-md:top-51 max-md:right-7"
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

      {/* Right */}
      <div className="md:w-[120%] w-[83%] flex flex-col gap-8">
        <Accordion title="اطلاعات کلی" defaultOpen share>
          <div className="w-full mt-4">
            <div className="flex gap-4">
              <InfoBox
                variant="single"
                label={"شماره تعرفه"}
                value={data1?.code}
              />
              <InfoBox
                variant="single"
                label={"قسمت"}
                value={data1?.section.name}
              />
              <InfoBox
                variant="single"
                label={"فصل"}
                value={data1?.season.name}
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <InfoBox variant="single" label={"شرح تعرفه"} value={data1?.name} />
          </div>

          <div className="w-full mt-4">
            <div className="flex gap-4">
              <div className="border-[1.4px] border-gray-300 py-3 px-2 rounded-xl flex flex-col justify-between items-start w-full gap-2 text-xs">
                <span className="text-gray-400">اطلاعات گروه</span>
                <div className="flex flex-col justify-evenly max-md:justify-between text-gray-500 text-xs gap-1 opacity-95">
                  {data1?.product_group.map(
                    (
                      {
                        tariffCode,
                        faDescription,
                      }: { tariffCode: string; faDescription: string },
                      index
                    ) => (
                      <span key={index}>
                        {tariffCode} {faDescription}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
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
              {/* <InfoBox
                variant="single"
                label={"کد کشور دارنده تعرفه ترجیحی"}
                value={"-"}
              />
              <InfoBox variant="single" label={"ملاحظات"} value={"-"} /> */}
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
          {/* محل نمایش  فیلتر پیشرفته  */}


          <div className="flex flex-col gap-3">
            <InfoBox variant="single" label="شماره تعرفه" value={data?.code} />
            <InfoBox variant="single" label="شرح تعرفه" value={data?.name} />
          </div>

          <div className="flex gap-3 mt-3">
            <InfoBox
              variant="single"
              label="مجموع وزن(U)"
              value={report?.total_weight}
            />
            <InfoBox
              variant="single"
              label="مجموع ارزش(ریال)"
              value={report?.total_price_in_toman}
            />
            <InfoBox
              variant="single"
              label="مجموع ارزش(دلار)"
              value={report?.total_price_in_dollar}
            />
          </div>
          <div className="flex gap-3 mt-3">
            <InfoBox
              variant="single"
              label="فی(ریالی)"
              value={report?.per_unit_toman}
            />
            <InfoBox
              variant="single"
              label="فی(ارزی)"
              value={report?.per_unit_dollar}
            />
          </div>
        </Accordion>
      </div>

      {/* Left */}
      <div className="md:w-[70%] w-[83%] md:mr-20 flex flex-col gap-8">
        <Accordion title="یادداشت های فصل" defaultOpen share>
          <div className="overflow-hidden ">
            <p className="text-[0.9rem] p-3 opacity-80 text-gray-700">
              <p className="whitespace-pre-line">{data1?.season.description}</p>
            </p>
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
