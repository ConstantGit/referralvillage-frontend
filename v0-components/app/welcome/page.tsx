"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  PlayCircle,
  UserCircle2,
  Search,
  PartyPopper,
  ArrowRightCircle,
  Sparkles,
  ShieldCheck,
  CreditCard,
  PlusSquare,
} from "lucide-react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge" // Assuming you have a Badge component

// Mock user data - replace with actual session/user data
interface User {
  name: string
  role: "agent" | "provider" // Example roles
  initialTrustScore: number
}

const fetchUserData = async (): Promise<User> => {
  // Simulate fetching user data
  await new Promise((resolve) => setTimeout(resolve, 300))
  return {
    name: "Alex", // Replace with actual user name
    role: "agent", // Replace with actual user role
    initialTrustScore: 2.5,
  }
}

export default function WelcomePage() {
  const router = useRouter()
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 7000)
    fetchUserData().then(setUser)
    return () => clearTimeout(timer)
  }, [])

  const checklistItems = [
    {
      id: 1,
      text: "Complete your profile",
      score: "+0.5 trust score",
      icon: UserCircle2,
      link: "/settings?tab=profile",
    },
    { id: 2, text: "Connect a payment method", icon: CreditCard, link: "/settings?tab=payment" },
    user?.role === "agent"
      ? { id: 3, text: "Create your first referral", icon: PlusSquare, link: "/referrals/create" }
      : { id: 3, text: "Browse opportunities", icon: Search, link: "/marketplace" },
    { id: 4, text: "Watch our quick start guide", icon: PlayCircle, link: "#video-tutorial" },
  ]

  if (!user) {
    return (
      // Basic loading state
      <div className="min-h-screen flex items-center justify-center">
        <PartyPopper className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-purple-50/20 dark:via-purple-900/20 to-background">
      {showConfetti && width > 0 && height > 0 && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl overflow-hidden">
          <CardHeader className="text-center bg-purple-500/10 dark:bg-purple-500/20 pt-8">
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 12 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800 mb-5 border-4 border-purple-200 dark:border-purple-700 shadow-lg"
            >
              <PartyPopper className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-purple-700 dark:text-purple-300">
              Welcome to ReferralVillage, {user.name}!
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2 pb-2">
              We're excited to have you. Let's get you started!
            </CardDescription>
            <div className="flex justify-center pb-4">
              <Badge
                variant="secondary"
                className="text-base px-3 py-1 bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 border-green-300 dark:border-green-600"
              >
                <ShieldCheck className="h-4 w-4 mr-1.5" />
                Your Trust Score: {user.initialTrustScore.toFixed(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                Your Quick Start Checklist:
              </h3>
              <ul className="space-y-3">
                {checklistItems.map(
                  (item, index) =>
                    item && (
                      <motion.li // Added item check for conditional rendering
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center p-3 bg-muted/30 dark:bg-muted/20 hover:bg-muted/50 dark:hover:bg-muted/40 rounded-md transition-colors group"
                      >
                        <item.icon className="h-6 w-6 text-primary mr-4 shrink-0" />
                        <div className="flex-grow">
                          <Link href={item.link} passHref legacyBehavior>
                            <a className="text-foreground hover:text-primary font-medium">{item.text}</a>
                          </Link>
                          {item.score && (
                            <span className="ml-2 text-xs text-green-600 dark:text-green-400 font-medium">
                              {item.score}
                            </span>
                          )}
                        </div>
                        <ArrowRightCircle className="h-5 w-5 text-muted-foreground/70 ml-3 shrink-0 group-hover:text-primary transition-colors" />
                      </motion.li>
                    ),
                )}
              </ul>
            </div>

            <div id="video-tutorial" className="space-y-3 pt-4">
              <h3 className="text-xl font-semibold text-foreground">Watch Our 2-Minute Intro:</h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="aspect-video bg-muted dark:bg-muted/50 rounded-lg flex items-center justify-center border border-border/50 shadow-inner hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => alert("Video player (e.g., YouTube embed) would open here!")}
              >
                <PlayCircle className="h-16 w-16 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                <p className="sr-only">Video tutorial placeholder</p>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {user.role === "agent" ? (
                <Button
                  onClick={() => router.push("/referrals/create")}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow"
                >
                  <PlusSquare className="mr-2 h-5 w-5" /> Create First Referral
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/marketplace")}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-shadow"
                >
                  <Search className="mr-2 h-5 w-5" /> Browse Opportunities
                </Button>
              )}
              <Button
                onClick={() => router.push("/settings?tab=profile")}
                size="lg"
                variant="outline"
                className="flex-1 text-primary border-primary/50 hover:bg-primary/10 shadow-md hover:shadow-lg transition-shadow"
              >
                <UserCircle2 className="mr-2 h-5 w-5" /> Complete Your Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
