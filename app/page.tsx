"use client"
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    window.location.href = "/panel/home"
  },[])

  return (
      <div className="w-full">
      </div>    
  );
}
