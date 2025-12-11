import * as React from 'react'

import { cn } from '@/lib/utils'

function Loading({ className }: any) {
  return (
    <div
        className={cn(
            "bg-white dark:bg-[#1f2125] rounded-[18px] border border-border-hairline shadow-sm animate-fade-in",
            className
        )}
    >
        <div className="h-96 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 opacity-80">
                <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-text-muted">Loading data...</p>
            </div>
        </div>
    </div>
  )
}

export { Loading }
