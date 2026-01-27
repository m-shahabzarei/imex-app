import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-6 bg-linear-to-b  from-[#5764EF] to-[#3E47AD]'>
        <h1 className='text-5xl text-white'>صفحه یافت نشد!</h1>
        <Link href="/panel/home" className='max-md:py-[12px] max-md:text-lg px-[12px] border-white border-[0.5px] py-[8px] rounded-[12px] text-lg font-medium cursor-pointer hover:bg-[#a7adeb34] transition-all duration-200 ease-in-out flex items-center gap-1 bg-[#5764ef34] text-[#f0f0f0] w-49 text-center justify-center'>صفحه خانه</Link>
    </div>
  )
}

export default NotFound