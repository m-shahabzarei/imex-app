import Image from 'next/image'

interface IButton{
  variant : "primary" | "secondary" | "outline" | "payment",
  icon? : string,
  children : string | number,
  onClick?: () => void
}
const variants = {
  primary:"bg-[#FFFFFF] text-[#5562EF]",
  secondary:"bg-linear-to-b  from-[#5764EF] to-[#3E47AD]  text-white w-full text-center justify-center",
  outline:"bg-tarnsparent",
  payment:"bg-[#FFFFFF] text-[#5562EF]",
  glassy:""
}
const baseStyle = "max-md:py-[12px] max-md:text-lg px-[12px] py-[8px] rounded-[12px] text-sm font-medium cursor-pointer hover:opacity-90 transition-all duration-200 ease-in-out flex items-center gap-1"

function Button({variant , icon , children , onClick} : IButton) {
  return (
    <div>
      <button  onClick={onClick} className={`${variants[variant]} ${baseStyle} `}>
      {icon && <Image src={icon} alt='icon' width="20" height="20"/> }
      {children}   
      </button>
    </div>
  )
}

export default Button