"use client"

import React, {useState} from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { KWButton } from "../kw-button"

export interface FilterChip {
  id: string
  label: string
  active: boolean
}

export interface TableToolbarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filters?: {
    label: string
    chips: FilterChip[]
    onChipClick: (chipId: string) => void
  }[]
  primaryAction?: {
    label: string
    icon?: React.ReactNode
    onClick: () => void
  }
  secondaryActions?: {
    label: string
    icon?: React.ReactNode
    onClick: () => void
    disabled?: boolean
  }[]
  className?: string
}

export function TableToolbar({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filters = [],
  primaryAction,
  secondaryActions = [],
  className,
}: TableToolbarProps) {
    const [value, setValue] = useState("")

    const updateValue = (value: string) =>{
        setValue(value)
        onSearchChange?.(value)
    }

    return (
    <div className={cn("flex items-center justify-between gap-4 mb-4", className)}>
      
      <div className="flex items-center gap-3 flex-1">

        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />

          <input
            type="text"
            value={value}
            placeholder={searchPlaceholder}
            onChange={(e) => updateValue(e.target.value)}
            className="
              h-10 w-full pl-10 pr-4 rounded-xl text-[14px]
              bg-surface-primary text-text-primary placeholder:text-text-muted
              border border-border-hairline shadow-[var(--shadow-card)]
              focus:outline-none focus:border-accent-primary
              focus:shadow-[0_0_0_3px_var(--accent-focus)]
              transition-all duration-150
            "
          />

          {searchValue && (
            <button
              onClick={() => updateValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              <X className="w-4 h-4 cursor-pointer"/>
            </button>
          )}
        </div>

        {filters.map((group, groupIdx) => (
          <div key={groupIdx} className="flex items-center gap-2">
            {group.chips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => group.onChipClick(chip.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer",
                  chip.active
                    ? "bg-accent-soft text-accent-primary font-semibold"
                    : "bg-surface-secondary text-text-secondary hover:bg-surface-primary"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {secondaryActions.map((action, idx) => (
          <KWButton
            key={idx}
            variant="primary"
            onClick={action.onClick}
            disabled={action.disabled}
            className="flex items-center gap-2"
          >
            {action.icon}
            {action.label}
          </KWButton>
        ))}
        
        {primaryAction && (
          <KWButton 
            variant="primary" 
            type="submit"
            form="organization-form"
            onClick={primaryAction.onClick}
          >{primaryAction.label}</KWButton>
        )}
      </div>
    </div>
  )
}
