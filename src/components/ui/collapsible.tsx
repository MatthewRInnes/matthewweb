/**
	* Collapsible Component
	* A set of components for creating collapsible/expandable content sections.
	* Built on top of Radix UI's Collapsible primitive for accessibility and functionality.
	* Provides smooth animations and keyboard navigation support.
	*/

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Main collapsible container component
// Handles the state and animation of the collapsible section
const Collapsible = CollapsiblePrimitive.Root

// Trigger component that toggles the collapsible content
// Can be any element that triggers the expand/collapse action
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// Content component that contains the collapsible content
// Animates smoothly when expanding or collapsing
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

// Export all collapsible components for use in the application
export { Collapsible, CollapsibleTrigger, CollapsibleContent }
