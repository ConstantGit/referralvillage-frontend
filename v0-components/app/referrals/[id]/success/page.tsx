"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Confetti from "react-confetti"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Copy,
  MessageCircleIcon,
  Share2,
  ExternalLink,
  PlusCircle,
  ListChecks,
  MapPin,
  DollarSign,
  Briefcase,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWindowSize } from "react-use"
import { SuccessAnimation } from "@/components/success-animation" // Using the checkmark animation

// Mock data - replace with actual data fetching
interface ReferralDetails {
  id: string
  service: string
  location: string
  fee: number
  description: string
}

const fetchReferralDetails = async (id: string): Promise<ReferralDetails | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (id === "mock-referral-123") {
    // Example ID
    return {
      id,
      service: "Kitchen Sink Installation",
      location: "Austin, TX",
      fee: 75,
      description: "Looking for a plumber to install a new kitchen sink and faucet.",
    }
  }
  return null
}

export default function ReferralSuccessPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { width, height } = useWindowSize()

  const referralId = params.id as string
  const [referralLink, setReferralLink] = useState("")
  const [referralDetails, setReferralDetails] = useState<ReferralDetails | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReferralLink(`${window.location.origin}/referrals/${referralId}`)
    }
    if (referralId) {
      fetchReferralDetails(referralId).then((data) => {
        setReferralDetails(data)
        setLoadingDetails(false)
      })
    } else {
      setLoadingDetails(false)
    }
  }, [referralId])

  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 7000) // Confetti for 7 seconds
    return () => clearTimeout(timer)
  }, [])

  const handleShare = async (platform: "whatsapp" | "sms" | "copy") => {
    if (!referralLink) return
    const text = `Check out this referral for ${referralDetails?.service || "a service"} on ReferralVillage: ${referralLink}`
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
        break
      case "sms":
        window.open(`sms:?&body=${encodeURIComponent(text)}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(referralLink)
          toast({
            title: "Link Copied!",
            description: "Referral link copied to your clipboard.",
          })
        } catch (err) {
          toast({
            title: "Failed to Copy",
            description: "Could not copy link. Please try manually.",
            variant: "destructive",
          })
        }
        break
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-purple-50/20 dark:via-purple-900/20 to-background">
      {showConfetti && width > 0 && height > 0 && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={250} />
      )}
      <Card className="w-full max-w-lg text-center shadow-2xl overflow-hidden">
        <CardHeader className="bg-green-500/10 dark:bg-green-500/20 pt-8">
          <div className="mx-auto mb-5">
            <SuccessAnimation /> {/* Using the animated checkmark */}
          </div>
          <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-300">
            Referral Created Successfully!
          </CardTitle>
          <CardDescription className="text-muted-foreground pb-6">
            Your referral is now live. Share it to get it noticed!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {loadingDetails && <p className="text-muted-foreground">Loading referral details...</p>}
          {referralDetails && (
            <Card className="text-left bg-muted/30 dark:bg-muted/20 border-border/50">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Referral Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-muted-foreground">Service:</span>
                  <span className="ml-1 text-foreground">{referralDetails.service}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-muted-foreground">Location:</span>
                  <span className="ml-1 text-foreground">{referralDetails.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-muted-foreground">Referral Fee:</span>
                  <span className="ml-1 text-foreground">${referralDetails.fee}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <p className="font-semibold text-foreground">Share this referral:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => handleShare("whatsapp")}
                variant="outline"
                className="flex-1 group hover:bg-green-500/10 dark:hover:bg-green-400/10 border-green-500/50 text-green-600 dark:text-green-400 dark:border-green-500/40"
              >
                <MessageCircleIcon className="mr-2 h-4 w-4 group-hover:text-green-700 dark:group-hover:text-green-300" />{" "}
                WhatsApp
              </Button>
              <Button
                onClick={() => handleShare("sms")}
                variant="outline"
                className="flex-1 group hover:bg-blue-500/10 dark:hover:bg-blue-400/10 border-blue-500/50 text-blue-600 dark:text-blue-400 dark:border-blue-500/40"
              >
                <Share2 className="mr-2 h-4 w-4 group-hover:text-blue-700 dark:group-hover:text-blue-300" /> SMS
              </Button>
              <Button
                onClick={() => handleShare("copy")}
                variant="outline"
                className="flex-1 group hover:bg-purple-500/10 dark:hover:bg-purple-400/10 border-purple-500/50 text-purple-600 dark:text-purple-400 dark:border-purple-500/40"
              >
                <Copy className="mr-2 h-4 w-4 group-hover:text-purple-700 dark:group-hover:text-purple-300" /> Copy Link
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/referrals/create")}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create Another Referral
            </Button>
            <Button onClick={() => router.push("/dashboard")} variant="secondary" className="flex-1">
              {" "}
              {/* Changed to /dashboard */}
              <ListChecks className="mr-2 h-4 w-4" /> Go to Dashboard
            </Button>
          </div>
          {referralId && (
            <Link href={`/referrals/${referralId}`} passHref legacyBehavior>
              <a className="text-sm text-primary hover:underline inline-flex items-center group">
                View Created Referral{" "}
                <ExternalLink className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
