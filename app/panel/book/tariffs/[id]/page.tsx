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

// ... (Interfaces remain the same as your code)
// برای خلاصه شدن کد اینترفیس‌ها را تکرار نکردم اما شما باید نگه دارید

function Page() {
  const { id } = useParams();
  const [data1, setData] = useState<any>(); // تایپ‌ها را مطابق کد خودتان بگذارید
  const [trade, setTrade] = useState<any>();
  const [report, setReport] = useState<any>();

  const [reportLoading, setReportLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // ... (useEffects remain the same)
  // کدهای Fetch دیتا اینجا قرار دارد (بدون تغییر) ...

  useEffect(() => {
    if (!id) return;
    Promise.all([
      api.get(`https://api.imexapp.ir/book/tariff/${id}`),
      api.get(`https://api.imexapp.ir/book/tariff/${id}/trade/`),
    ])
      .then(([resData, resTrade]) => {
        setData(resData.data);
        setTrade(resTrade.data.results[0]);
      })
      .catch((err) => console.error(err))
      .finally(() => setPageLoading(false));
  }, [id]);

  const fetchReport = useCallback(
    (filterQuery: string = "") => {
      if (!data1?.code) return;
      setReportLoading(true);
      const finalQuery = `code=${data1.code}&${filterQuery}`;
      api
        .get(`https://api.imexapp.ir/book/statistics/report/?${finalQuery}`)
        .then((res) => setReport(res.data))
        .catch((err) => console.error("Report fetch error:", err))
        .finally(() => setReportLoading(false));
    },
    [data1?.code]
  );

  useEffect(() => {
    if (data1?.code) {
      fetchReport("");
    }
  }, [data1?.code, fetchReport]);

  // ----------------------------------------------------
  // ساخت متن‌های اشتراک‌گذاری (قسمت جدید)
  // ----------------------------------------------------

  // ۱. متن اطلاعات کلی
  const generalInfoText = `
شماره تعرفه: ${data1?.code || "-"}
شرح تعرفه: ${data1?.name || "-"}
فصل: ${data1?.season?.name || "-"}
قسمت: ${data1?.section?.name || "-"}
حقوق ورودی: ${
    data1?.customs_duty
      ? `حقوق گمرکی ${data1?.customs_duty}% + سود بازرگانی ${data1?.commercial_profit}%`
      : "-"
  }
واحد: ${data1?.unit || "-"}
  `.trim();

  // ۲. متن تعرفه ترجیحی
  const tradeText = trade
    ? `
کشور: ${trade?.country?.title || "-"}
نوع: ${trade?.direction || "-"}
شرح: ${trade?.description_fa || "-"}
نرخ D8: ${trade?.extra_data?.d8_tariff_rate || "-"}
درصد کاهش: ${trade?.tariff_reduction_percent || "-"}
  `.trim()
    : "اطلاعاتی موجود نیست";

  // ۳. متن آمار (مشابه عکس اولی که فرستادید)
  const reportText = `
شماره تعرفه: ${data1?.code || "-"}
شرح تعرفه: ${data1?.name || "-"}

مجموع وزن (U): ${(report?.total_weight ?? 0).toLocaleString("fa-IR")}
فی (ریالی): ${Math.floor(report?.per_unit_toman ?? 0).toLocaleString("fa-IR")}
فی (ارزی): ${Math.floor(report?.per_unit_dollar ?? 0).toLocaleString("fa-IR")}
مجموع ارزش (ریال): ${Math.floor(
    report?.total_price_in_toman ?? 0
  ).toLocaleString("fa-IR")}
مجموع ارزش (دلار): ${Math.floor(
    report?.total_price_in_dollar ?? 0
  ).toLocaleString("fa-IR")}
  `.trim();

  // ۴. متن یادداشت فصل (مشابه عکس دوم)
  const seasonNoteText = `
یادداشت فصل:
${data1?.season?.description || "-"}
  `.trim();

  // ۵. متن منابع (مشابه عکس سوم)
  const resourcesText = `
منابع:
- سایت رسمی گمرک ایران
- کتاب مقررات صادرات و واردات ۱۴۰۴
  `.trim();

  // ----------------------------------------------------

  if (pageLoading) return <LoadingSpinner />;

  return (
    <div
      className="w-full max-md:flex max-md:flex-col max-md:items-center md:grid md:grid-cols-2 gap-8 md:gap-20 justify-center max-md:pt-12"
      dir="rtl"
    >
      {/* Right Column */}
      <div className="md:w-[120%] w-[83%] flex flex-col gap-8">
        {/* اطلاعات کلی */}
        <Accordion
          title="اطلاعات کلی"
          defaultOpen
          share
          shareText={generalInfoText}
        >
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

        {/* تعرفه های ترجیحی */}
        <Accordion title="تعرفه های ترجیحی" share shareText={tradeText}>
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

        {/* آمار صادرات و واردات */}
        <Accordion title="آمار صادرات و واردات" share shareText={reportText}>
          {report?.total_weight ? (
            <>
              {data1?.code && (
                <AdvancedFilter onApply={fetchReport} hiddenFields={["code"]} />
              )}

              <div className="flex flex-col gap-3 mb-3">
                <InfoBox
                  variant="single"
                  label="شماره تعرفه"
                  value={data1?.code}
                />
                <InfoBox
                  variant="single"
                  label="شرح تعرفه"
                  value={data1?.name}
                />
              </div>

              {reportLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-pulse text-blue-600 text-sm">
                    در حال بروزرسانی آمار...
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                  <div className="flex gap-3 mt-3">
                    <InfoBox
                      variant="single"
                      label="مجموع وزن(U)"
                      value={(report?.total_weight ?? 0).toLocaleString(
                        "fa-IR"
                      )}
                    />
                    <InfoBox
                      variant="single"
                      label="مجموع ارزش(ریال)"
                      value={Math.floor(
                        report?.total_price_in_toman ?? 0
                      ).toLocaleString("fa-IR")}
                    />
                    <InfoBox
                      variant="single"
                      label="مجموع ارزش(دلار)"
                      value={Math.floor(
                        report?.total_price_in_dollar ?? 0
                      ).toLocaleString("fa-IR")}
                    />
                  </div>
                  <div className="flex gap-3 mt-3">
                    <InfoBox
                      variant="single"
                      label="فی(ریالی)"
                      value={Math.floor(
                        report?.per_unit_toman ?? 0
                      ).toLocaleString("fa-IR")}
                    />
                    <InfoBox
                      variant="single"
                      label="فی(ارزی)"
                      value={Math.floor(
                        report?.per_unit_dollar ?? 0
                      ).toLocaleString("fa-IR")}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <NoItem />
          )}
        </Accordion>
      </div>

      {/* Left Column */}
      <div className="md:w-[80%] w-[83%] md:mr-20  flex flex-col gap-8">
        {/* یادداشت های فصل */}
        <Accordion
          title="یادداشت های فصل"
          defaultOpen
          share
          shareText={seasonNoteText}
        >
          <div className="overflow-hidden ">
            <div className="text-[0.9rem] p-3 opacity-80 text-gray-700">
              <p className="whitespace-pre-line">{data1?.season.description}</p>
            </div>
          </div>
        </Accordion>

        {/* منابع */}
        <Accordion title="منابع" share shareText={resourcesText}>
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
