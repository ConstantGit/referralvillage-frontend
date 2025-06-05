"use client"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorDisplayProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({
  title = "Oops! Something went wrong.",
  message,
  onRetry,
  className,
}: ErrorDisplayProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 border border-red-200 bg-red-50 rounded-lg text-center ${className}`}
      role="alert"
    >
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-red-700 mb-2">{title}</h3>
      <p className="text-red-600 mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="destructive" className="bg-red-600 hover:bg-red-700">
          Try Again
        </Button>
      )}
    </div>
  )
}
