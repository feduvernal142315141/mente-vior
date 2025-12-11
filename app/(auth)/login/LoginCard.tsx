"use client"

import MobileHeader from "./MobileHeader"
import LoginForm from "./LoginForm"
import Image from "next/image"
import logo from "@/public/logoMenteVior.png"

export default function LoginCard() {
  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

      <div className="lg:hidden flex flex-col items-center mt-2 mb-10">
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 w-[180px] h-[180px] rounded-full blur-[60px] bg-white/10" />

          <Image
            src={logo}
            alt="MenteVior Logo"
            width={90}
            height={90}
            className="relative drop-shadow-[0_0_18px_rgba(255,255,255,0.38)]"
          />
          <p className="text-[12px] text-white/55 tracking-wider">
            Back Office Platform
          </p>
        </div>
      </div>

      <div className="mb-8 lg:mb-10">
        <h2 className="text-[26px] lg:text-[28px] font-semibold text-white mb-2">
          Admin Access
        </h2>
        <p className="text-base text-white/60 leading-relaxed hidden lg:block">
          Manage organizations, users and system settings.
        </p>
      </div>

      <div
        className="
          relative rounded-3xl 
          border border-white/[0.14] 
          bg-white/[0.045] 
          backdrop-blur-[26px] 
          p-8 lg:p-10
          shadow-[0_18px_38px_rgba(0,0,0,0.28)]
        "
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        <LoginForm />
      </div>

      <p className="text-center text-xs text-white/40 mt-8">
        Protected by enterprise encryption <br />
        <span className="text-white/55">SOC 2 Type II certified</span>
      </p>
    </div>
  )
}
