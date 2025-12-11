"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

export function SidebarTooltip({
  content,
  position,
}: {
  content: React.ReactNode
  position: { x: number; y: number }
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return createPortal(
    <div
      className="fixed px-[10px] py-[6px] bg-[#1F1F1F] text-white text-xs font-medium rounded-md shadow-lg pointer-events-none whitespace-nowrap z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateY(-50%)",
      }}
    >
      {content}
    </div>,
    document.body,
  )
}
