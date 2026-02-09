import { ReactElement, useEffect } from "react";

interface InfoBoxProps {
  label?: string | undefined | number;
  value?: string | undefined | number | ReactElement;
  variant: "single" | "frame";


  CountryID?:number;
  CountryName?:string;
  description?:string;
  type?:string;
  tariffPrecent?:string;
  tariffRate?:string;
}


const getType = (type : string | undefined)=>{
  if(type == null ){
    return "-"
  }
  if(type === "to_iran"){
    return "واردات"
  }else{
    return "صادرات"
  }
}


function InfoBox(props: InfoBoxProps) {

  if (props.variant === "single") {
    return (
      <div className="border-[1.4px] border-gray-300 py-3 px-2 rounded-xl flex flex-col justify-between items-start w-full gap-3 text-xs">
        <span className="text-gray-400">{props.label}</span>
        <span className="block text-gray-500 text-[0.8rem]">{props.value}</span>
      </div>
    );
  } else if (props.variant === "frame") {
    return (
      <div className="border-[1.4px] border-gray-300 py-3 px-4 rounded-xl flex flex-col justify-between items-start w-full gap-9 text-xs">
        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">کد کشور </span>
            <span className="block text-gray-500 text-[0.8rem]">{props.CountryID}</span>
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">نام کشور</span>
            <span className="block text-gray-500 text-[0.8rem]">
             {props.CountryName}
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">شرح </span>
            <span className="block text-gray-500 text-[0.8rem]">{props.description}</span>
          </div>
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">نوع تجارت</span>
            <span className="block text-gray-500 text-[0.8rem]">{getType(props.type)}</span>
          </div>
        </div>

        {/* <div className="flex justify-between w-full items-start">
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
        </div> */}

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">درصد کاهش تعرفه</span>
            <span className="block text-gray-500 text-[0.8rem]">{props.tariffPrecent}</span>
          </div>
          {/* <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">درصد کاهش تعرفه</span>
            <span className="block text-gray-500 text-[0.8rem]">
              40%
            </span>
          </div> */}
        </div>

        <div className="flex justify-between w-full items-start">
          <div className="w-full flex flex-col gap-2">
            <span className="text-gray-400">Tariff rate 2008 (Base)</span>
            <span className="block text-gray-500 text-[0.8rem]">{props.tariffRate}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default InfoBox;
