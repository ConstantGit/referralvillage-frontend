"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/lib/pusher"
import { toast } from "sonner"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/empty-state"
import { NetworkError } from "@/components/network-error"

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}

interface Conversation {
  id: string
  name: string
  image: string
  lastMessage: string | null
  lastMessageTime: string | null
  userIds: string[]
}

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const chatId = searchParams.get("chatId")
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoadingConversations, setIsLoadingConversations] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [fetchConversationsError, setFetchConversationsError] = useState(false)
  const [fetchMessagesError, setFetchMessagesError] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const retryFetchConversations = () => {
    setFetchConversationsError(false)
    fetchConversations()
  }
  const retryFetchMessages = () => {
    setFetchMessagesError(false)
    fetchMessages()
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  useEffect(() => {
    if (chatId) {
      fetchMessages()
    } else {
      setMessages([])
    }
  }, [chatId])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (!session?.user?.id) return

    const channel = pusherClient.subscribe("messages")

    channel.bind("new-message", (data: Message) => {
      if (
        (data.senderId === session.user.id && selectedConversation?.userIds.includes(data.senderId)) ||
        (selectedConversation?.userIds.includes(data.senderId) && data.senderId !== session.user.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, data])
      }
    })

    return () => {
      pusherClient.unsubscribe("messages")
    }
  }, [session?.user?.id, selectedConversation?.userIds])

  async function fetchConversations() {
    setIsLoadingConversations(true)
    try {
      const response = await fetch("/api/conversations")
      if (!response.ok) {
        setFetchConversationsError(true)
        throw new Error("Failed to fetch conversations")
      }
      const data = await response.json()
      setConversations(data)
    } catch (error) {
      console.error("Error fetching conversations:", error)
    } finally {
      setIsLoadingConversations(false)
    }
  }

  async function fetchMessages() {
    setIsLoadingMessages(true)
    setFetchMessagesError(false)
    try {
      const response = await fetch(`/api/messages?chatId=${chatId}`)
      if (!response.ok) {
        setFetchMessagesError(true)
        throw new Error("Failed to fetch messages")
      }
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoadingMessages(false)
    }
  }

  async function handleSendMessage() {
    if (!newMessage || !chatId || !session?.user?.id) return

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          senderId: session.user.id,
          text: newMessage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setNewMessage("")
      fetchMessages()
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
    }
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    router.push(`/messages?chatId=${conversation.id}`)
  }

  const filteredConversations = conversations.sort((a, b) => {
    const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0
    const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0
    return timeB - timeA
  })

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="flex h-full flex-col">
          <div className="border-b">
            <div className="grid h-16 place-items-center">
              <div className="text-2xl font-semibold">Chats</div>
            </div>
          </div>
          <div className="border-b">
            <div className="grid h-14 place-items-center">
              <Input type="search" placeholder="Search chats..." />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              {isLoadingConversations ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="mb-4 space-y-2">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[150px]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : fetchConversationsError ? (
                <div className="p-4">
                  <NetworkError
                    onRetry={retryFetchConversations}
                    title="Couldn't Load Chats"
                    message="Failed to fetch your conversations. Please check your connection."
                  />
                </div>
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "mb-4 rounded-md p-3 hover:bg-accent",
                      selectedConversation?.id === conversation.id ? "bg-accent" : "",
                    )}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={conversation.image || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{conversation.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {conversation.lastMessage || "No recent messages"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState title="No conversations yet" description="Start a new conversation" />
              )}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>

      <ResizableHandle className="rotate-0 !bg-border" />

      <ResizablePanel defaultSize={70} minSize={50}>
        <div className="flex h-full flex-col">
          <div className="border-b">
            <div className="grid h-16 place-items-center">
              {selectedConversation ? (
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={selectedConversation.image || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{selectedConversation.name}</p>
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-semibold">Select a Chat</div>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {isLoadingMessages ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex w-full items-end">
                      <div className="space-y-2 rounded-lg bg-secondary p-2 text-sm">
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </>
              ) : fetchMessagesError ? (
                <div className="flex flex-1 items-center justify-center p-4">
                  <NetworkError
                    onRetry={retryFetchMessages}
                    title="Couldn't Load Messages"
                    message="Failed to load messages for this chat. Please check your connection."
                  />
                </div>
              ) : selectedConversation && messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-full items-end",
                      message.senderId === session?.user?.id ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "space-y-2 rounded-lg p-2 text-sm",
                        message.senderId === session?.user?.id ? "bg-primary text-primary-foreground" : "bg-secondary",
                      )}
                    >
                      <p>{message.text}</p>
                      <time className="text-xs text-muted-foreground">
                        {format(new Date(message.timestamp), "MMM d, yyyy h:mm a")}
                      </time>
                    </div>
                  </div>
                ))
              ) : selectedConversation ? (
                <EmptyState title="No messages yet" description="Start the conversation" />
              ) : (
                <EmptyState title="No conversation selected" description="Select a conversation to view messages" />
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="border-t">
            <div className="grid h-20 place-items-center">
              <div className="flex w-full items-center space-x-4 p-4">
                <Input
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
