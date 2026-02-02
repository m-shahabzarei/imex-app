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
