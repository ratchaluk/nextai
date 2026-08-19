import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-none border-[3px] border-black bg-input px-3 py-2.5 font-mono text-[15px] transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:bg-[#e8e8e8] focus-visible:border-[5px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#cccccc] disabled:bg-[#f5f5f5] aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }