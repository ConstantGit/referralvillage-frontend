"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, Copy, Users, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ReferralFormData } from "./page"

interface StepSharingOptionsProps {
  formData: ReferralFormData
  updateFormData: (data: Partial<ReferralFormData>) => void
}

export function StepSharingOptions({ formData, updateFormData }: StepSharingOptionsProps) {
  const { toast } = useToast()

  const handleGenerateLink = () => {
    const link = `https://referralvillage.com/r/${Math.random().toString(36).substr(2, 9)}`
    updateFormData({ generatedLink: link })
  }

  const handleCopyLink = async () => {
    if (!formData.generatedLink) return
    try {
      await navigator.clipboard.writeText(formData.generatedLink)
      toast({
        title: "Link copied!",
        description: "Referral link has been copied to your clipboard.",
      })
    } catch (err) {
      console.error("Failed to copy link:", err)
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Sharing Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <div
              className={`p-1.5 rounded-full transition-colors ${formData.sharingType === "private" ? "bg-purple-600" : "bg-gray-300"}`}
            >
              <Lock
                className={`h-4 w-4 transition-colors ${formData.sharingType === "private" ? "text-white" : "text-gray-500"}`}
              />
            </div>
            <Label htmlFor="sharing-toggle" className="text-body-md font-medium cursor-pointer">
              {formData.sharingType === "private" ? "Private Referral" : "Public Marketplace"}
            </Label>
          </div>
          <Switch
            id="sharing-toggle"
            checked={formData.sharingType === "public"}
            onCheckedChange={(checked) => updateFormData({ sharingType: checked ? "public" : "private" })}
            className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-300"
          />
        </div>
        <p className="text-body-md text-muted mt-2 px-1">
          {formData.sharingType === "private"
            ? "Share via private link - only people with the link can purchase."
            : "List on marketplace - any verified provider can purchase."}
        </p>

        {formData.sharingType === "private" && (
          <div className="space-y-4 pt-4 border-t">
            <Button onClick={handleGenerateLink} variant="outline" className="w-full sm:w-auto">
              <LinkIcon className="h-4 w-4 mr-2" />
              Generate Shareable Link
            </Button>
            {formData.generatedLink && (
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Input value={formData.generatedLink} readOnly className="flex-1 bg-white py-1.5 px-2.5 text-sm" />
                <Button
                  size="sm"
                  onClick={handleCopyLink}
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Copy className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
              </div>
            )}
          </div>
        )}

        {formData.sharingType === "public" && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-heading-md">Available Providers in Your Network (Example)</h4>
            <div className="space-y-3">
              {[
                { name: "Austin Plumbing Pro", rating: 4.9, jobs: 234 },
                { name: "Reliable Home Services", rating: 4.7, jobs: 156 },
              ].map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-body-md font-medium">{provider.name}</p>
                      <p className="text-body-sm text-muted">
                        ⭐ {provider.rating} • {provider.jobs} jobs completed
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Verified</Badge>
                </div>
              ))}
              <Button variant="link" className="p-0 h-auto text-purple-700">
                View all providers in network
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
