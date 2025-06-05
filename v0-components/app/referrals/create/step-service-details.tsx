"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Home, Zap, Wind, Paintbrush, MoreHorizontal } from "lucide-react"
import type { ReferralFormData } from "./page"

const serviceTypes = [
  { id: "plumbing", name: "Plumbing", icon: Wrench, color: "bg-blue-100 text-blue-600" },
  { id: "roofing", name: "Roofing", icon: Home, color: "bg-red-100 text-red-600" },
  { id: "electrical", name: "Electrical", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
  { id: "hvac", name: "HVAC", icon: Wind, color: "bg-green-100 text-green-600" },
  { id: "painting", name: "Painting", icon: Paintbrush, color: "bg-purple-100 text-purple-600" },
  { id: "other", name: "Other", icon: MoreHorizontal, color: "bg-gray-100 text-gray-600" },
]

interface StepServiceDetailsProps {
  formData: ReferralFormData
  updateFormData: (data: Partial<ReferralFormData>) => void
}

export function StepServiceDetails({ formData, updateFormData }: StepServiceDetailsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-lg">Select Service Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => updateFormData({ serviceType: service.id })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.serviceType === service.id
                    ? "border-purple-500 bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <p className="text-body-md font-medium text-center">{service.name}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-heading-lg">Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe the service needed, timeline, budget range, and any special requirements..."
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            rows={6}
            className="min-h-[120px] py-1.5 px-2.5 text-sm"
          />
        </CardContent>
      </Card>
    </>
  )
}
