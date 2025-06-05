// app/provider-dashboard/components/referral-opportunity-card.tsx
"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrustScore } from "@/components/trust-score"
import { MapPin, Clock, DollarSign, AlertTriangle, CalendarDays } from "lucide-react"
import type { ReferralOpportunity } from "../types"
import { formatDistanceToNowStrict, parseISO, differenceInSeconds } from "date-fns"

interface ReferralOpportunityCardProps {
  opportunity: ReferralOpportunity
  onQuickBuy: (opportunityId: string) => void
}

function formatTimeLeft(expiresAtISO: string): string {
  const expiresDate = parseISO(expiresAtISO)
  const now = new Date()
  const diffSeconds = differenceInSeconds(expiresDate, now)

  if (diffSeconds <= 0) {
    return "Expired"
  }

  const days = Math.floor(diffSeconds / (3600 * 24))
  const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((diffSeconds % 3600) / 60)

  if (days > 0) return `${days}d ${hours}h left`
  if (hours > 0) return `${hours}h ${minutes}m left`
  return `${minutes}m left`
}

export function ReferralOpportunityCard({ opportunity, onQuickBuy }: ReferralOpportunityCardProps) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(opportunity.expiresAt))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(opportunity.expiresAt))
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [opportunity.expiresAt])

  const postedAgo = formatDistanceToNowStrict(parseISO(opportunity.postedAt), { addSuffix: true })

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">{opportunity.serviceType}</CardTitle>
          {opportunity.isHotLead && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Hot Lead
            </Badge>
          )}
        </div>
        <div className="flex items-center text-xs text-muted-foreground space-x-2 pt-1">
          <MapPin className="h-3.5 w-3.5" /> <span>{opportunity.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {opportunity.description && <p className="text-muted-foreground line-clamp-2">{opportunity.description}</p>}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> Posted: {postedAgo}
          </span>
          {timeLeft !== "Expired" && (
            <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
              <Clock className="h-3.5 w-3.5" /> {timeLeft}
            </span>
          )}
          {timeLeft === "Expired" && (
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
              <Clock className="h-3.5 w-3.5" /> {timeLeft}
            </span>
          )}
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground mb-1">Referring Agent:</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                {opportunity.agent.name}{" "}
                {opportunity.agent.agency && (
                  <span className="text-xs text-muted-foreground">({opportunity.agent.agency})</span>
                )}
              </p>
              <TrustScore
                score={opportunity.agent.trustScore}
                totalReferrals={opportunity.agent.totalReferralsForTrustScore}
                qualityRate={opportunity.agent.qualityRateForTrustScore}
                size="sm"
              />
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">${opportunity.fee}</p>
              <p className="text-xs text-muted-foreground">Referral Fee</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => onQuickBuy(opportunity.id)}
          disabled={timeLeft === "Expired"}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Quick Buy (${opportunity.fee})
        </Button>
      </CardFooter>
    </Card>
  )
}
