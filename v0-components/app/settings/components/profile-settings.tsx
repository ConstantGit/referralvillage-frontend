// This component will manage profile information: photo, name, email (display), bio, company info.
// Adapted from the "Profile" TabsContent of the existing settings page.
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadCloud } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfileData {
  name: string
  email: string // Display only, actual change in Account settings
  bio: string
  avatarUrl: string
  companyName: string
  companyWebsite: string
  companyAddress: string
  specialties?: string // Kept from old version, can be part of bio or separate
}

export function ProfileSettings({ initialData }: { initialData: ProfileData }) {
  const { toast } = useToast()
  const [profileData, setProfileData] = useState<ProfileData>(initialData)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData.avatarUrl)
  const avatarFileRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarPreview(URL.createObjectURL(file))
      // In a real app, you'd upload the file here
      console.log("Selected avatar file:", file.name)
    }
  }

  const handleSaveChanges = () => {
    // Simulate API call
    console.log("Saving profile data:", profileData)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Profile Information</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Update your personal and company details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={avatarPreview || "/placeholder.svg?width=80&height=80&query=avatar"}
              alt={profileData.name}
            />
            <AvatarFallback>
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("") || "JD"}
            </AvatarFallback>
          </Avatar>
          <Input type="file" accept="image/*" onChange={handleAvatarChange} ref={avatarFileRef} className="hidden" />
          <Button variant="outline" onClick={() => avatarFileRef.current?.click()}>
            <UploadCloud className="h-4 w-4 mr-2" />
            Change Photo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address (Read-only)</Label>
            <Input id="email" name="email" type="email" value={profileData.email} readOnly disabled />
            <p className="text-xs text-muted-foreground">To change your email, go to Account settings.</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />
        </div>

        {profileData.specialties !== undefined && ( // Conditionally render specialties if it was part of initial data
          <div className="space-y-1.5">
            <Label htmlFor="specialties">Specialties</Label>
            <Input
              id="specialties"
              name="specialties"
              value={profileData.specialties}
              onChange={handleChange}
              placeholder="e.g., Residential, Commercial"
            />
          </div>
        )}

        <h3 className="text-lg font-medium pt-4 border-t">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" name="companyName" value={profileData.companyName} onChange={handleChange} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              name="companyWebsite"
              type="url"
              value={profileData.companyWebsite}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Textarea
            id="companyAddress"
            name="companyAddress"
            value={profileData.companyAddress}
            onChange={handleChange}
            placeholder="123 Main St, Anytown, USA"
          />
        </div>

        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  )
}
