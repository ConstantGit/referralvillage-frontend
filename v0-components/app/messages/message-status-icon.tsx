import type { MessageStatus } from "./types"
import { Check, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageStatusIconProps {
  status?: MessageStatus
  className?: string
}

export function MessageStatusIcon({ status, className }: MessageStatusIconProps) {
  if (!status) return null

  const iconClassName = cn("h-4 w-4", className)

  switch (status) {
    case "sent":
      return <Check className={cn(iconClassName, "text-muted-foreground/70 dark:text-muted-foreground/50")} />
    case "delivered":
      return <CheckCheck className={cn(iconClassName, "text-muted-foreground/70 dark:text-muted-foreground/50")} />
    case "read":
      return <CheckCheck className={cn(iconClassName, "text-sky-500 dark:text-sky-400")} /> // WhatsApp uses blue for read
    default:
      return null
  }
}
