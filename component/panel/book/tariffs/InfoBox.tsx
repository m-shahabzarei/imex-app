interface InfoBoxProps {
  label?: string | undefined;
  value?: string | undefined;
  variant: "single" | "frame";
}

function InfoBox({ label, value, variant }: InfoBoxProps) {
  if (variant === "single") {
    return (
      <div className="border-[1.4px] border-gray-300 py-3 px-2 rounded-xl flex flex-col justify-between items-start w-full gap-3 text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="block text-gray-500 text-[0.8rem]">{value}</span>
      </div>
    );
  } else if (variant === "frame") {
    return (
      <div className="border-[1.4px] border-gray-300 py-3 px-4 rounded-xl flex flex-col justify-between items-start w-full gap-9 text-xs">
        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">کد کشور دارنده تعرفه ترجیحی</span>
            <span className="block text-gray-500 text-[0.8rem]">8</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">نام کشور</span>
            <span className="block text-gray-500 text-[0.8rem]">
              دولت جمهوری تونس
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">شماره تعرفه</span>
            <span className="block text-gray-500 text-[0.8rem]">10212354</span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">شرح تعرفه</span>
            <span className="block text-gray-500 text-[0.8rem]">اسب برای سوارکاری</span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">سهمیه فصلی(تن)</span>
            <span className="block text-gray-500 text-[0.8rem]">1000</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">طول مدت واردات</span>
            <span className="block text-gray-500 text-[0.8rem]">
              1 جولای - 15 اکتبر
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">حقوق گمرکی</span>
            <span className="block text-gray-500 text-[0.8rem]">0،49/1</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">درصد کاهش تعرفه</span>
            <span className="block text-gray-500 text-[0.8rem]">
              40%
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">تعرفه پس از اعمال کاهش</span>
            <span className="block text-gray-500 text-[0.8rem]">29/46</span>
          </div>
        </div>
      </div>
    );
  }
}
export default InfoBox;
