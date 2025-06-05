// Granular controls for notifications by type and channel.
// Adapted from "Notifications" TabsContent.
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface NotificationChannelPrefs {
  email: boolean
  push: boolean // In-app push
  sms: boolean
}

interface NotificationSetting {
  id: string
  label: string
  description: string
  channels: NotificationChannelPrefs
}

const initialNotificationSettings: NotificationSetting[] = [
  {
    id: "newReferral",
    label: "New Referral Posted",
    description: "When a new referral matching your criteria is available.",
    channels: { email: true, push: true, sms: false },
  },
  {
    id: "referralPurchased",
    label: "Referral Purchased",
    description: "When one of your referrals is purchased.",
    channels: { email: true, push: true, sms: false },
  },
  {
    id: "messageReceived",
    label: "New Message Received",
    description: "When you receive a new message in your inbox.",
    channels: { email: false, push: true, sms: true },
  },
  {
    id: "jobUpdate",
    label: "Job Status Update",
    description: "Updates on your active jobs (e.g., marked complete).",
    channels: { email: true, push: true, sms: false },
  },
  {
    id: "reviewReceived",
    label: "New Review Received",
    description: "When a customer leaves you a review.",
    channels: { email: true, push: false, sms: false },
  },
  {
    id: "weeklySummary",
    label: "Weekly Activity Summary",
    description: "A summary of your earnings and activity.",
    channels: { email: true, push: false, sms: false },
  },
  {
    id: "platformUpdates",
    label: "Platform Updates & News",
    description: "Important news and feature updates from ReferralVillage.",
    channels: { email: true, push: false, sms: false },
  },
]

export function NotificationSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<NotificationSetting[]>(initialNotificationSettings)

  const handleChannelChange = (settingId: string, channel: keyof NotificationChannelPrefs, checked: boolean) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === settingId ? { ...setting, channels: { ...setting.channels, [channel]: checked } } : setting,
      ),
    )
  }

  const handleSaveChanges = () => {
    console.log("Saving notification settings:", settings)
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Notification Preferences</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Choose how and when you want to be notified.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="p-4 border rounded-md">
            <div className="mb-3">
              <h4 className="font-medium">{setting.label}</h4>
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(Object.keys(setting.channels) as Array<keyof NotificationChannelPrefs>).map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Switch
                    id={`${setting.id}-${channel}`}
                    checked={setting.channels[channel]}
                    onCheckedChange={(checked) => handleChannelChange(setting.id, channel, checked)}
                  />
                  <Label htmlFor={`${setting.id}-${channel}`} className="capitalize text-sm">
                    {channel === "push" ? "In-App" : channel}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button onClick={handleSaveChanges} className="mt-4">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
