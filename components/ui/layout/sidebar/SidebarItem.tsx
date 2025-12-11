"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { SidebarTooltip } from "./SidebarTooltip"
import { useState } from "react"

export function SidebarItem({ item }: any) {
  const pathname = usePathname()
  const [hover, setHover] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const Icon = item.icon
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/")

  const showHover = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPos({ x: rect.right + 8, y: rect.top + rect.height / 2 })
    setHover(true)
  }

  return (
    <Link
      href={item.disabled ? "#" : item.href}
      onClick={(e) => item.disabled && e.preventDefault()}
      onMouseEnter={(e) => !item.disabled && showHover(e)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "w-full flex items-center justify-center py-3 relative group",
        isActive
          ? "text-accent-primary"
          : "text-text-secondary",
        !item.disabled && "hover:text-accent-primary",
        item.disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {(isActive || (!item.disabled && hover)) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              w-8 h-8 rounded-full 
              bg-accent-soft dark:bg-[#2f3a4a]
              transition-colors
            "
          />
        </div>
      )}

      <Icon
        className="
          w-5 h-5 relative z-10 
          transition-transform group-hover:scale-110
        "
      />

      {hover && (
        <SidebarTooltip content={item.label} position={tooltipPos} />
      )}
    </Link>
  )
}
