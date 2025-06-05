// New component to manage OAuth connections.
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Link, Unlink, ExternalLink } from "lucide-react" // Using Link and Unlink for connect/disconnect
import { FcGoogle } from "react-icons/fc" // Assuming react-icons is available for branded icons
// import { FaZillow, FaStripe, FaLinkedin, FaInstagram } from "react-icons/fa"; // Example for other icons

// Placeholder for other branded icons if react-icons/fa is not used
const ZillowIcon = () => (
  <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded-sm text-xs">Z</div>
)
const StripeIcon = () => (
  <div className="w-5 h-5 bg-indigo-600 text-white flex items-center justify-center rounded-sm text-xs">S</div>
)
const LinkedinIcon = () => (
  <div className="w-5 h-5 bg-sky-600 text-white flex items-center justify-center rounded-sm text-xs">in</div>
)
const InstagramIcon = () => (
  <div className="w-5 h-5 bg-pink-500 text-white flex items-center justify-center rounded-sm text-xs">IG</div>
)

interface ConnectedAccount {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  isConnected: boolean
  connectedSince?: string // e.g., "Connected on Jan 15, 2023"
  manageUrl?: string // Link to manage settings on the provider's site
}

const initialConnectedAccounts: ConnectedAccount[] = [
  {
    id: "google",
    name: "Google",
    description: "Connect your Google account for faster sign-in and profile import.",
    icon: <FcGoogle className="h-5 w-5" />,
    isConnected: true,
    connectedSince: "Jan 15, 2023",
    manageUrl: "https://myaccount.google.com/permissions",
  },
  {
    id: "zillow",
    name: "Zillow",
    description: "Import your agent profile and reviews from Zillow.",
    icon: <ZillowIcon />,
    isConnected: false,
  },
  {
    id: "stripe",
    name: "Stripe Connect",
    description: "Verify payment processing for faster payouts and increased trust.",
    icon: <StripeIcon />,
    isConnected: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Import your professional details and network.",
    icon: <LinkedinIcon />,
    isConnected: true,
    connectedSince: "Feb 01, 2023",
  },
  {
    id: "instagram",
    name: "Instagram Business",
    description: "Showcase your work by importing photos from Instagram.",
    icon: <InstagramIcon />,
    isConnected: false,
  },
]

export function ConnectedAccountsSettings() {
  const { toast } = useToast()
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(initialConnectedAccounts)

  const handleToggleConnection = (accountId: string) => {
    // Simulate OAuth flow and backend update
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.id === accountId) {
          const wasConnected = acc.isConnected
          const newConnectedState = !wasConnected
          toast({
            title: `${acc.name} ${newConnectedState ? "Connected" : "Disconnected"}`,
            description: `Successfully ${newConnectedState ? "linked" : "unlinked"} your ${acc.name} account. (Mock)`,
          })
          return {
            ...acc,
            isConnected: newConnectedState,
            connectedSince: newConnectedState
              ? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : undefined,
          }
        }
        return acc
      }),
    )
    // In a real app, this would initiate OAuth flow or call backend to disconnect
    console.log(
      `${accounts.find((a) => a.id === accountId)?.isConnected ? "Disconnecting" : "Connecting"} ${accountId}`,
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-lg">Connected Accounts</CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Manage third-party accounts linked to ReferralVillage for enhanced functionality.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md"
          >
            <div className="flex items-start space-x-3 mb-3 sm:mb-0">
              <span className="mt-1">{account.icon}</span>
              <div>
                <h4 className="font-medium">{account.name}</h4>
                <p className="text-sm text-muted-foreground">{account.description}</p>
                {account.isConnected && account.connectedSince && (
                  <p className="text-xs text-green-600 dark:text-green-400">Connected on {account.connectedSince}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-center">
              {account.isConnected && account.manageUrl && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={account.manageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Manage ${account.name} settings on their site`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button
                variant={account.isConnected ? "outline" : "default"}
                size="sm"
                onClick={() => handleToggleConnection(account.id)}
              >
                {account.isConnected ? <Unlink className="h-4 w-4 mr-2" /> : <Link className="h-4 w-4 mr-2" />}
                {account.isConnected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
