// components/ui/switch-premium.tsx
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export function SwitchPremium({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        `
        peer inline-flex h-7 w-12 cursor-pointer items-center rounded-full border border-transparent
        transition-all duration-300 shadow-sm
        
        data-[state=unchecked]:bg-gray-300 
        data-[state=checked]:bg-blue-600 
        
        focus-visible:ring-4 focus-visible:ring-blue-600/20
        focus-visible:outline-none
        disabled:cursor-not-allowed disabled:opacity-50
        `,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(`
          pointer-events-none block h-6 w-6 rounded-full bg-white shadow-md
          transition-transform duration-300 
          
          data-[state=unchecked]:translate-x-0
          data-[state=checked]:translate-x-5
        `)}
      />
    </SwitchPrimitive.Root>
  )
}
