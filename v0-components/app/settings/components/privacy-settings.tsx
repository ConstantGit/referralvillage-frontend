// Manages data sharing, visibility, blocked users, data download.
// Adapted from "Privacy" TabsContent.
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Download, UserX, EyeOff } from "lucide-react" // Added EyeOff for visibility

interface PrivacyData {
  profileVisibility: "public" | "connections" | "private"
  shareDataWithPartners: boolean
  showActivityStatus: boolean
}

export function PrivacySettings({ initialData }: { initialData: PrivacyData }) {
  const { toast } = useToast()
  const [privacySettings, setPrivacySettings] = useState<PrivacyData>(initialData)

  const handleChange = (name: keyof PrivacyData, value: string | boolean) => {
    setPrivacySettings({ ...privacySettings, [name]: value })
  }

  const handleDownloadData = () => {
    toast({
      title: "Data Download Requested",
      description: "Your data export is being prepared. You'll receive an email when it's ready.",
    })
    // Mock download
    const mockData = JSON.stringify({ privacySettings /* include other relevant data */ }, null, 2)
    const blob = new Blob([mockData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "my_referral_village_data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveChanges = () => {
    console.log("Saving privacy settings:", privacySettings)
    toast({ title: "Privacy Settings Saved" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Privacy Settings</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Control how your information is shared and seen on ReferralVillage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 p-4 border rounded-md">
          <Label htmlFor="profileVisibility" className="font-medium">
            Profile Visibility
          </Label>
          <Select
            value={privacySettings.profileVisibility}
            onValueChange={(value: "public" | "connections" | "private") => handleChange("profileVisibility", value)}
          >
            <SelectTrigger id="profileVisibility">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center">
                  <EyeOff className="h-4 w-4 mr-2 text-green-500" /> Public (Visible to everyone)
                </div>
              </SelectItem>
              <SelectItem value="connections">
                <div className="flex items-center">
                  <UserX className="h-4 w-4 mr-2 text-blue-500" /> Connections Only (Visible to your network)
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center">
                  <EyeOff className="h-4 w-4 mr-2 text-red-500" /> Private (Visible only to you)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Choose who can see your profile details.</p>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md">
          <div>
            <Label htmlFor="shareDataWithPartners" className="font-medium">
              Share data with trusted partners
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Allow sharing of anonymized data to improve services and offers.
            </p>
          </div>
          <Switch
            id="shareDataWithPartners"
            checked={privacySettings.shareDataWithPartners}
            onCheckedChange={(checked) => handleChange("shareDataWithPartners", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md">
          <div>
            <Label htmlFor="showActivityStatus" className="font-medium">
              Show your activity status
            </Label>
            <p className="text-xs text-muted-foreground mt-1">Let others see when you are active on the platform.</p>
          </div>
          <Switch
            id="showActivityStatus"
            checked={privacySettings.showActivityStatus}
            onCheckedChange={(checked) => handleChange("showActivityStatus", checked)}
          />
        </div>

        <div className="pt-6 border-t space-y-4">
          <h3 className="text-lg font-medium">Manage Your Data</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-3">
            <div>
              <Label className="font-medium">Download Your Data</Label>
              <p className="text-sm text-muted-foreground">Get a copy of your personal information.</p>
            </div>
            <Button variant="outline" onClick={handleDownloadData}>
              <Download className="h-4 w-4 mr-2" />
              Request Data Export
            </Button>
          </div>
          {/* Placeholder for Manage Blocked Users */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-3 bg-muted/30">
            <div>
              <Label className="font-medium">Manage Blocked Users</Label>
              <p className="text-sm text-muted-foreground">View and manage users you've blocked.</p>
            </div>
            <Button variant="outline" disabled>
              <UserX className="h-4 w-4 mr-2" />
              View Blocked Users (Coming Soon)
            </Button>
          </div>
        </div>
        <Button onClick={handleSaveChanges} className="mt-4">
          Save Privacy Settings
        </Button>
      </CardContent>
    </Card>
  )
}
