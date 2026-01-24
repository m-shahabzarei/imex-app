import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="md:pb-6">
      <Link
        href="/panel/blog"
        className="gap-1 mb-4 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 max-md:top-51 max-md:right-7"
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

      <div className=" shadow-[0_0_20px_rgba(0,0,0,0.12)] h-fit rounded-xl p-3">
        <div className="flex gap-4 mb-4 max-md:flex-col">
          <div className="w-fit h-fit max-md:w-full">
            <Image
              src="/image/blog.jpg"
              width={220}
              height={20}
              alt="blog"
              className="rounded-lg h-fit max-md:w-full"
            />
          </div>

          <h1 className="text-custom font-bold text-sm max-md:text-[1rem]">
            تجارت خارجی چیست ؟ نکات صادرات و...
          </h1>

          <div className="md:absolute max-md:justify-between top-14 left-3 flex gap-3">
            <div className="bg-[#efd8571f] text-[#4a4a4bbb] inline p-1 rounded text-xs">
              اخبار
            </div>
            <div className="bg-[#5764ef34] text-[#5764EF] p-1 rounded text-xs flex gap-2">
              1404/12/04
              <Image
                src="/image/calendar.svg"
                width={15}
                height={15}
                alt="calendar"
              />
            </div>
          </div>
        </div>

        <p className="text-sm">
          رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال و آینده شناخت فراوان جامعه و رم ایپسوم متن ساختگی با
          تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
          برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
          ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
          آینده شناخت فراوان جامعه و رم ایپسوم متن ساختگی با تولید سادگی نامفهوم
          از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
          روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
          تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
          باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
          جامعه و رم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
          استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
          در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و
        </p>
      </div>
    </div>
  );
}

export default page;
