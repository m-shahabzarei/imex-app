import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


interface Iprops{
    image:string;
    link:string;
    name:string;
}

function Item(props:Iprops) {
  console.log(props.name)
  return (
    <Link href={props.link} className='shadow-[0_0_20px_rgba(0,0,0,0.12)] flex flex-col items-center justify-evenly rounded-xl w-fit px-4 h-45'>
        <Image src={props.image} width={130} height={50} alt={props.name} className='rounded-lg'/>
        <span>{props.name}</span>
    </Link>
  )
}

export default Item