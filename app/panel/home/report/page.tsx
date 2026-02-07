/* eslint-disable react-hooks/set-state-in-effect */
// "use client"
// import InfoBox from "@/component/panel/book/tariffs/InfoBox";
// import api from "@/lib/api";
// import React, { useEffect, useState } from "react";


// interface IReport {
//   total_weight: number;
//   total_price_in_toman: number;
//   total_price_in_dollar: number;
//   last_month: number;
//   per_unit_toman: number;
//   per_unit_dollar: number;
// }

// function Page() {
// const [report, setReport] = useState<IReport>()

// useEffect(()=>{
//         api
//       .get(`https://api.imexapp.ir/book/statistics/report/`)
//       .then((res) => setReport(res.data));
// },[])

//   return (
//     <div>
//       <div>
//         <div className="flex gap-3 mt-3">
//           <InfoBox
//             variant="single"
//             label="مجموع وزن(U)"
//             value={report?.total_weight}
//           />
//           <InfoBox
//             variant="single"
//             label="مجموع ارزش(ریال)"
//             value={report?.total_price_in_toman}
//           />
//           <InfoBox
//             variant="single"
//             label="مجموع ارزش(دلار)"
//             value={report?.total_price_in_dollar}
//           />
//         </div>
//         <div className="flex gap-3 mt-3">
//           <InfoBox
//             variant="single"
//             label="فی(ریالی)"
//             value={report?.per_unit_toman}
//           />
//           <InfoBox
//             variant="single"
//             label="فی(ارزی)"
//             value={report?.per_unit_dollar}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;









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
       

        {/* ۱. کامپوننت فیلتر */}
        {/* وقتی دکمه اعمال زده شود، fetchReport با پارامترهای جدید صدا زده می‌شود */}
        <AdvancedFilter onApply={fetchReport} />

        {/* ۲. نمایش نتایج */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-pulse text-blue-600 font-bold">در حال بروزرسانی آمار...</div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <h3 className="text-right font-bold mb-3 text-gray-700 px-1 border-r-4 border-blue-500 mr-1">
              نتایج گزارش
            </h3>
            
            {/* ردیف اول باکس‌ها */}
            <div className="flex flex-wrap gap-3 mb-3">
              <InfoBox
              variant="single"
                label="مجموع وزن (Kg)"
                value={report?.total_weight}
              />
              <InfoBox
              variant="single"
                label="ارزش کل (ریال)"
                value={report?.total_price_in_toman}
              />
              <InfoBox
              variant="single"
                label="ارزش کل (دلار)"
                value={report?.total_price_in_dollar}
              />
            </div>

            {/* ردیف دوم باکس‌ها */}
            <div className="flex flex-wrap gap-3">
              <InfoBox
              variant="single"
                label="فی (ریالی)"
                value={report?.per_unit_toman}
              />
              <InfoBox
              variant="single"
                label="فی (ارزی)"
                value={report?.per_unit_dollar}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Page;