// Manages bank accounts, tax info, payment methods, billing history.
// Adapted from "Billing" TabsContent.
"use client"

import type React from "react"

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
} from "@/components/ui/dialog"
import { PlusCircle, Upload, CreditCardIcon, Landmark, FileText } from "lucide-react"

interface BankAccount {
  id: string
  name: string
  last4: string
  type: string
}
interface PaymentMethod {
  id: string
  brand: string
  last4: string
  expiry: string
}

export function PaymentSettings() {
  const { toast } = useToast()
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false)
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { id: "1", name: "Chase Bank", last4: "1234", type: "Checking" },
  ])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "card1", brand: "Visa", last4: "4242", expiry: "12/25" },
  ])
  const [taxInfo, setTaxInfo] = useState({ w9Status: "Not Submitted", vatId: "" })

  const handleAddBankAccount = () => {
    // Simulate Plaid link & adding account
    setBankAccounts([
      ...bankAccounts,
      {
        id: Date.now().toString(),
        name: "New Bank",
        last4: Math.floor(1000 + Math.random() * 9000).toString(),
        type: "Savings",
      },
    ])
    setIsAddBankModalOpen(false)
    toast({ title: "Bank Account Added (Mock)" })
  }

  const handleRemoveBankAccount = (id: string) => {
    setBankAccounts(bankAccounts.filter((acc) => acc.id !== id))
    toast({ title: "Bank Account Removed (Mock)" })
  }

  const handleAddPaymentMethod = () => {
    // Simulate Stripe form & adding card
    setPaymentMethods([
      ...paymentMethods,
      {
        id: Date.now().toString(),
        brand: "Mastercard",
        last4: Math.floor(1000 + Math.random() * 9000).toString(),
        expiry: "06/27",
      },
    ])
    setIsAddCardModalOpen(false)
    toast({ title: "Payment Method Added (Mock)" })
  }

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id))
    toast({ title: "Payment Method Removed (Mock)" })
  }

  const handleTaxInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxInfo({ ...taxInfo, [e.target.name]: e.target.value })
  }

  const handleUploadW9 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Simulate upload
      setTaxInfo({ ...taxInfo, w9Status: "Submitted (Pending Verification)" })
      toast({ title: "W9 Form Uploaded (Mock)" })
    }
  }

  const handleSaveChanges = () => {
    console.log("Saving payment settings:", { taxInfo })
    toast({ title: "Payment Settings Saved" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Payments & Billing</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Manage your payout accounts, payment methods, and tax information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Payout Accounts */}
        <section>
          <h3 className="text-lg font-medium mb-2">Payout Accounts</h3>
          <div className="space-y-3">
            {bankAccounts.map((acc) => (
              <div key={acc.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Landmark className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {acc.name} - {acc.type}
                    </p>
                    <p className="text-sm text-muted-foreground">Ending in •••• {acc.last4}</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleRemoveBankAccount(acc.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-3" onClick={() => setIsAddBankModalOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Bank Account (for Payouts)
          </Button>
        </section>

        {/* Payment Methods */}
        <section className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-2">Payment Methods (for platform fees)</h3>
          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div key={pm.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                <div className="flex items-center space-x-3">
                  <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {pm.brand} ending in {pm.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">Expires {pm.expiry}</p>
                  </div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleRemovePaymentMethod(pm.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-3" onClick={() => setIsAddCardModalOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </section>

        {/* Tax Information */}
        <section className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-2">Tax Information</h3>
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <Label className="font-medium">W-9 Form (for US persons/entities)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Status: <span className="font-semibold">{taxInfo.w9Status}</span>
              </p>
              <Input type="file" id="w9Upload" className="hidden" onChange={handleUploadW9} accept=".pdf,.jpg,.png" />
              <Button variant="outline" size="sm" onClick={() => document.getElementById("w9Upload")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                {taxInfo.w9Status === "Not Submitted" ? "Upload W-9" : "Replace W-9"}
              </Button>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="vatId">VAT ID (for non-US entities, if applicable)</Label>
              <Input
                id="vatId"
                name="vatId"
                value={taxInfo.vatId}
                onChange={handleTaxInfoChange}
                placeholder="Enter your VAT ID"
              />
            </div>
          </div>
        </section>

        {/* Billing History */}
        <section className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-2">Billing History</h3>
          <div className="p-3 border rounded-md bg-muted/50 text-center">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No billing history yet.</p>
            {/* <Button variant="link" className="mt-1">View Past Invoices</Button> */}
          </div>
        </section>

        <Button onClick={handleSaveChanges} className="mt-4">
          Save Payment Settings
        </Button>

        {/* Add Bank Account Modal */}
        <Dialog open={isAddBankModalOpen} onOpenChange={setIsAddBankModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogDescription>Securely link your bank account using Plaid. (This is a mock-up)</DialogDescription>
            </DialogHeader>
            <div className="py-6 text-center">
              <p className="text-muted-foreground mb-4">Plaid integration component would go here.</p>
              <Button onClick={handleAddBankAccount}>Connect with Plaid (Mock)</Button>
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Card Modal */}
        <Dialog open={isAddCardModalOpen} onOpenChange={setIsAddCardModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>Securely add your card details. (This is a mock-up)</DialogDescription>
            </DialogHeader>
            <div className="py-6 text-center">
              <p className="text-muted-foreground mb-4">Stripe Elements form would go here.</p>
              <Button onClick={handleAddPaymentMethod}>Add Card (Mock)</Button>
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
