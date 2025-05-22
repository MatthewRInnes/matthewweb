// Skeleton component for displaying loading placeholders
// Use this to indicate content is loading and improve perceived performance
import * as React from "react"

import { cn } from "@/lib/utils"

// Main skeleton element with customisable styling
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

export { Skeleton }
