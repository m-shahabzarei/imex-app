import Image from 'next/image'

interface IButton{
  variant : "primary" | "secondary" | "outline" | "payment" | "glassy" ,
  icon? : string,
  children : string | number,
  header?:boolean,
  onClick?: () => void,
  type?:"button" | "submit" | "reset"
}
const variants = {
  primary:"bg-[#FFFFFF] text-[#5562EF]",
  secondary:"bg-linear-to-b  from-[#5764EF] to-[#3E47AD]  text-white w-full text-center justify-center",
  outline:"bg-tarnsparent",
  payment:"bg-[#FFFFFF] text-[#5562EF]",
  glassy:"bg-[#5764ef34] text-[#5764EF] w-full text-center justify-center"
}

function Button({variant , icon,type ,header , children , onClick} : IButton) {
  const baseStyle = `max-md:py-[12px] max-md:${header? "text-xs" : "text-sm "} px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1`

  return (
    <>
      <button type={type ?? "button"}  onClick={onClick} className={`${variants[variant]} ${baseStyle} `}>
      {icon && <Image src={icon} alt='icon' width="20" height="20"/> }
      {children}   
      </button>
    </>
  )
}

export default Button