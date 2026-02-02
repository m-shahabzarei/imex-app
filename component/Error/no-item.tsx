import Image from 'next/image'
import React from 'react'

function NoItem() {
  return (
    <div className='flex items-center justify-center w-full h-[60vh] flex-col'>
        <Image src="/image/no-item.svg" alt='no-item' width={200} height={100} />
        <p className='text-gray-500'>هنوز موردی وجود ندارد!</p>
    </div>
  )
}

export default NoItem