import Button from "@/component/ui/Button";
import Image from "next/image";

function NoSub() {
  return (
    <div className="w-full max-md:py-5">
      <div className="w-full grid lg:grid-cols-2 h-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src="/image/24.svg" width={210} height={260} alt="no-sub" />
          <h1 className="text-custom font-bold text-lg">شما اشتراک ندارید!</h1>
          <p className="text-xs text-gray-400">
            برای مشاهده این بخش نیاز به تهیه اشتراک دارید.
          </p>
        </div>
        <div className="p-10 flex flex-col gap-4 items-center justify-center">
          <div className="w-full bg-white m-2 shadow-[0_0_20px_rgba(0,0,0,0.12)] p-3 flex flex-col  gap-3 rounded-xl">
            <h1 className="text-center text-sm font-bold mb-3">
              چرا اشتراک بخریم؟
            </h1>
            <p className="text-sm text-left text-gray-500 flex justify-between">
              <Image
                src="/image/document.svg"
                width={19}
                height={22}
                alt="book icon"
                className="invert -mt-3 contrast-[10]"
              />
              داده های معتبر و به روز بوسیله اطلاعات کامل کتاب مقررات صادرات و
              واردات
            </p>
            <p className="text-sm text-left text-gray-500 flex justify-between">
              <Image
                src="/image/search-normal.svg"
                width={19}
                height={22}
                alt="search icon"
                className="invert contrast-[10]"
              />
              صرفه جویی در زمان با جستجوی پیشرفته و حرفه ای در تعرفه ها
            </p>
            <p className="text-sm text-left text-gray-500 flex justify-between">
              <Image
                src="/image/bookmark-2.svg"
                width={19}
                height={22}
                alt="book icon"
                className="invert -mt-3 contrast-[10]"
              />
              مدیریت آسان تعرفه های موردعلاقه با امکان نشان گذاری تعرفه های مهم
            </p>
            <p className="text-sm text-left text-gray-500 flex justify-between">
              <Image
                src="/image/Chart Square.svg"
                width={19}
                height={22}
                alt="book icon"
                className="-mt-3"
              />
              مشاهده آمار دقیق صادرات و واردات هر تعرفه
            </p>
            <div className="text-center flex items-center justify-center font-bold text-xs my-3">
              <p className="w-3/4">
                همین حالا اشتراک ویژه را فعال کنید و از تمامی امکانات حرفه ای
                اپلیکیشن بهره مند شوید
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <Button variant="glassy">بازگشت به خانه</Button>
            <Button variant="secondary"> خرید اشتراک</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoSub;
