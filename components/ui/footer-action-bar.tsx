"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FooterActionBarProps {
  children: ReactNode;
  align?: "left" | "center" | "right"; 
  maxWidth?: number | string;       
  padding?: string;                  
}

export function FooterActionBar({
  children,
  align = "right",
  maxWidth = 1360,
  padding = "px-12 py-4",
}: FooterActionBarProps) {
  return (
    <div
      className={cn(
        `
        fixed bottom-0 left-0 w-full z-[60]

        /* --- Background premium --- */
        bg-white/85 
        dark:bg-[#0F1521]/80

        backdrop-blur-2xl

        /* --- Border hairline premium --- */
        border-t border-gray-200/80 
        dark:border-white/10

        /* --- Shadow premium --- */
        shadow-[0_-6px_24px_-4px_rgba(0,0,0,0.10)]
        dark:shadow-[0_-8px_26px_-4px_rgba(0,0,0,0.45)]

        transition-all duration-300
      `
      )}
    >
      <div
        className={cn(
          `
          w-full mx-auto
          flex gap-4
        `,
          padding,
          {
            ["justify-start"]: align === "left",
            ["justify-center"]: align === "center",
            ["justify-end"]: align === "right",
          }
        )}
        style={{ maxWidth }}
      >
        {children}
      </div>
    </div>
  );
}
