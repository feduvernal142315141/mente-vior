"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { useFormContext, Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { ChevronDown, Check, X } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface MultiSelectFieldProps {
  field: any
  error?: string
  options: Option[]
  onFieldChange?: (name: string, value: any) => void
}

export function MultiSelectField({ field, error, options, onFieldChange }: MultiSelectFieldProps) {
  const { control } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || dropdownRef.current?.contains(target)) return
      setIsOpen(false)
      setSearch("")
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  // Position
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const dropH = 300
    const spaceBelow = window.innerHeight - rect.bottom

    // Open up if no space below
    const top = spaceBelow < dropH && rect.top > dropH
      ? rect.top - dropH
      : rect.bottom + 4

    setPos({ top, left: rect.left, width: rect.width })
  }, [])

  useEffect(() => {
    if (!isOpen) return
    updatePosition()
    // Reposition on scroll/resize
    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)
    return () => {
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [isOpen, updatePosition])

  const filteredOptions = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: rhfField }) => {
        const selected: string[] = Array.isArray(rhfField.value) ? rhfField.value : []
        const hasValue = selected.length > 0
        const shouldFloat = isOpen || hasValue

        const toggle = (val: string) => {
          const next = selected.includes(val)
            ? selected.filter((v) => v !== val)
            : [...selected, val]
          rhfField.onChange(next)
          onFieldChange?.(field.name, next)
        }

        const removeItem = (val: string, e: React.MouseEvent) => {
          e.stopPropagation()
          const next = selected.filter((v) => v !== val)
          rhfField.onChange(next)
          onFieldChange?.(field.name, next)
        }

        const dropdown = isOpen && mounted ? createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              width: `${pos.width}px`,
              zIndex: 99999,
            }}
            className={cn(
              "rounded-xl border overflow-hidden",
              "bg-white dark:bg-[#111827]",
              "border-gray-200 dark:border-[#1F2937]",
              "shadow-[0_12px_30px_rgba(15,23,42,0.18)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.45)]",
            )}
          >
            {/* Search */}
            <div className="p-2 border-b border-gray-100 dark:border-gray-700">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full h-9 px-3 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Options */}
            <div className="max-h-[220px] overflow-y-auto py-1">
              {filteredOptions.length === 0 && (
                <p className="px-3 py-2 text-sm text-gray-400">No options found</p>
              )}
              {filteredOptions.map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-150",
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-700/20 text-blue-700 dark:text-blue-400 font-medium"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1E293B]",
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                )
              })}
            </div>
          </div>,
          document.body,
        ) : null

        return (
          <div className="w-full relative">
            {/* Trigger */}
            <div
              ref={triggerRef}
              role="button"
              tabIndex={0}
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsOpen(!isOpen) } }}
              className={cn(
                "peer w-full min-h-[56px] rounded-xl px-4 pr-10 flex items-center flex-wrap gap-1.5 text-sm",
                "border transition-all duration-200",
                "focus:outline-none focus:ring-4 focus:ring-blue-600/15 focus:border-blue-600",
                "cursor-pointer text-left",
                "dark:bg-[#0F162A] bg-white",
                "dark:text-gray-200 text-gray-900",
                "dark:border-[#1E293B] border-gray-300",
                "dark:hover:border-[#334155] hover:border-gray-400",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                !hasValue && "py-4",
                hasValue && "py-2",
              )}
            >
              {hasValue
                ? selected.map((val) => {
                    const opt = options.find((o) => o.value === val)
                    return (
                      <span
                        key={val}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                      >
                        {opt?.label ?? val}
                        <button
                          type="button"
                          onClick={(e) => removeItem(val, e)}
                          className="hover:text-blue-900 dark:hover:text-blue-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )
                  })
                : null}
            </div>

            {/* Chevron */}
            <ChevronDown
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none transition-transform duration-200",
                isOpen && "rotate-180 text-blue-600",
              )}
            />

            {/* Floating label */}
            <label
              className={cn(
                "absolute left-4 px-1 pointer-events-none transition-all duration-200",
                "bg-white dark:bg-[#0F162A]",
                "text-gray-500 dark:text-gray-400",
                isOpen && "text-blue-600",
                shouldFloat
                  ? "top-0 -translate-y-1/2 text-xs"
                  : "top-1/2 -translate-y-1/2",
              )}
            >
              {field.label}
              {field.required && <span className="ml-0.5 text-[#2563EB]">*</span>}
            </label>

            {/* Portal dropdown */}
            {dropdown}

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
        )
      }}
    />
  )
}
