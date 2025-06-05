"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SuccessAnimation } from "@/components/success-animation"
import { Briefcase, UserCheck, Mail, Phone, Download } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

// Mock data - replace with actual data fetching
interface PaymentDetails {
  paymentAmount: number
  referralService: string
  providerName: string
  providerEmail: string
  providerPhone?: string
}

const fetchPaymentDetails = async (transactionId: string | null): Promise<PaymentDetails | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (transactionId === "mock-tx-456") {
    // Example transaction ID
    return {
      paymentAmount: 75.0,
      referralService: "Kitchen Sink Installation",
      providerName: "Plumb Perfect Inc.",
      providerEmail: "contact@plumbperfect.com",
      providerPhone: "555-123-4567",
    }
  }
  return null
}

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("transactionId") // Assuming transactionId is passed in query

  const [details, setDetails] = useState<PaymentDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    fetchPaymentDetails(transactionId).then((data) => {
      setDetails(data)
      setLoading(false)
    })
  }, [transactionId])

  useEffect(() => {
    if (!loading && details) {
      // Start countdown only after details are loaded
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer)
            router.push("/dashboard/my-jobs") // Redirect to My Jobs or general dashboard
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [loading, details, router])

  const handleDownloadReceipt = () => {
    // Placeholder for receipt download logic
    alert("Receipt download functionality to be implemented.")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-blue-50/20 dark:via-blue-900/20 to-background">
      <Card className="w-full max-w-md text-center shadow-2xl overflow-hidden">
        <CardHeader className="bg-blue-500/10 dark:bg-blue-500/20 pt-8">
          <div className="mx-auto mb-5">
            <SuccessAnimation />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-300">Payment Successful!</CardTitle>
          {loading && <CardDescription className="text-muted-foreground pb-6">Loading details...</CardDescription>}
          {!loading && details && (
            <CardDescription className="text-muted-foreground pb-6">
              You paid <strong>${details.paymentAmount.toFixed(2)}</strong> for{" "}
              <strong>{details.referralService}</strong>.
            </CardDescription>
          )}
          {!loading && !details && (
            <CardDescription className="text-muted-foreground pb-6">
              Your transaction has been completed securely.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {details && (
            <>
              <div className="p-4 bg-muted/30 dark:bg-muted/10 rounded-lg border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <UserCheck className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-lg font-semibold text-foreground">Provider Contact</h3>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setShowContact(!showContact)}
                    className="text-primary"
                  >
                    {showContact ? "Hide" : "Reveal"}
                  </Button>
                </div>
                <AnimatePresence>
                  {showContact && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-left text-sm space-y-1"
                    >
                      <p>
                        <strong>Name:</strong> {details.providerName}
                      </p>
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" /> {details.providerEmail}
                      </p>
                      {details.providerPhone && (
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" /> {details.providerPhone}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Separator />
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/dashboard/my-jobs")} // Assuming a path like /dashboard/my-jobs
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Briefcase className="mr-2 h-4 w-4" /> Go to My Jobs
            </Button>
            <Button onClick={handleDownloadReceipt} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
          </div>
          {!loading && details && (
            <p className="text-xs text-muted-foreground">Redirecting to My Jobs in {countdown} seconds...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
