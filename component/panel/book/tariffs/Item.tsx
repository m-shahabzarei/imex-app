import Image from "next/image";
import Link from "next/link";


interface Iitem{
  name:string;
  code:string;
  product_group:[];
  customs_duty:string;

}

function Item(props :Iitem) {

  return (
    <div>
    <Link href="/panel/book/tariffs/1">
    <div className="bg-white max-md:w-[80vw] h-28 max-md:h-fit shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl grid md:grid-cols-3 max-md:flex max-md:flex-col gap-2 p-4 max-md:p-6 hover:cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]">

      <div className="flex flex-col justify-between md:w-[120%] font-black h-full max-md:gap-5">
        <h1 className="text-sm  text-custom2">{props.name}</h1>
        <div className="flex max-md:text-xs md:text-[1.2vw] lg:text-xs text-gray-400 justify-between">
        <div className="flex gap-1">
          <span className="font-light">شماره تعرفه : </span>
          <span>{props.code}</span>
        </div>
        {
          props.customs_duty ?         <div className="flex gap-1">
          <span className="font-light">حقوق ورودی : </span>
          <span>{props.customs_duty}%</span>
        </div>
        : ""
        }
        </div>
      </div>

      <div className="text-center flex items-center justify-center">
        <hr className="md:rotate-90 w-full md:w-20 text-gray-300 h-1 max-md:my-1" />
      </div>

      <div className="flex flex-col justify-evenly max-md:justify-between md:-mr-16 text-gray-400 text-xs gap-1">
        {props.product_group.map(({tariffCode , faDescription} : {tariffCode:string,faDescription:string},index)=>(
          <span key={index}> {tariffCode} {faDescription}</span>
        ))}
      </div>

      
    </div>
    </Link>
    <Image src="/image/bookmark2.svg" width={20} height={20} alt="bookmark" className="absolute -mt-42 left-6 md:-mt-24 md:left-4  hover:cursor-pointer"/>
    </div>
  );
}

export default Item;
