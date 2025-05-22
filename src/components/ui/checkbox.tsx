/**
	* Checkbox Component
	* A customisable checkbox component built with Radix UI.
	* Provides an accessible and styled checkbox input with support for various states
	* including checked, unchecked, disabled, and focus states.
	*/

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

// Main Checkbox component implementation
// Uses Radix UI's Checkbox primitive for accessibility and functionality
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base styling for the checkbox
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
      // Focus state styling
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Disabled state styling
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Checked state styling
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    {/* Checkbox indicator that shows the check mark when selected */}
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
