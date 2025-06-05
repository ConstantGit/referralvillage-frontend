import { formatDistanceToNowStrict, format, isToday, isYesterday } from "date-fns"
import type { Conversation, User } from "./types" // Assuming Conversation and User are defined in a types file

export function formatTimestamp(timestamp: Date): string {
  if (isToday(timestamp)) {
    return format(timestamp, "p") // e.g., 2:30 PM
  }
  if (isYesterday(timestamp)) {
    return "Yesterday"
  }
  return format(timestamp, "MMM d") // e.g., Nov 5
}

export function formatRelativeTimestamp(timestamp: Date): string {
  return formatDistanceToNowStrict(timestamp, { addSuffix: true })
}

export function truncateText(text: string | undefined, maxLength: number): string {
  if (!text) return ""
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + "…"
}

export const getOtherParticipant = (conversation: Conversation, currentUserId: string): User | undefined => {
  return conversation.participants.find((p) => p.id !== currentUserId)
}
