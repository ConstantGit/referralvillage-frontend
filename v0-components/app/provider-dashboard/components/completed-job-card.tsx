"use client"

// app/provider-dashboard/components/completed-job-card.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle, DollarSign, CheckCircle } from "lucide-react"
import type { CompletedJob } from "../types"
import { format, parseISO } from "date-fns"

interface CompletedJobCardProps {
  job: CompletedJob
  onRequestReview: (jobId: string) => void
}

export function CompletedJobCard({ job, onRequestReview }: CompletedJobCardProps) {
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md font-semibold text-foreground">{job.serviceType}</CardTitle>
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Customer: {job.customerName} • Completed: {format(parseISO(job.completedDate), "MMM d, yyyy")}
        </p>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <div className="flex items-center text-muted-foreground">
          <DollarSign className="h-4 w-4 mr-2 text-primary" />
          Earned: <span className="font-medium text-foreground ml-1">${job.earnings.toFixed(2)}</span>
        </div>
        {job.reviewReceived && (
          <div className="flex items-center pt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < job.reviewReceived!.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">
              {job.reviewReceived.comment ? `"${job.reviewReceived.comment}"` : "Rated"}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!job.reviewReceived && (
          <Button variant="outline" size="sm" onClick={() => onRequestReview(job.id)} disabled={job.reviewRequested}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {job.reviewRequested ? "Review Requested" : "Request Review"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
