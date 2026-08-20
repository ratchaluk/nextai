import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full min-w-0 resize-y rounded-none border-[3px] border-black bg-input px-3 py-2.5 font-mono text-[15px] transition-colors outline-none placeholder:text-muted-foreground hover:bg-[#e8e8e8] focus-visible:border-[5px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#cccccc] disabled:bg-[#f5f5f5] aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
