"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = 
  | "basic"
  | "pro"
  | "enterprise"
  | "active"
  | "inactive"
  | "info"
  | "warning";

interface KWBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  basic: `
    bg-gray-200/70 text-gray-700 
    dark:bg-gray-700/40 dark:text-gray-300
    border border-gray-300/50 dark:border-gray-600/40
  `,
  pro: `
    bg-blue-100/70 text-blue-700 
    dark:bg-blue-600/20 dark:text-blue-300
    border border-blue-300/40 dark:border-blue-500/30
  `,
  enterprise: `
    bg-purple-100/70 text-purple-700
    dark:bg-purple-600/20 dark:text-purple-300
    border border-purple-300/40 dark:border-purple-500/30
  `,
  active: `
    bg-green-100/70 text-green-700 
    dark:bg-green-600/20 dark:text-green-300
    border border-green-300/40 dark:border-green-500/30
  `,
  inactive: `
    bg-red-100/70 text-red-700
    dark:bg-red-600/20 dark:text-red-300
    border border-red-300/40 dark:border-red-500/30
  `,
  info: `
    bg-sky-100/70 text-sky-700 
    dark:bg-sky-600/20 dark:text-sky-300
    border border-sky-300/40 dark:border-sky-500/30
  `,
  warning: `
    bg-amber-100/70 text-amber-700 
    dark:bg-amber-600/20 dark:text-amber-300
    border border-amber-300/40 dark:border-amber-500/30
  `,
};

export function KWBadge({ children, variant = "info", className }: KWBadgeProps) {
  return (
    <span
      className={cn(
        `
        inline-flex items-center justify-center 
        px-3 py-1.5 rounded-full
        text-[12px] font-semibold tracking-wide

        backdrop-blur-md
        shadow-[0_2px_10px_rgba(0,0,0,0.08)]
        dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)]

        transition-all duration-300
        hover:scale-[1.04]
      `,
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
