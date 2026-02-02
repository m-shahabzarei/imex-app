"use client"

import { refresh } from "@/services/auth"
import axios from "axios"
import { useState } from "react"



function Page() {
  const [Data, setData] = useState()

const getToken = ()=>{
    refresh("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NTMzMjA4OSwiaWF0IjoxNzY5NzgwMDg5LCJqdGkiOiJjNjQ2YjZjN2E3NDY0NWJkYmRkOGIyYWZiYWIzNTQ2MiIsInVzZXJfaWQiOjEyNTV9.LaV91qiQR0qNdWWJB7CnpLqnctD-y1UItXMFoCo_Dco")
    .then((res)=>(
      setData(res.data),
      console.log(res)
    ))
}
console.log(Data)

  return (
    <div className='w-full h-full flex items-center justify-center'>
        <p className='text-gray-500 mt-50'>شما هنوز تعرفه ی نشان شده ای ندارید!</p>

        <button onClick={getToken}>click me</button>
    </div>
  )
}

export default Page