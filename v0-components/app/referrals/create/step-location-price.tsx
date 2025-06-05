"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import type { ReferralFormData } from "./page"

const priceOptions = [
  { value: "50", label: "$50" },
  { value: "75", label: "$75" },
  { value: "100", label: "$100" },
  { value: "150", label: "$150" },
  { value: "custom", label: "Custom" },
]

interface StepLocationPriceProps {
  formData: ReferralFormData
  updateFormData: (data: Partial<ReferralFormData>) => void
}

export function StepLocationPrice({ formData, updateFormData }: StepLocationPriceProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Enter address or area (e.g., Downtown Austin, 78701)"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              className="pl-10 py-1.5 px-2.5 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-heading-lg">Referral Fee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {priceOptions.map((option) => (
              <Button
                key={option.value}
                variant={formData.price === option.value ? "default" : "outline"}
                onClick={() => updateFormData({ price: option.value })}
                className={formData.price === option.value ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {option.label}
              </Button>
            ))}
          </div>
          {formData.price === "custom" && (
            <div className="mt-4">
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={formData.customPrice}
                onChange={(e) => updateFormData({ customPrice: e.target.value })}
                className="max-w-xs py-1.5 px-2.5 text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
