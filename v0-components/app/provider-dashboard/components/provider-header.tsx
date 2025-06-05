// app/provider-dashboard/components/provider-header.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { TrustScore } from "@/components/trust-score"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit3 } from "lucide-react"
import type { Provider } from "../types"

interface ProviderHeaderProps {
  provider: Provider
  onAvailabilityChange: (isAvailable: boolean) => void
}

export function ProviderHeader({ provider, onAvailabilityChange }: ProviderHeaderProps) {
  const [isAvailable, setIsAvailable] = useState(provider.isAvailable)

  const handleToggle = (checked: boolean) => {
    setIsAvailable(checked)
    onAvailabilityChange(checked)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-1">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarImage src={provider.logoUrl || "/placeholder.svg"} alt={provider.businessName} />
          <AvatarFallback className="text-xl font-semibold bg-muted">{provider.avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-heading-lg font-bold text-foreground">{provider.businessName}</h1>
          <TrustScore
            score={provider.trustScore}
            totalReferrals={provider.totalReferralsForTrustScore || 0}
            qualityRate={provider.qualityRateForTrustScore || 0}
            size="sm"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 sm:mt-0">
        <div className="flex items-center space-x-2">
          <Switch
            id="availability-toggle"
            checked={isAvailable}
            onCheckedChange={handleToggle}
            aria-label="Availability status"
          />
          <Label
            htmlFor="availability-toggle"
            className={isAvailable ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}
          >
            {isAvailable ? "Available for Jobs" : "Currently Busy"}
          </Label>
        </div>
        <Button variant="outline" size="sm">
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  )
}
