"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrustScore } from "@/components/trust-score"
import { MapPin, Clock, Wrench, CreditCard, Building2, MessageSquare, AlertTriangle, Timer } from "lucide-react"
// Add Breadcrumbs import
import { Breadcrumbs, generateBreadcrumbsFromPath } from "@/components/breadcrumbs"
import { usePathname } from "next/navigation" // Ensure usePathname is imported

export default function ReferralDetailsPage({ params }: { params: { id: string } }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const pathname = usePathname() // Get current pathname
  const breadcrumbItems = generateBreadcrumbsFromPath(pathname)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    // Handle success
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-0">
      <div className="max-w-4xl mx-auto p-3 md:p-4 space-y-4">
        {" "}
        {/* Reduced padding and space-y */}
        <Breadcrumbs items={breadcrumbItems} /> {/* Add Breadcrumbs component here */}
        {/* Hot Lead Alert */}
        <Alert className="border-orange-200 bg-orange-50 p-3">
          {" "}
          {/* Reduced padding */}
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 font-medium text-sm">
            {" "}
            {/* Ensure text size is appropriate */}🔥 Hot Lead - Respond Quickly! Customer needs service TODAY
          </AlertDescription>
        </Alert>
        <div className="grid lg:grid-cols-3 gap-4">
          {" "}
          {/* Reduced gap */}
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <Card>
              <CardHeader className="p-3">
                {" "}
                {/* Reduced padding */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wrench className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Emergency Plumbing Repair</CardTitle> {/* Slightly smaller */}
                      <p className="text-gray-600">Residential • Same Day Service</p>
                    </div>
                  </div>
                  <Badge variant="destructive">URGENT</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                {" "}
                {/* Reduced padding */}
                <div className="text-center py-3">
                  {" "}
                  {/* Reduced py */}
                  <div className="text-3xl font-bold text-purple-600 mb-1">$150</div>{" "}
                  {/* Slightly smaller, reduced mb */}
                  <p className="text-gray-600">Referral Fee</p>
                </div>
              </CardContent>
            </Card>

            {/* Countdown Timer */}
            <Card className="border-orange-200">
              <CardContent className="p-3">
                {" "}
                {/* Reduced padding */}
                <div className="flex items-center justify-center space-x-2 text-orange-600">
                  <Timer className="h-5 w-5" />
                  <span className="font-medium">This offer expires in:</span>
                  <div className="font-mono text-lg font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Service Details */}
            <div className="grid md:grid-cols-2 gap-4">
              {" "}
              {/* Reduced gap */}
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <p className="font-medium">Downtown Austin</p>
                  <p className="text-gray-600">78701 • 2.3 miles from you</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View on Map
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <p className="font-medium text-red-600">ASAP - Today</p>
                  <p className="text-gray-600">Customer available all day</p>
                  <Badge variant="secondary" className="mt-2">
                    High Priority
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Service Details */}
            <Card>
              <CardHeader className="p-3">
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-body-md">Issue Description:</h4> {/* Use typography class */}
                    <p className="text-muted text-body-sm">
                      Kitchen sink completely backed up, water not draining at all. Possible main line blockage.
                      Customer has tried basic solutions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-body-md">Property Type:</h4>
                    <p className="text-muted text-body-sm">Single family home, built 1995</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-body-md">Budget Range:</h4>
                    <p className="text-muted text-body-sm">$200 - $500 (flexible for emergency)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader className="p-3">
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Mitchell</h4>
                    <p className="text-gray-600">Homeowner • Available by phone</p>
                    <Badge variant="outline" className="mt-1">
                      Verified Customer
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            <Card>
              <CardHeader className="p-3">
                <CardTitle>Referring Agent</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">John Davis</h4>
                    <p className="text-gray-600">Keller Williams</p>
                  </div>
                </div>
                <TrustScore score={4.8} totalReferrals={156} qualityRate={94} />
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask Agent a Question
                </Button>
              </CardContent>
            </Card>

            {/* Fast Checkout */}
            <Card>
              <CardHeader className="p-3">
                <CardTitle>Fast Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-3">
                {" "}
                {/* Reduced padding and space-y */}
                <div className="text-center py-1.5">
                  {" "}
                  {/* Reduced py */}
                  <div className="text-xl font-bold text-purple-600">$150.00</div> {/* Slightly smaller */}
                  <p className="text-sm text-gray-600">+ $4.50 processing fee</p>
                </div>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit Card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ach" id="ach" />
                    <Label htmlFor="ach" className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>ACH/Bank Transfer</span>
                    </Label>
                  </div>
                </RadioGroup>
                {paymentMethod === "credit-card" && (
                  <div className="space-y-3">
                    <Input placeholder="Card Number" className="py-1.5 px-2.5 text-sm" /> {/* Compact input */}
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="MM/YY" className="py-1.5 px-2.5 text-sm" />
                      <Input placeholder="CVV" className="py-1.5 px-2.5 text-sm" />
                    </div>
                    <Input placeholder="ZIP Code" className="py-1.5 px-2.5 text-sm" />
                  </div>
                )}
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Saved payment methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa-1234">Visa ending in 1234</SelectItem>
                    <SelectItem value="mastercard-5678">Mastercard ending in 5678</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                  onClick={handlePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay $154.50 & Get Contact"}
                </Button>
                <div className="text-center">
                  <p className="text-xs text-gray-500">🔒 Secure checkout • Money back guarantee</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
