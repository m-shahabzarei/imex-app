import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

// شمسی → میلادی (YYYY-MM)
export const jalaliToGregorian = (jalali?: string) => {
  if (!jalali) return undefined;

  return dayjs(jalali, "YYYY-MM")
    .calendar("jalali")
    .locale("fa")
    .calendar("gregory")
    .format("YYYY-MM");
};

// میلادی → شمسی (برای نمایش)
export const gregorianToJalali = (date?: string) => {
  if (!date) return "";

  return dayjs(date)
    .calendar("gregory")
    .calendar("jalali")
    .locale("fa")
    .format("YYYY/MM/DD");
};


export function getDateRangeByYear(year: 1403 | 1404) {
  if (year === 1403) {
    return {
      date_range_after: "2024-03-20",
      date_range_before: "2025-03-19",
    };
  }

  // 1404
  return {
    date_range_after: "2025-03-21",
    date_range_before: "2026-03-20",
  };
}
