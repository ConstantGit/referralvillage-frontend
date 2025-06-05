import type React from "react"
import { cn } from "@/lib/utils"

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "text" | "avatar" | "card" | "button"
  lines?: number // for text type
}

export function SkeletonLoader({ className, type = "text", lines = 1, ...props }: SkeletonLoaderProps) {
  if (type === "avatar") {
    return <div className={cn("h-12 w-12 rounded-full bg-gray-200 animate-pulse", className)} {...props} />
  }

  if (type === "card") {
    return (
      <div className={cn("p-4 space-y-3 border rounded-lg bg-white", className)} {...props}>
        <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="h-8 w-1/3 rounded bg-gray-200 animate-pulse" />
      </div>
    )
  }

  if (type === "button") {
    return <div className={cn("h-10 w-24 rounded-md bg-gray-200 animate-pulse", className)} {...props} />
  }

  // Default to text
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gray-200 rounded animate-pulse",
            i > 0 && "w-5/6", // make subsequent lines shorter
            lines === 1 && "w-full",
          )}
        />
      ))}
    </div>
  )
}
