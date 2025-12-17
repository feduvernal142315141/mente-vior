"use client"

import * as React from "react"
import { Bell, ChevronRight, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/hooks/use-auth"
import { useLogout } from "@/modules/auth/hooks/use-logout"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface TopbarProps {
  title?: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode
}

export function Topbar({ title, breadcrumbs, actions }: TopbarProps) {
  const { user } = useAuth()
  const { logout } = useLogout()
  const route = useRouter()

  const [isScrolled, setIsScrolled] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const saved = localStorage.getItem("mv-theme") as "light" | "dark" | null
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initial = saved || (systemDark ? "dark" : "light")

    setTheme(initial)

    if (initial === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light"

      if (next === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      localStorage.setItem("mv-theme", next)

      return next
    })
  }

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "h-[56px] bg-surface-primary border-b border-border-hairline sticky top-0 z-40",
        "transition-all duration-200",
        isScrolled && "shadow-[0_2px_6px_rgba(0,0,0,0.06)] backdrop-blur-md"
      )}
    >
      <div className="h-full flex items-center justify-between px-6 gap-6">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {breadcrumbs?.length ? (
            <div className="flex items-center gap-1.5 text-[13px] font-medium">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <span
                    className={cn(
                      index === breadcrumbs.length - 1
                        ? "text-text-secondary"
                        : "text-text-muted"
                    )}
                  >
                    {crumb.label}
                  </span>

                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight
                      className="w-3 h-3 text-text-disabled"
                      strokeWidth={1.5}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : null}

          {title && (
            <h2 className="text-[20px] font-semibold text-text-primary tracking-tight leading-tight">
              {title}
            </h2>
          )}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="
              w-9 h-9 rounded-md 
              text-text-muted 
              hover:text-accent-primary hover:bg-surface-secondary 
              transition-all duration-150 
              group shadow-border-premium
              focus-visible:outline-none focus-visible:ring-0
              cursor-pointer
            "
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-[18px] h-[18px] stroke-[1.5] group-hover:scale-110 transition-transform" />
            ) : (
              <Sun className="w-[18px] h-[18px] stroke-[1.5] group-hover:scale-110 transition-transform" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  flex items-center gap-3 ml-2 pl-2 pr-3 py-1.5 
                  rounded-md hover:bg-surface-secondary 
                  transition-all duration-150 
                  active:scale-[0.98]
                  focus-visible:outline-none focus-visible:ring-0
                  cursor-pointer
                "
              >
                <div
                  className="
                    w-9 h-9 rounded-full bg-accent-soft border border-border-hairline 
                    flex items-center justify-center shadow-sm
                  "
                >
                  <span className="text-[11px] font-semibold text-accent-primary">
                    {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </span>
                </div>

                <span className="text-[13px] font-medium text-text-primary hidden sm:inline truncate max-w-[140px]">
                  {user?.name}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="
                w-64 bg-surface-primary border-border-hairline 
                shadow-[0_4px_14px_rgba(0,0,0,0.10)]
                rounded-md p-1 
                focus-visible:outline-none
              "
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-[13px] font-semibold text-text-primary">
                    {user?.name || "System Admin"}
                  </p>
                  <p className="text-[12px] text-text-muted">
                    {user?.email || "admin@mentevior.com"}
                  </p>
                  <p className="text-[11px] text-text-disabled uppercase tracking-wide pt-0.5">
                    Back Office Admin
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-border-hairline" />

              <DropdownMenuItem 
                className="text-[13px] text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                onClick={() => route.push("/change-password")}
              >
                Change password
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border-hairline" />

              <DropdownMenuItem
                onClick={logout}
                className="
                  text-[13px] text-status-danger 
                  hover:text-status-danger hover:bg-status-danger/5
                  focus:bg-status-danger/5
                "
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
