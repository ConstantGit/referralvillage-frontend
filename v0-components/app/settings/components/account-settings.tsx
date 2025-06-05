// This component will manage email change, password/auth method, 2FA, account deletion.
// Adapted from "Security" and parts of "Privacy" TabsContent.
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QrCode, Trash2 } from "lucide-react"

interface AccountSettingsData {
  currentEmail: string
  is2FAEnabled: boolean
}

export function AccountSettings({ initialData }: { initialData: AccountSettingsData }) {
  const { toast } = useToast()
  const [newEmail, setNewEmail] = useState("")
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(initialData.is2FAEnabled)
  // Add states for password change if applicable, or magic link settings

  const handleEmailChangeRequest = () => {
    // Simulate sending a verification link to the new email
    console.log("Requesting email change to:", newEmail)
    toast({
      title: "Email Change Requested",
      description: `A verification link has been sent to ${newEmail}. Please check your inbox.`,
    })
    setNewEmail("")
  }

  const handleEnable2FA = () => {
    // Simulate enabling 2FA
    setIs2FAEnabled(true)
    setIs2FAModalOpen(false)
    toast({ title: "2FA Enabled", description: "Two-Factor Authentication has been successfully enabled." })
  }

  const handleDeleteAccount = () => {
    // In a real app, this would trigger a series of backend processes.
    toast({
      title: "Account Deletion Initiated",
      description: "Your account deletion request has been received. This is a mock action.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Account Settings</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Manage your login credentials and account security.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 p-4 border rounded-md">
          <Label htmlFor="newEmail">Change Email Address</Label>
          <p className="text-sm text-muted-foreground">Current email: {initialData.currentEmail}</p>
          <div className="flex space-x-2">
            <Input
              id="newEmail"
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button onClick={handleEmailChangeRequest} disabled={!newEmail}>
              Send Verification
            </Button>
          </div>
        </div>

        {/* Password Management Section - Placeholder for magic link or password change UI */}
        <div className="p-4 border rounded-md">
          <Label className="font-medium">Authentication Method</Label>
          <p className="text-sm text-muted-foreground mb-2">You are currently using magic links to sign in.</p>
          {/* <Button variant="outline">Manage Sign-in Options</Button> */}
          {/* Or, if using passwords:
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Change Password</Label>
              <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          */}
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md">
          <div>
            <Label className="font-medium">Two-Factor Authentication (2FA)</Label>
            <p className="text-sm text-muted-foreground">
              {is2FAEnabled ? "Enabled" : "Enhance your account security."}
            </p>
          </div>
          <Button variant="outline" onClick={() => setIs2FAModalOpen(true)}>
            {is2FAEnabled ? "Manage 2FA" : "Enable 2FA"}
          </Button>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-2 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/30">
            <div>
              <Label className="font-medium text-destructive">Delete Your Account</Label>
              <p className="text-sm text-red-600 dark:text-red-400">
                Permanently remove your account and all associated data.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start mt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="button" variant="destructive" onClick={handleDeleteAccount}>
                    Yes, Delete My Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* 2FA Setup Modal */}
        <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
              <DialogDescription>Scan the QR code with your authenticator app, then enter the code.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-muted rounded-md inline-block">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Or enter this code manually: <span className="font-mono text-foreground">MOCK CODE 123</span>
              </p>
              <div>
                <Label htmlFor="2fa-code">Verification Code</Label>
                <Input id="2fa-code" placeholder="Enter 6-digit code" />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEnable2FA}>Verify & Enable</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
