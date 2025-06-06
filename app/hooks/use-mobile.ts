"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Add listener
    media.addEventListener("change", listener);

    // Clean up
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

export function useTablet(): boolean {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
}

export function useDesktop(): boolean {
  return useMediaQuery("(min-width: 1025px)");
}

export function useBreakpoint(): "mobile" | "tablet" | "desktop" {
  const isMobile = useMobile();
  const isTablet = useTablet();

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}

export function useOrientation(): "portrait" | "landscape" {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  return isPortrait ? "portrait" : "landscape";
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useDarkMode(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

export function useTouch(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

export default useMobile;
