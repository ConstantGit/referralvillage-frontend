// This hook should already exist from previous iterations.
// If not, here's a basic implementation:
"use client"
import { useState, useEffect } from "react"

const useMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handleChange = () => setIsMobile(mediaQuery.matches)

    // Initial check
    handleChange()

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [query])

  return isMobile
}

export default useMobile
