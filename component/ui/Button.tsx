import React from 'react'

interface IButton{
  variant : "primary" | "secondary" | "outline" | "payment",
  icon? : string,
  children : string | number
}
const variants = {
  primary:"bg-[#FFFFFF] text-[#5562EF]",
  secondary:"",
  outline:"bg-tarnsparent",
  payment:"bg-[#FFFFFF] text-[#5562EF]",
  glassy:""
}

function Button({variant , icon , children} : IButton) {
  return (
    <div>
      <button className={``}>{children}</button>
    </div>
  )
}

export default Button