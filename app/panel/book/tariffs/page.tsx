"use client"

import Item from '@/component/panel/book/tariffs/Item'
import { useTariff } from '@/hooks/useTariff'
import Image from 'next/image'
import Link from 'next/link'

function Page() {

  const {tariff,isLoading,error}= useTariff();
  console.log(tariff , error)

  return (
    <div className="grid gap-4 pb-7">
        <Link href="/panel/book" className="gap-1 hover:gap-3 transition-all duration-300 flex w-fit hover:text-custom2 ">
        <Image src="/image/Alt Arrow Left.svg" width={23} height={25} className="rotate-180" alt="arrow" />
        <span>بازگشت</span>
        </Link>
        <Item />
        <Item />
        <Item />
        <Item />
    </div>
  )
}

export default Page