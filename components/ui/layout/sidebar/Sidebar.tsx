"use client"

import Image from "next/image"
import { navItems } from "./nav.config"
import { SidebarItem } from "./SidebarItem"
import { SidebarUser } from "./SidebarUser"
import logo from "@/public/logoMenteVior.png"

export function Sidebar() {
  const main = navItems.filter((n) => n.section === "main")
  const system = navItems.filter((n) => n.section === "system")

  return (
    <aside
      className="
        fixed left-0 top-0 h-screen w-[72px] 
        bg-surface-primary 
        border-r border-border-hairline 
        flex flex-col z-40 shadow-sm
        transition-colors duration-300
      "
    >
      <div
        className="
          h-14 flex items-center justify-center
          border-b border-border-hairline mb-6
        "
      >
        <Image
          src={logo}
          alt="MenteVior Logo"
          width={155}
          height={155}
          className="
            drop-shadow-[0_0_34px_rgba(255,255,255,0.65)]
            dark:drop-shadow-[0_0_24px_rgba(0,0,0,0.65)]
            transition-all duration-300
          "
        />
      </div>

      <nav className="flex-1 flex flex-col items-center space-y-3">
        {main.map((item) => (
          <SidebarItem key={item.href} item={item} />
        ))}
      </nav>      
    </aside>
  )
}
