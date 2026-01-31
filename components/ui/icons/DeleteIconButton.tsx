"use client";

import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

interface DeleteIconButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
  disabled?: boolean;
}

export function DeleteIconButton({
  onClick,
  className,
  size = 16,
  disabled = false,
}: DeleteIconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
        group relative flex items-center justify-center
        w-8 h-8 rounded-lg
        transition-all duration-300 cursor-pointer

        /* Light mode */
        bg-white/5 hover:bg-red-600/15 active:bg-red-600/25
        border border-white/10

        /* Dark mode */
        dark:bg-white/5 dark:hover:bg-red-500/20 dark:border-white/10

        backdrop-blur-sm
        shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.35)]

        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:shadow-sm
      `,
        className
      )}
    >
      <Trash2
        size={size}
        className="
          text-slate-600 dark:text-slate-300 
          transition-all duration-300
          group-hover:text-red-600 dark:group-hover:text-red-400
          group-active:scale-90
          group-disabled:text-slate-400
        "
      />
    </button>
  );
}
