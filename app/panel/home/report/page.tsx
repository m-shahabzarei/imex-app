
"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import AdvancedFilter from "@/component/panel/common/AdvanceFilter/AdvancedFilter";

interface IReport {
  total_weight: number;
  total_price_in_toman: number;
  total_price_in_dollar: number;
  last_month: number;
  per_unit_toman: number;
  per_unit_dollar: number;
}

function Page() {
  const [report, setReport] = useState<IReport>();
  const [loading, setLoading] = useState(false);

  // تابع اصلی دریافت اطلاعات گزارش
  // این تابع کوئری استرینگ ساخته شده توسط فیلتر را میگیرد
  const fetchReport = (queryString: string = "") => {
    setLoading(true);
    
    // درخواست به آدرس اصلی گزارش + فیلترها
    api
      .get(`/book/statistics/report/?${queryString}`)
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // بارگذاری اولیه (بدون فیلتر)
  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" dir="rtl">
      <div className="max-w-3xl mx-auto">
        
        {/* هدر صفحه */}
        <div className=" p-4 rounded-xl mb-6 shadow-sm">
           <h1 className="text-custom2 font-bold text-right">آمار صادرات و واردات</h1>
        </div>

        {/* ۱. کامپوننت فیلتر */}
        {/* وقتی دکمه اعمال زده شود، fetchReport با پارامترهای جدید صدا زده می‌شود */}
        <AdvancedFilter onApply={fetchReport} />

        {/* ۲. نمایش نتایج */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-pulse text-blue-600 font-bold">در حال بروزرسانی آمار...</div>
          </div>
        ) : (
          <div className="animate-in fade-in flex flex-col duration-500">
            <h3 className="text-right font-bold mb-3 text-gray-700 px-1 border-r-4 border-blue-500 mr-1">
              نتایج گزارش
            </h3>
            
                <div className="flex gap-3 mt-3 max-md:flex-col">
                    <InfoBox variant="single" label="مجموع وزن(U)" value={report?.total_weight?.toLocaleString("fa-IR")} />
                    <InfoBox variant="single" label="مجموع ارزش(ریال)" value={Math.floor(report?.total_price_in_toman).toLocaleString("fa-IR")} />
                    <InfoBox variant="single" label="مجموع ارزش(دلار)" value={Math.floor(report?.total_price_in_dollar).toLocaleString("fa-IR")} />
                </div>
                <div className="flex gap-3 mt-3">
                    <InfoBox variant="single" label="فی(ریالی)" value={Math.floor(report?.per_unit_toman).toLocaleString("fa-IR")} />
                    <InfoBox variant="single" label="فی(ارزی)" value={Math.floor(report?.per_unit_dollar).toLocaleString("fa-IR")} />
                </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Page;