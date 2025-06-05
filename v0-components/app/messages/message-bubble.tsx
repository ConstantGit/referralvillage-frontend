"use client"

import type { Message } from "./types"
import { MOCK_CURRENT_USER_ID } from "./types"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { MessageStatusIcon } from "./message-status-icon"
import { Paperclip, FileText, Play, Download } from "lucide-react" // Added Download
import Image from "next/image"

interface MessageBubbleProps {
  message: Message
  showAvatar: boolean // To show avatar only for first message in a sequence from same user
  participantName?: string
  participantAvatarUrl?: string
}

// Simplified Waveform for UI purposes
const VoiceWaveform = ({ waveform, duration }: { waveform?: number[]; duration?: string }) => (
  <div className="flex items-center space-x-2 p-2 bg-black/5 dark:bg-white/5 rounded-md">
    <Play className="h-5 w-5 text-foreground/80" />
    <div className="flex items-end h-8 space-x-0.5">
      {(
        waveform ||
        Array(20)
          .fill(0)
          .map(() => Math.random() * 0.8 + 0.2)
      ).map((val, i) => (
        <div key={i} className="w-0.5 bg-foreground/60" style={{ height: `${val * 100}%` }} />
      ))}
    </div>
    {duration && <span className="text-xs text-muted-foreground">{duration}</span>}
  </div>
)

export function MessageBubble({ message, showAvatar, participantName, participantAvatarUrl }: MessageBubbleProps) {
  const isMe = message.senderId === MOCK_CURRENT_USER_ID

  if (message.isTyping) {
    return null // Typing indicator handled separately
  }

  return (
    <div
      className={cn(
        "flex items-end space-x-2 max-w-[75%] md:max-w-[65%]",
        isMe ? "ml-auto justify-end" : "mr-auto justify-start",
      )}
    >
      {/* Avatar could be added here if needed for received messages based on showAvatar */}
      <div
        className={cn(
          "p-2.5 rounded-xl shadow-sm min-w-[80px]",
          isMe
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card border dark:bg-muted/60 text-card-foreground rounded-bl-none",
        )}
      >
        {message.attachment && (
          <div className="mb-1.5">
            {message.attachment.fileType === "image" ? (
              <Image
                src={message.attachment.url || "/placeholder.svg"}
                alt={message.attachment.fileName}
                width={250}
                height={200}
                className="max-w-xs max-h-60 rounded-md object-cover cursor-pointer"
                onClick={() => window.open(message.attachment.url, "_blank")} // Simple preview
              />
            ) : message.attachment.fileType === "audio" ? (
              <VoiceWaveform waveform={message.attachment.waveform} duration={message.attachment.duration} />
            ) : (
              <a
                href={message.attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors"
              >
                {message.attachment.fileType === "video" ? (
                  <Paperclip className="h-6 w-6 text-foreground/70" />
                ) : (
                  <FileText className="h-6 w-6 text-foreground/70" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{message.attachment.fileName}</p>
                  {message.attachment.size && (
                    <p className="text-xs text-muted-foreground">{message.attachment.size}</p>
                  )}
                </div>
                <Download className="h-5 w-5 text-muted-foreground" />
              </a>
            )}
          </div>
        )}
        {message.text && <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>}
        <div className={cn("flex items-center mt-1", isMe ? "justify-end" : "justify-start")}>
          <span className={cn("text-xs", isMe ? "text-primary-foreground/70" : "text-muted-foreground/80")}>
            {format(message.timestamp, "p")}
          </span>
          {isMe && <MessageStatusIcon status={message.status} className="ml-1.5" />}
        </div>
      </div>
    </div>
  )
}
