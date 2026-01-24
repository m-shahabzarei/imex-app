import Accordion from "@/component/panel/book/tariffs/Accordion";
import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="md:bg-gray-100 w-full md:h-[900px] py-5 md:py-20 md:pr-16 max-md:flex max-md:flex-col max-md:items-center md:grid md:grid-cols-2 gap-8 md:gap-20 justify-center max-md:pt-12">
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
                value={"01239900"}
              />
              <InfoBox
                variant="single"
                label={"قسمت"}
                value={"حیوانات زنده؛محصولات حیوانی"}
              />
              <InfoBox variant="single" label={"فصل"} value={"حیوانات زنده"} />
            </div>
          </div>

          <div className="w-full mt-4">
            <InfoBox
              variant="single"
              label={"شرح تعرفه"}
              value={"اسب برای مسابقه"}
            />
          </div>

          <div className="w-full mt-4">
            <div className="flex gap-4">
              <div className="border-[1.4px] border-gray-300 py-3 px-2 rounded-xl flex flex-col justify-between items-start w-full gap-2 text-xs">
                <span className="text-gray-400">اطلاعات گروه</span>
                <div className="flex flex-col justify-evenly max-md:justify-between text-gray-500 text-xs gap-1 opacity-95">
                  <span>01 حیوان زنده</span>
                  <span>0101 اسب، الاغ، قاطر و استر،زنده</span>
                  <span>010121 - - حیوانات مولد نژاد خالص</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-4">
            <InfoBox
              variant="single"
              label={"حقوق ورودی"}
              value={"حقوق گمرکی 4% + سودبازرگانی 0% = (مجموع 4%)"}
            />
          </div>

          <div className="w-full mt-4">
            <div className="flex gap-4">
              <InfoBox variant="single" label={"واحد"} value={"راس"} />
              <InfoBox
                variant="single"
                label={"کد کشور دارنده تعرفه ترجیحی"}
                value={"-"}
              />
              <InfoBox variant="single" label={"ملاحظات"} value={"-"} />
            </div>
          </div>
        </Accordion>

        <Accordion title="تعرفه های ترجیحی" share>
          <InfoBox variant="frame" />
        </Accordion>

        <Accordion title="آمار صادرات و واردات" share>
          <div className="flex flex-col gap-3">
            <InfoBox variant="single" label="شماره تعرفه" value="021431234" />
            <InfoBox
              variant="single"
              label="شرح تعرفه"
              value="اسب از نژاد مولد جنسیت نریان - سن 2008 - رنگ نیه - نوع تولیدی"
            />
          </div>

          <div className="flex gap-3 mt-3">
            <InfoBox
              variant="single"
              label="مجموع وزن(کیلو
            رم)"
              value="435"
            />
            <InfoBox variant="single" label="مجموع ارزش(ریال)" value="435" />
            <InfoBox variant="single" label="مجموع ارزش(دلار)" value="435" />
          </div>
        </Accordion>
      </div>

      {/* Left */}
      <div className="md:w-[70%] w-[83%] md:mr-20 flex flex-col gap-8">
        <Accordion title="یادداشت های فصل" defaultOpen share>
          <div className="overflow-hidden ">
            <p className="text-[0.9rem] p-3 opacity-80 text-gray-700">
              1.این فصل شامل تمام حیوانات زنده است،به استثنای:الف- ماهی هاو
              قشرداران ، صدفداران و سایر آبزیان فاقد ستون فقرات ، ؛0308 ،0307
              ،0306 ، شمارههای 0301 ب- کشتهای موجودات زیرزمینی و سایر محصولات
              شماره 3020 ؛ و . ج- حیوانات شماره 9508 0 ورود حیوانات زنده مشمول
              ردیفهای 01031000 الی 1039200 ممنوع می با شد . (*) وورد س گ و گ ربه
              م م نو عا س ت م گ ر برا ی تح قیق ا ت پ زش کی ، آمز ایشگ اهی و س رم
              س ازی و همچ نین س گه ای تربیت ش د ه پلیس ، س گهای را هنما برا ی رو
              ش ندلان که د ر این ص ور ت با م و اف قت وزار ت صنعت ، م عدن و ت ج
              ار ت ، پ س از کسب ن ظ ر س ازم ان دو لتی ذی رب ط مجاز خ و ا هد بود
              . وورد و صدورم وجودا ت زن د ه تغ ییر شکل یاف ته ژنتیکی و م حص ولات
              تراریخته ملزم به رعایت مفاد قانون ملی ایمنی زیستی با کسب مجوز قلبی
              از وزارت ج ه اد کش اورزی می با شد
            </p>
          </div>
        </Accordion>

        <Accordion title="ارزش های صادراتی" share>
          <div className="w-full mt-4">
            <div className="flex gap-4">
              <InfoBox variant="single" label={"ردیف ثبتی"} value={"59328"} />
              <InfoBox variant="single" label={"ردیف"} value={"-"} />
            </div>
          </div>

          <div className="w-full mt-4">
            <InfoBox variant="single" label={"مارک تجاری کالا"} value={"-"} />
          </div>

          <div className="w-full mt-4">
            <div className="flex gap-4">
              <InfoBox variant="single" label={"واحد"} value={"راس"} />
              <InfoBox variant="single" label={"دلار"} value={"دلار"} />
              <InfoBox variant="single" label={"ارزش گمرکی"} value={"36"} />
            </div>
          </div>

          <div className="w-full mt-4">
            <div className="flex gap-4">
              <InfoBox variant="single" label={"شماره مصوبه"} value={"36"} />
              <InfoBox
                variant="single"
                label={"تاریخ مصوبه"}
                value={"1403/09/02"}
              />
              <InfoBox variant="single" label={"نوع قیمت گذاری"} value={"-"} />
            </div>
          </div>
        </Accordion>

        <Accordion title="قوانین و آیین نامه ها" share>
          <div className=" ">
            <h1 className="font-bold text-[0.9rem] px-3">
              پایان آیین ﻧﺎﻣﻪ اﺟﺮای ﻗﺎﻧﻮن ﻣﻘﺮرات ﺻﺎدرات و واردات
            </h1>
            <p className="text-[0.9rem] p-3 opacity-80 text-gray-700">
              1.این فصل شامل تمام حیوانات زنده است،به استثنای:الف- ماهی هاو
              قشرداران ، صدفداران و سایر آبزیان فاقد ستون فقرات ، ؛0308 ،0307
              ،0306 ، شمارههای 0301 ب- کشتهای موجودات زیرزمینی و سایر محصولات
              شماره 3020 ؛ و . ج- حیوانات شماره 9508 0 ورود حیوانات زنده مشمول
              ردیفهای 01031000 الی 1039200 ممنوع می با شد . (*) وورد س گ و گ ربه
              م م نو عا س ت م گ ر برا ی تح قیق ا ت پ زش کی ، آمز ایشگ اهی و س رم
              س ازی و همچ نین س گه ای تربیت ش د ه پلیس ، س گهای را هنما برا ی رو
              ش ندلان که د ر این ص ور ت با م و اف قت وزار ت صنعت ، م عدن و ت ج
              ار ت ، پ س از کسب ن ظ ر س ازم ان دو لتی ذی رب ط مجاز خ و ا هد بود
              . وورد و صدورم وجودا ت زن د ه تغ ییر شکل یاف ته ژنتیکی و م حص ولات
              تراریخته ملزم به رعایت مفاد قانون ملی ایمنی زیستی با کسب مجوز قلبی
              از وزارت ج ه اد کش اورزی می با شد
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default page;
