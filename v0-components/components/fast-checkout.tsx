"use client"

import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle as ShadDialogTitle, // Renamed to avoid conflict
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle as ShadDrawerTitle, // Renamed to avoid conflict
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Building2, ShieldCheck, XCircle, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SuccessAnimation } from "./success-animation"

type FastCheckoutProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  referral: {
    id: string
    service: string
    fee: number
  }
}

const PROCESSING_FEE = 4.5

export function FastCheckout({ isOpen, onOpenChange, referral }: FastCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [rememberCard, setRememberCard] = useState(false)
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success" | "error">("idle")
  const { toast } = useToast()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [formErrors, setFormErrors] = useState<{
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    zipCode?: string
  }>({})
  const [selectedSavedCard, setSelectedSavedCard] = useState<string | null>(null)

  const totalAmount = referral.fee + PROCESSING_FEE

  const validateCardDetails = () => {
    const errors: typeof formErrors = {}
    const cardNumber = (document.getElementById("cardNumber") as HTMLInputElement)?.value
    const expiryDate = (document.getElementById("expiryDate") as HTMLInputElement)?.value
    const cvv = (document.getElementById("cvv") as HTMLInputElement)?.value
    const zipCode = (document.getElementById("zipCode") as HTMLInputElement)?.value

    if (!cardNumber || !/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Enter a valid card number."
    }
    if (!expiryDate || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
      errors.expiryDate = "Enter a valid expiry date (MM/YY)."
    } else {
      const [month, year] = expiryDate.split("/").map(Number)
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errors.expiryDate = "Card is expired."
      }
    }
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      errors.cvv = "Enter a valid CVV."
    }
    if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
      errors.zipCode = "Enter a valid ZIP code."
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmitPayment = async () => {
    if (paymentMethod === "credit-card" && !selectedSavedCard) {
      if (!validateCardDetails()) {
        return
      }
    }
    setPaymentState("processing")
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const success = Math.random() > 0.2
    if (success) {
      setPaymentState("success")
      toast({
        title: "Payment Successful!",
        description: `You've successfully purchased the ${referral.service} referral.`,
        variant: "default",
      })
    } else {
      setPaymentState("error")
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setPaymentState("idle")
    onOpenChange(false)
  }

  const Content = () => (
    <>
      {paymentState === "success" ? (
        <div className="p-6 text-center">
          <SuccessAnimation />
          <h3 className="text-heading-lg mb-2">Payment Successful!</h3>
          <p className="text-body-md text-muted mb-4">
            You can now access the contact details for the "{referral.service}" referral.
          </p>
          <div className="bg-gray-100 p-4 rounded-md text-left mb-6 text-body-md">
            <h4 className="font-medium">Customer Contact:</h4>
            <p>Sarah Mitchell</p>
            <p>(555) 123-4567</p>
            <p>sarah.mitchell@email.com</p>
          </div>
          <Button onClick={resetForm} className="w-full bg-purple-600 hover:bg-purple-700">
            Close
          </Button>
        </div>
      ) : paymentState === "error" ? (
        <div className="p-6 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-heading-lg mb-2">Payment Failed</h3>
          <p className="text-body-md text-muted mb-6">
            Unfortunately, we couldn't process your payment. Please check your details or try a different method.
          </p>
          <Button onClick={() => setPaymentState("idle")} className="w-full bg-purple-600 hover:bg-purple-700">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {isDesktop ? (
            <DialogHeader>
              <ShadDialogTitle className="text-heading-lg">Fast Checkout</ShadDialogTitle>
              <DialogDescription className="text-body-md text-muted">
                Securely purchase this referral.
              </DialogDescription>
            </DialogHeader>
          ) : (
            <DrawerHeader>
              <ShadDrawerTitle className="text-heading-lg">Fast Checkout</ShadDrawerTitle>
              <DrawerDescription className="text-body-md text-muted">
                Securely purchase this referral.
              </DrawerDescription>
            </DrawerHeader>
          )}
          <div className="p-4 md:p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-md">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-body-md">
                <div className="flex justify-between">
                  <span className="text-muted">{referral.service}</span>
                  <span>${referral.fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Processing Fee</span>
                  <span>${PROCESSING_FEE.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-body-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => {
                setPaymentMethod(value)
                setFormErrors({})
              }}
              className="space-y-2"
            >
              <Label
                htmlFor="credit-card"
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-purple-50 has-[:checked]:border-purple-500 text-body-md"
              >
                <RadioGroupItem value="credit-card" id="credit-card" />
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Credit Card</span>
              </Label>
              <Label
                htmlFor="ach"
                className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-purple-50 has-[:checked]:border-purple-500 text-body-md"
              >
                <RadioGroupItem value="ach" id="ach" />
                <Building2 className="h-5 w-5 text-gray-600" />
                <span className="font-medium">ACH/Bank Transfer</span>
              </Label>
            </RadioGroup>

            {paymentMethod === "credit-card" && (
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="space-y-3 pt-4">
                  <Label className="text-body-md font-medium">Saved Cards</Label>
                  {["Visa ending in 1234", "Mastercard ending in 5678"].map((card, index) => (
                    <Button
                      key={index}
                      variant={selectedSavedCard === card ? "default" : "outline"}
                      className={`w-full justify-start text-body-md ${selectedSavedCard === card ? "bg-purple-100 text-purple-700 border-purple-500" : ""}`}
                      onClick={() => {
                        setSelectedSavedCard(card)
                        setFormErrors({})
                        console.log(`Selected saved card: ${card}`)
                      }}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {card}
                      {selectedSavedCard === card && <CheckCircle className="h-4 w-4 ml-auto text-purple-700" />}
                    </Button>
                  ))}
                  {selectedSavedCard && (
                    <p className="text-body-sm text-muted">
                      Using saved card: {selectedSavedCard}. Click "Pay" to complete purchase.
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cardNumber" className="text-body-md">
                    Card Number
                  </Label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                  {formErrors.cardNumber && <p className="text-body-sm text-red-500 pt-1">{formErrors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="expiryDate" className="text-body-md">
                      Expiry Date
                    </Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                    {formErrors.expiryDate && <p className="text-body-sm text-red-500 pt-1">{formErrors.expiryDate}</p>}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cvv" className="text-body-md">
                      CVV
                    </Label>
                    <Input id="cvv" placeholder="•••" />
                    {formErrors.cvv && <p className="text-body-sm text-red-500 pt-1">{formErrors.cvv}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="zipCode" className="text-body-md">
                    ZIP Code
                  </Label>
                  <Input id="zipCode" placeholder="12345" />
                  {formErrors.zipCode && <p className="text-body-sm text-red-500 pt-1">{formErrors.zipCode}</p>}
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="rememberCard"
                    checked={rememberCard}
                    onCheckedChange={(checked) => setRememberCard(Boolean(checked))}
                  />
                  <Label htmlFor="rememberCard" className="text-body-md font-normal">
                    Remember this card for future purchases
                  </Label>
                </div>
              </div>
            )}
            {paymentMethod === "ach" && (
              <div className="p-4 border rounded-lg text-center">
                <p className="text-body-md text-muted">
                  ACH/Bank Transfer details would be shown here, possibly using a service like Plaid.
                </p>
              </div>
            )}

            <div className="flex items-center justify-center space-x-2 text-body-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Secure SSL Encrypted Checkout</span>
            </div>
          </div>
          {isDesktop ? (
            <DialogFooter className="px-6 pb-6">
              <Button
                onClick={handleSubmitPayment}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={paymentState === "processing"}
              >
                {paymentState === "processing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Pay ${totalAmount.toFixed(2)} & Get Contact
              </Button>
            </DialogFooter>
          ) : (
            <DrawerFooter className="pt-2">
              <Button
                onClick={handleSubmitPayment}
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={paymentState === "processing"}
              >
                {paymentState === "processing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Pay ${totalAmount.toFixed(2)} & Get Contact
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </>
      )}
    </>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <Content />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <Content />
      </DrawerContent>
    </Drawer>
  )
}
