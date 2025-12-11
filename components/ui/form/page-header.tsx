"use client"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  breadcrumb: BreadcrumbItem[]
  title: string
  description?: string
  className?: string
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-[1360px] mx-auto pt-8",
        "transition-all duration-300",
        className
      )}
    >
      <nav
        className={cn(
          "flex items-center text-sm font-medium mb-3",
          "text-text-secondary"
        )}
      >
        {breadcrumb.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight
                className="w-4 h-4 mx-1 text-text-disabled"
              />
            )}

            {item.href ? (
              <a
                href={item.href}
                className="
                  transition-colors duration-150 
                  text-text-muted 
                  hover:text-accent-primary
                "
              >
                {item.label}
              </a>
            ) : (
              <span className="text-text-secondary">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      <h1
        className={cn(
          "text-[32px] font-semibold tracking-tight",
          "text-text-primary"
        )}
      >
        {title}
      </h1>

      {description && (
        <p
          className={cn(
            "mt-1 text-[14px] leading-relaxed",
            "text-text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
