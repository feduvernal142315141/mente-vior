"use client"

import Image from "next/image"
import logo from "@/public/logoMenteVior.png"

export default function MobileHeader() {
  return (
    <div className="lg:hidden w-full flex flex-col items-center pt-16 pb-6 relative select-none">

      <div className="
        absolute 
        top-6
        w-[220px] h-[220px] 
        rounded-full
        bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_0%,_rgba(230,230,230,0.6)_35%,_rgba(180,180,180,0.2)_65%,_rgba(0,0,0,0)_100%)]
        blur-md
      " />

      <div className="
        absolute top-6
        w-[260px] h-[260px]
        rounded-full
        shadow-[0_15px_45px_rgba(0,0,0,0.25)]
      " />

      <div className="
        absolute 
        top-10
        w-[260px] h-[260px] 
        rounded-full
        bg-[radial-gradient(circle,_rgba(37,99,235,0.22)_0%,_rgba(37,99,235,0.08)_45%,_rgba(0,0,0,0)_100%)]
        blur-[20px]
      " />

      <div className="
        relative z-10
        w-[140px] h-[140px]
        flex items-center justify-center
        animate-enterprise-scale
      ">
        <Image
          src={logo}
          alt="MenteVior Logo"
          width={160}
          height={160}
          className="object-contain drop-shadow-[0_0_22px_rgba(37,99,235,0.45)]"
        />
      </div>

      <p className="text-[12px] text-white/50 tracking-wide">
        Back Office Platform
      </p>
    </div>
  )
}
