"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCheck, Settings, Eye, MessageSquare, X } from "lucide-react"
import Link from "next/link"

type Notification = {
  id: string
  type: "referral" | "message" | "system"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  isUrgent?: boolean
  link?: string
  actions?: { label: string; href: string; variant?: "default" | "outline" | "destructive" }[]
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "referral",
    title: "New Hot Lead: Emergency Plumbing",
    description: "A new urgent plumbing referral in Downtown Austin is available. Fee: $150.",
    timestamp: "2 mins ago",
    isRead: false,
    isUrgent: true,
    link: "/referrals/xyz123",
    actions: [{ label: "View Referral", href: "/referrals/xyz123" }],
  },
  {
    id: "2",
    type: "message",
    title: "Message from Provider: Austin Plumbing Pro",
    description: "Regarding 'Kitchen Sink Backup' - I can take this job. What's the best contact number?",
    timestamp: "15 mins ago",
    isRead: false,
    link: "/messages/austin-plumbing-pro",
    actions: [
      { label: "Reply", href: "/messages/austin-plumbing-pro" },
      { label: "Mark as Read", href: "#", variant: "outline" },
    ],
  },
  {
    id: "3",
    type: "system",
    title: "Weekly Summary Available",
    description: "Your weekly referral performance summary is ready. You had 5 new referrals this week.",
    timestamp: "1 hour ago",
    isRead: true,
    link: "/dashboard/reports",
  },
  {
    id: "4",
    type: "referral",
    title: "Referral Purchased: Roof Inspection",
    description: "Your 'Roof Inspection - Cedar Park' referral was purchased by Reliable Roofing.",
    timestamp: "3 hours ago",
    isRead: true,
    link: "/referrals/abc789",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead
    if (activeTab === "urgent") return n.isUrgent && !n.isRead
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-0">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
          <div>
            <h1 className="text-heading-2xl text-gray-900 mb-1">Notifications</h1>
            <p className="text-body-md text-muted">Stay updated with your ReferralVillage activity.</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={notifications.every((n) => n.isRead)}>
              <CheckCheck className="h-4 w-4 mr-2" /> Mark all as read
            </Button>
            <Link href="/settings?tab=notifications">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread{" "}
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <Badge className="ml-2 bg-purple-600 text-white">{notifications.filter((n) => !n.isRead).length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="urgent">
              Urgent
              {notifications.filter((n) => n.isUrgent && !n.isRead).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {notifications.filter((n) => n.isUrgent && !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-4">
            {filteredNotifications.length === 0 && (
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-body-md text-muted">No notifications here.</p>
                </CardContent>
              </Card>
            )}
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all ${!notification.isRead ? "border-purple-300 bg-purple-50/30" : "bg-white"}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {notification.type === "referral" && (
                        <div
                          className={`p-2 rounded-full ${notification.isUrgent ? "bg-orange-100" : "bg-purple-100"}`}
                        >
                          <Eye className={`h-5 w-5 ${notification.isUrgent ? "text-orange-600" : "text-purple-600"}`} />
                        </div>
                      )}
                      {notification.type === "message" && (
                        <div className="p-2 rounded-full bg-blue-100">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      {notification.type === "system" && (
                        <div className="p-2 rounded-full bg-gray-100">
                          <Bell className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-body-lg font-semibold">{notification.title}</h4>
                        {!notification.isRead && (
                          <div className="h-2 w-2 rounded-full bg-purple-500" title="Unread"></div>
                        )}
                      </div>
                      <p className="text-body-md text-muted mt-1">{notification.description}</p>
                      <p className="text-body-xs text-muted mt-2">{notification.timestamp}</p>

                      {notification.actions && notification.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {notification.actions.map((action, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant={action.variant || "default"}
                              onClick={() => {
                                if (action.label === "Mark as Read") markAsRead(notification.id)
                                // For actual navigation, use Link or router.push
                                if (action.href !== "#" && action.label !== "Mark as Read") {
                                  // router.push(action.href) or wrap with Link
                                  console.log("Navigate to:", action.href)
                                }
                              }}
                              className={action.variant === "default" ? "bg-purple-600 hover:bg-purple-700" : ""}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
