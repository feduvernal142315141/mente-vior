"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
  breadcrumbs?: Array<{
    label: string
    href?: string
  }>
}

export function PageHeader({ title, subtitle, action, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span
                className={cn(
                  "text-text-secondary",
                  index === breadcrumbs.length - 1 && "text-text-primary font-medium",
                )}
              >
                {crumb.label}
              </span>
              {index < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
          {subtitle && <p className="text-text-secondary mt-1 text-[15px]">{subtitle}</p>}
        </div>
        {action && (
          <Button
            onClick={action.onClick}
            className="bg-primary-blue hover:bg-primary-blue-dark text-white h-10 px-4 rounded-lg font-medium shadow-sm"
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
