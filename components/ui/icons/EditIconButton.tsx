"use client";

import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

interface EditIconButtonProps {
  onClick?: () => void;
  className?: string;
  size?: number;
}

export function EditIconButton({
  onClick,
  className,
  size = 16,
}: EditIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        `
        group relative flex items-center justify-center
        w-8 h-8 rounded-lg
        transition-all duration-300 cursor-pointer

        /* Light mode */
        bg-white/5 hover:bg-blue-600/15 active:bg-blue-600/25
        border border-white/10

        /* Dark mode */
        dark:bg-white/5 dark:hover:bg-blue-500/20 dark:border-white/10

        backdrop-blur-sm
        shadow-sm hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]
      `,
        className
      )}
    >
      <Pencil
        size={size}
        className="
          text-slate-600 dark:text-slate-300 
          transition-all duration-300
          group-hover:text-blue-600 dark:group-hover:text-blue-400
          group-active:scale-90
        "
      />
    </button>
  );
}
