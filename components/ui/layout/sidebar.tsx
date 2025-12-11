"use client"

import type * as React from "react"
import { createPortal } from "react-dom"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Building2, LayoutDashboard, Users, Settings, FileText, CreditCard } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/use-auth"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  section?: "main" | "system"
  disabled?: boolean
}

function Tooltip({
  children,
  content,
  position,
}: { children: React.ReactElement; content: React.ReactNode; position: { x: number; y: number } }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return children

  return (
    <>
      {children}
      {createPortal(
        <div
          className="fixed px-[10px] py-[6px] bg-[#1F1F1F] text-white text-xs font-medium rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.18)] pointer-events-none whitespace-nowrap"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translateY(-50%)",
          }}
        >
          {content}
        </div>,
        document.body,
      )}
    </>
  )
}

const navItems: NavItem[] = [
  // Main navigation
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5 stroke-[1.7]" />,
    section: "main",
  },
  {
    label: "Organizations",
    href: "/organizations",
    icon: <Building2 className="w-5 h-5 stroke-[1.7]" />,
    section: "main",
  },
  {
    label: "Users",
    href: "/users",
    icon: <Users className="w-5 h-5 stroke-[1.7]" />,
    section: "main",
  },
  // System section
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5 stroke-[1.7]" />,
    section: "system",
    disabled: true,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: <CreditCard className="w-5 h-5 stroke-[1.7]" />,
    section: "system",
    disabled: true,
  },
  {
    label: "Audit Logs",
    href: "/audit-logs",
    icon: <FileText className="w-5 h-5 stroke-[1.7]" />,
    section: "system",
    disabled: true,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const mainItems = navItems.filter((item) => item.section === "main")
  const systemItems = navItems.filter((item) => item.section === "system")

  const handleMouseEnter = (e: React.MouseEvent, itemId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.right + 8,
      y: rect.top + rect.height / 2,
    })
    setHoveredItem(itemId)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-white border-r border-[#E1E4E8] flex flex-col z-40 shadow-[2px_0_8px_rgba(0,0,0,0.02)] overflow-x-hidden overflow-y-auto">
      {/* Logo */}
      <div className="h-14 flex items-center justify-center border-b border-[#E1E4E8] mb-6">
        <div
          className="relative group cursor-pointer"
          onMouseEnter={(e) => handleMouseEnter(e, "logo")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="w-9 h-9 rounded-lg bg-[#1E3A8A] flex items-center justify-center transition-all duration-[120ms] ease-out group-hover:scale-105">
            <span className="text-white text-sm font-bold tracking-tight">MV</span>
          </div>
          {hoveredItem === "logo" && (
            <Tooltip content="MenteVior Back Office" position={tooltipPosition}>
              <div />
            </Tooltip>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col items-center space-y-3">
          {mainItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "w-full flex items-center justify-center py-3 transition-all duration-[120ms] ease-out",
                  "group relative",
                  isActive ? "text-[#1E3A8A]" : "text-[#4D5358]",
                  !item.disabled && "hover:text-[#1E3A8A] cursor-pointer",
                  item.disabled && "opacity-30 cursor-not-allowed",
                )}
                onClick={(e) => item.disabled && e.preventDefault()}
                onMouseEnter={(e) => !item.disabled && handleMouseEnter(e, item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Background circle */}
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#E8EDFF]" />
                  </div>
                )}

                {!item.disabled && !isActive && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[120ms] ease-out">
                    <div className="w-8 h-8 rounded-full bg-[#E8EDFF]" />
                  </div>
                )}

                <span
                  className={cn(
                    "relative z-10 transition-transform duration-[120ms] ease-out",
                    !item.disabled && "group-hover:scale-[1.08]",
                  )}
                >
                  {item.icon}
                </span>

                {hoveredItem === item.href && (
                  <Tooltip content={item.label} position={tooltipPosition}>
                    <div />
                  </Tooltip>
                )}
              </Link>
            )
          })}
        </div>

        {/* System section */}
        <div className="mt-6 pt-6 border-t border-[#E1E4E8]">
          <div className="w-full flex justify-center mb-4">
            <span className="text-[11px] font-semibold text-[#A0A4AB] uppercase tracking-wider">SYSTEM</span>
          </div>

          <div className="flex flex-col items-center space-y-3">
            {systemItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "w-full flex items-center justify-center py-3 transition-all duration-[120ms] ease-out",
                    "group relative",
                    isActive ? "text-[#1E3A8A]" : "text-[#4D5358]",
                    !item.disabled && "hover:text-[#1E3A8A] cursor-pointer",
                    item.disabled && "opacity-30 cursor-not-allowed",
                  )}
                  onClick={(e) => item.disabled && e.preventDefault()}
                  onMouseEnter={(e) => !item.disabled && handleMouseEnter(e, item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#E8EDFF]" />
                    </div>
                  )}

                  {!item.disabled && !isActive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[120ms] ease-out">
                      <div className="w-8 h-8 rounded-full bg-[#E8EDFF]" />
                    </div>
                  )}

                  <span
                    className={cn(
                      "relative z-10 transition-transform duration-[120ms] ease-out",
                      !item.disabled && "group-hover:scale-[1.08]",
                    )}
                  >
                    {item.icon}
                  </span>

                  {hoveredItem === item.href && (
                    <Tooltip content={item.label} position={tooltipPosition}>
                      <div />
                    </Tooltip>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User avatar */}
      <div className="border-t border-[#E1E4E8] pt-6 pb-3">
        <div className="w-full flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full bg-[#E8EDFF] border border-[#E1E4E8] flex items-center justify-center cursor-pointer group relative shadow-sm hover:shadow-md transition-shadow duration-[120ms]"
            onMouseEnter={(e) => handleMouseEnter(e, "user")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className="text-xs font-semibold text-[#1E3A8A]">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "SA"}
            </span>

            {hoveredItem === "user" && (
              <Tooltip
                content={
                  <div>
                    {user?.name || "System Admin"}
                    <span className="block text-[10px] text-gray-400 mt-0.5">Back Office Admin</span>
                  </div>
                }
                position={tooltipPosition}
              >
                <div />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
