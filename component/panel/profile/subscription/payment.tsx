import Button from '@/component/ui/Button'
import Image from 'next/image'
import React from 'react'

function Payment() {
  return (
    <div className="bg-linear-to-b  from-[#5764EF] to-[#3E47AD] w-screen h-screen flex items-center justify-center gap-11">
        <div className=' flex flex-col items-center justify-evenly gap-3'>
          <Image src="/image/image 1.png" width={200} height={200} alt='image'/>
          <h1 className='text-white text-3xl'>اشتراک سالانه ایمکس</h1>
          <h1 className='text-white text-lg opacity-80'>از امروز تا پایان سال جاری</h1>
        </div>
        <div>
          <div className='w-77 border-white p-3 text-white border-[0.5px] bg-[rgb(255, 255, 255)] rounded-xl'>
            <h1 className='w-full items-center justify-center text-center mb-2'>مزایای اشتراک ایمکس</h1>
            <p className='text-xs opacity-60'>رشاد مقیمی، رئیس یدرو) در همایش شرکت‌های برتر ایران با اشاره به تاکید رئیس جمهور و وزیر صنعت، معدن و تجارت،اظهار کرد: طرح "هزار مدیر" به منظور پرورش مدیران در مجموعه وزارت صنعت، ایدرو و سازمان مدیریت صنعتی تعریف شده است. مقیمی افزود: در حال حاضر بیش از دویست نفر از نیروی انسانی هلدینگ‌های بزرگ کشور، دوره‌های آموزشی خود را در این طرح آغاز کرده‌اند. به گفته وی، این طرح با هدفس سازمان گسترش و نوسازی صنایع ایران (ایدرو) با اشاره به حجم بالای پسماند تولیدی در کشور، گفت: بر اساس آخرین آمارها، حجم پسماند شهری کشور حدود چهل میلیون تن در سال است که از این میزان، چهار میلیون تن مربوط به پسماندهای پلاستیکی است. مقیمی افزود: در حالی که تنها ده تا هفده درصد از این پسماندها قابلیت بازیافت و ورود به اکو</p>
          </div>
          <div className='mt-3 w-full flex justify-between gap-3'>
            <div className='bg-white text-[#5764EF] w-2/3 rounded p-1 text-center justify-center items-center flex hover:cursor-pointer'>پرداخت</div>
            <input placeholder='کد تخفیف' className='w-1/3 bg-[#5764ef34] p-2 focus:outline-none text-white placeholder:text-[#5764EF] w-full border-[#5764EF] rounded' />
          </div>
        </div>
    </div>
  )
}

export default Payment