"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && <div className="text-text-secondary mb-4 opacity-50">{icon}</div>}
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      {description && <p className="text-sm text-text-secondary text-center max-w-md mb-6">{description}</p>}
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-primary-blue hover:bg-primary-blue-dark text-white h-11 px-6 rounded-xl"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
