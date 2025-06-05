"use client"

import type { Conversation } from "./types"
import { MOCK_CURRENT_USER_ID } from "./types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatTimestamp, truncateText, getOtherParticipant } from "./utils"

interface ChatListItemProps {
  conversation: Conversation
  isSelected: boolean
  onSelect: () => void
}

export function ChatListItem({ conversation, isSelected, onSelect }: ChatListItemProps) {
  const otherUser = getOtherParticipant(conversation, MOCK_CURRENT_USER_ID)

  if (!otherUser) return null // Should not happen in a valid conversation

  const lastMessageText = conversation.lastMessage?.isTyping
    ? "Typing..."
    : conversation.lastMessage?.attachment
      ? `📎 ${conversation.lastMessage.attachment.fileName}`
      : truncateText(conversation.lastMessage?.text, 25)

  return (
    <div
      className={cn(
        "flex items-center p-3 space-x-3 cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors",
        isSelected ? "bg-primary/10 dark:bg-primary/20" : "border-b border-border/50",
      )}
      onClick={onSelect}
    >
      <div className="relative">
        <Avatar className="h-11 w-11">
          <AvatarImage src={otherUser.avatarUrl || `/placeholder.svg?text=${otherUser.name[0]}`} alt={otherUser.name} />
          <AvatarFallback>{otherUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        {otherUser.isOnline && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm text-foreground truncate">{otherUser.name}</h3>
          {conversation.lastMessage && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimestamp(conversation.lastMessage.timestamp)}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <p
            className={cn(
              "text-xs truncate",
              conversation.lastMessage?.isTyping ? "text-primary italic" : "text-muted-foreground",
            )}
          >
            {lastMessageText}
          </p>
          {conversation.unreadCount > 0 && (
            <Badge
              variant="default"
              className="h-5 min-w-[1.25rem] px-1.5 text-xs flex items-center justify-center bg-primary text-primary-foreground"
            >
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
        {conversation.serviceContext && (
          <p className="text-xs text-primary/80 truncate mt-0.5">{conversation.serviceContext}</p>
        )}
      </div>
    </div>
  )
}
