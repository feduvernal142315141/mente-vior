import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type StatusType = "active" | "inactive" | "pending" | "error"

export interface StatusBadgeProps {
  status: StatusType
  label?: string
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-accent-green/10 text-accent-green border-accent-green/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-text-secondary border-border-color",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  error: {
    label: "Error",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={cn("font-medium px-3 py-1 rounded-full text-xs", config.className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 inline-block" />
      {label || config.label}
    </Badge>
  )
}
