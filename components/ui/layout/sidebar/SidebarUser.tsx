"use client"

import { SidebarTooltip } from "./SidebarTooltip"
import { useState } from "react"
import { useAuth } from "@/lib/hooks/use-auth"

export function SidebarUser() {
  const { user } = useAuth()
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const initials =
    user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "SA"

  const showHover = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: rect.right + 8, y: rect.top + rect.height / 2 })
    setHover(true)
  }

  return (
    <div
      className="
        w-full flex items-center justify-center py-5 
        border-t border-border-hairline 
        transition-colors duration-300
      "
      onMouseEnter={showHover}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="
          w-12 h-12 rounded-full 
          bg-accent-soft dark:bg-[#2f3a4a]
          border border-border-hairline 
          flex items-center justify-center 
          shadow-sm
        "
      >
        <span className="text-xs font-semibold text-accent-primary">
          {initials}
        </span>
      </div>

      {hover && (
        <SidebarTooltip
          content={
            <div>
              {user?.name || "System Admin"}
              <span className="block text-[10px] text-text-muted mt-0.5">
                Back Office Admin
              </span>
            </div>
          }
          position={pos}
        />
      )}
    </div>
  )
}
