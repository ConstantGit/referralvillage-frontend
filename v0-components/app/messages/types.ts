export type MessageStatus = "sent" | "delivered" | "read"

export type Attachment = {
  id: string
  fileName: string
  fileType: "image" | "audio" | "video" | "document" | "other"
  url: string // For image previews or download links
  size?: string // e.g., "1.2MB"
  waveform?: number[] // For voice notes, array of numbers for visualization
  duration?: string // For voice/video, e.g., "0:35"
}

export type Message = {
  id: string
  senderId: string // "me" or other user's ID
  text?: string
  timestamp: Date
  status?: MessageStatus // Only for messages sent by "me"
  attachment?: Attachment
  isTyping?: boolean // Special message type for typing indicator
}

export type User = {
  id: string
  name: string
  avatarUrl?: string
  isOnline: boolean
  lastSeen?: Date | string // Could be "typing..."
}

export type Conversation = {
  id: string
  participants: User[] // Typically [me, otherUser]
  messages: Message[]
  unreadCount: number
  lastMessage?: Message // For quick preview in chat list
  isArchived?: boolean
  // Potentially add other metadata like associated referral/service
  serviceContext?: string
}

// Mock current user ID
export const MOCK_CURRENT_USER_ID = "user_me_123"
