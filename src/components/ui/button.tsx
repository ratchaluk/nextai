import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-none border-[3px] border-black uppercase tracking-[0.2em] font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:border-[5px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[#cccccc] disabled:bg-[#f5f5f5] disabled:text-[#999] aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-white hover:text-black",
        outline:
          "bg-white text-foreground hover:bg-black hover:text-white",
        secondary:
          "bg-white text-foreground hover:bg-black hover:text-white",
        ghost:
          "border-transparent bg-transparent text-foreground underline underline-offset-4 hover:text-info",
        destructive:
          "bg-destructive text-white hover:bg-black hover:text-destructive",
        link: "border-transparent bg-transparent p-0 text-info underline underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-8 px-4 text-xs",
        lg: "h-14 px-10 text-lg",
        icon: "size-11 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-14 p-0",
        xs: "h-8 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }