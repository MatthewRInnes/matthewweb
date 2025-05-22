import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariants } from "@/lib/button-variants"

/**
 * Button Component
 * 
 * A flexible button component with multiple variants and sizes.
 * Uses class-variance-authority for style variants.
 * 
 * Features:
 * - Multiple style variants (default, destructive, outline, etc.)
 * - Multiple size options
 * - Support for icon display
 * - Can render as any element via asChild prop
 * - Accessible with proper aria attributes
 * - Enhanced contrast for better readability
 * - Consistent styling across light and dark modes
 */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /**
   * When true, the button will render its children using Radix UI's Slot component,
   * allowing it to be rendered as a different element like a link
   */
  asChild?: boolean
}

/**
 * Button component with various style variants and sizes
 * 
 * @param className - Additional CSS classes to apply
 * @param variant - Style variant (default, destructive, outline, etc.)
 * @param size - Size variant (default, sm, lg, icon)
 * @param asChild - Whether to render as a Slot component
 * @param props - Additional HTML button attributes
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
