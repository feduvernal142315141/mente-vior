"use client"

import { useState, type ReactNode } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {Loading} from "@/components/ui/loading";

export interface DataTableColumn<T> {
  id: string
  header: string | ReactNode
  accessor: (row: T) => ReactNode
  width?: number | string
  align?: "left" | "center" | "right"
  sortable?: boolean
  className?: string
  isActionsColumn?: boolean
}

export interface DataTablePagination {
  page: number
  pageSize: number
  total: number
  onChangePage: (page: number) => void
  onChangePageSize: (pageSize: number) => void
}

export interface DataTableEmptyState {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  loading?: boolean
  emptyState?: DataTableEmptyState
  onRowClick?: (row: T) => void
  pagination?: DataTablePagination
  className?: string

  onSort?: (columnId: string, direction: "asc" | "desc") => void
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  loading = false,
  emptyState,
  onRowClick,
  pagination,
  className,
  onSort,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (columnId: string) => {
    let newDirection: "asc" | "desc" = "asc"

    if (sortColumn === columnId) {
      newDirection = sortDirection === "asc" ? "desc" : "asc"
      setSortDirection(newDirection)
    } else {
      setSortColumn(columnId)
      newDirection = "asc"
      setSortDirection("asc")
    }

    onSort?.(columnId, newDirection)
  }

  if (loading) {
    return (
      <Loading></Loading>
    )
  }

  if (data.length === 0 && emptyState) {
    return (
      <div
        className={cn(
          "bg-white dark:bg-[#1f2125] rounded-[18px] border border-border-hairline shadow-sm animate-fade-in",
          className
        )}
      >
        <div className="h-96 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-4 text-center max-w-md">
            {emptyState.icon && (
              <div className="text-text-muted opacity-60">{emptyState.icon}</div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {emptyState.title}
              </h3>

              {emptyState.description && (
                <p className="text-sm text-text-secondary">
                  {emptyState.description}
                </p>
              )}
            </div>

            {emptyState.action && (
              <button
                onClick={emptyState.action.onClick}
                className="mt-2 px-4 py-2 bg-accent-primary text-white text-sm font-semibold rounded-xl shadow hover:bg-accent-hover transition-all duration-150 hover:-translate-y-[1px]"
              >
                {emptyState.action.label}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1

  const startRow = pagination
    ? (pagination.page - 1) * pagination.pageSize + 1
    : 1

  const endRow = pagination
    ? Math.min(pagination.page * pagination.pageSize, pagination.total)
    : data.length

  return (
    <div
      className={cn(
        "bg-white dark:bg-[#1f2125] rounded-[18px] border border-border-hairline shadow-sm overflow-hidden animate-fade-in",
        className
      )}
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] dark:bg-[#2a2d33] sticky top-0 z-10">
            <tr className="border-b border-border-divider dark:border-[#2e3136]">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "h-12 px-6 text-left text-[13px] font-semibold text-text-secondary tracking-tight select-none",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable && "cursor-pointer hover:text-accent-primary"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      column.align === "center" && "justify-center",
                      column.align === "right" && "justify-end"
                    )}
                  >
                    {column.header}

                    {column.sortable && (
                      <span className="text-text-muted opacity-60">
                        {sortColumn === column.id ? (
                          sortDirection === "asc" ? (
                            <ArrowUp className="w-4 h-4 text-accent-primary" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-accent-primary" />
                          )
                        ) : (
                          <ArrowUpDown className="w-4 h-4 opacity-70" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  "transition-all duration-150",
                  "hover:bg-surface-secondary dark:hover:bg-[#2f3a4a]/40",
                  index !== data.length - 1 &&
                    "border-b border-[#F1F3F5] dark:border-[#2e3136]",
                  onRowClick && "cursor-pointer active:scale-[0.995]"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "min-h-[60px] px-6 py-4 text-[14px] text-text-primary dark:text-foreground",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.isActionsColumn &&
                        "text-text-muted dark:text-muted-foreground",
                      column.className
                    )}
                  >
                    {column.isActionsColumn ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        {column.accessor(row)}
                      </div>
                    ) : (
                      column.accessor(row)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-border-divider dark:border-[#2e3136] bg-white dark:bg-[#1f2125]">
          
          <div className="text-[13px] font-medium text-text-secondary">
            Showing {startRow}–{endRow} of {pagination.total}
          </div>

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-2">
              <span className="text-[13px] text-text-secondary">Rows per page:</span>

              <select
                value={pagination.pageSize}
                onChange={(e) => pagination.onChangePageSize(Number(e.target.value))}
                className="
                  border border-border-hairline dark:border-[#2e3136] 
                  rounded-lg px-2 py-1 text-sm bg-white dark:bg-[#1f2125] 
                  text-text-primary dark:text-foreground
                  focus:outline-none
                  focus:ring-2 focus:ring-accent-primary/20
                "
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              {[ 
                { icon: <ChevronsLeft />, action: () => pagination.onChangePage(1), disabled: pagination.page === 1 },
                { icon: <ChevronLeft />, action: () => pagination.onChangePage(pagination.page - 1), disabled: pagination.page === 1 },
                { icon: <ChevronRight />, action: () => pagination.onChangePage(pagination.page + 1), disabled: pagination.page === totalPages },
                { icon: <ChevronsRight />, action: () => pagination.onChangePage(totalPages), disabled: pagination.page === totalPages },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  disabled={btn.disabled}
                  className={cn(
                    "w-[36px] h-[36px] flex items-center justify-center rounded-lg transition-all duration-150",
                    "bg-surface-secondary dark:bg-[#2a2d33] hover:bg-[#E2E8F0] dark:hover:bg-[#3c4452]",
                    "shadow-sm border border-border-hairline dark:border-[#2e3136]",
                    "disabled:opacity-30 disabled:cursor-not-allowed"
                  )}
                >
                  {btn.icon}
                </button>
              ))}
            </div>

          </div>
          
        </div>
      )}

    </div>
  )
}
