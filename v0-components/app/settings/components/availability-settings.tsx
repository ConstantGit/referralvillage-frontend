// This component is preserved from the old settings page, useful for Providers.
// It can be conditionally rendered based on user role.
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface AvailabilityData {
  [day: string]: { enabled: boolean; start: string; end: string }
}

export function AvailabilitySettings({ initialData }: { initialData: AvailabilityData }) {
  const { toast } = useToast()
  const [availability, setAvailability] = useState<AvailabilityData>(initialData)

  const handleAvailabilityChange = (day: string, field: string, value: string | boolean) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const handleSaveChanges = () => {
    console.log("Saving availability settings:", availability)
    toast({ title: "Availability Settings Saved" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Availability Settings</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Set your working hours. This helps us match you with relevant referrals. (Primarily for Providers)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-4 border rounded-md">
            <div className="flex items-center justify-between mb-3">
              <Label htmlFor={`avail-${day}-toggle`} className="font-medium">
                {day}
              </Label>
              <Switch
                id={`avail-${day}-toggle`}
                checked={availability[day].enabled}
                onCheckedChange={(checked) => handleAvailabilityChange(day, "enabled", checked)}
              />
            </div>
            {availability[day].enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`avail-${day}-start`} className="text-xs">
                    Start Time
                  </Label>
                  <Input
                    id={`avail-${day}-start`}
                    type="time"
                    value={availability[day].start}
                    onChange={(e) => handleAvailabilityChange(day, "start", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`avail-${day}-end`} className="text-xs">
                    End Time
                  </Label>
                  <Input
                    id={`avail-${day}-end`}
                    type="time"
                    value={availability[day].end}
                    onChange={(e) => handleAvailabilityChange(day, "end", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <Button onClick={handleSaveChanges} className="mt-4">
          Save Availability
        </Button>
      </CardContent>
    </Card>
  )
}
