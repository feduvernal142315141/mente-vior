"use client"

import Image from "next/image"
import logo from "@/public/logoMenteVior.png"
import StatsAndFeatures from "./StatsAndFeatures"

export default function LeftHero() {
  return (
    <div className="hidden lg:block lg:w-[60%]">

      <div className="relative overflow-hidden h-full">

        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' ...")`,
          }}
        />

        <div
          className="
            absolute 
            top-[-150px] left-[-120px]
            w-[540px] h-[540px]
            rounded-full blur-[50px]
            bg-[radial-gradient(circle,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.97)_18%,_rgba(255,255,255,0.42)_40%,_rgba(255,255,255,0.14)_65%,_rgba(255,255,255,0)_100%)]
            z-[5]
          "
        />

        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#2563EB] opacity-20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4] opacity-15 rounded-full blur-[100px] animate-pulse" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full ml-12">

          <div className="flex items-center gap-3 mb-12 select-none">
            <Image
              src={logo}
              alt="MenteVior Logo"
              width={155}
              height={155}
              className="drop-shadow-[0_0_34px_rgba(255,255,255,0.65)] contrast-125"
            />

            <div className="space-y-1.5">
              <p className="text-[12px] uppercase font-semibold tracking-[0.34em] text-white/95">
                Back Office Platform
              </p>

              <p className="text-[14px] text-white/90 leading-snug">
                For ABA & mental health clinics
              </p>
            </div>
          </div>

          <StatsAndFeatures />
        </div>
      </div>
    </div>
  )
}
