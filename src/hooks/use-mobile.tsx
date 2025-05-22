import * as React from "react"

// Define the breakpoint for mobile devices
// Devices with width less than this value are considered mobile
const MOBILE_BREAKPOINT = 768

// Custom hook for detecting mobile devices
// Returns true if the viewport width is less than the mobile breakpoint
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Create a media query listener for mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Handler for viewport size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for viewport changes
    mql.addEventListener("change", onChange)
    
    // Set initial mobile state
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup function to remove event listener
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
