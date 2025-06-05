"use client"

import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw } from "lucide-react"

interface NetworkErrorProps {
  onRetry: () => void
  title?: string
  message?: string
  className?: string
}

export function NetworkError({
  onRetry,
  title = "Connection Lost",
  message = "We couldn't connect to our servers. Please check your internet connection and try again.",
  className = "",
}: NetworkErrorProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 md:p-10 bg-background rounded-lg border border-dashed border-destructive/50 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4 bg-destructive/10 rounded-full mb-6">
        <WifiOff className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <Button onClick={onRetry} variant="destructive" size="lg">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  )
}
