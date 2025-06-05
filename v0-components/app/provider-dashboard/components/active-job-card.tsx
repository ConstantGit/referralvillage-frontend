// app/provider-dashboard/components/active-job-card.tsx
"use client"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, MessageSquare, Phone, MapPin, Clock } from "lucide-react"
import type { ActiveJob } from "../types"
import { format, parseISO } from "date-fns"

interface ActiveJobCardProps {
  job: ActiveJob
  onMarkComplete: (jobId: string, notes?: string) => void
  onAddNotes: (jobId: string, notes: string) => void // Assuming notes are saved separately
}

const statusColors: Record<ActiveJob["status"], string> = {
  accepted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  scheduled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  in_progress: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  pending_completion: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  payment_pending: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
}

export function ActiveJobCard({ job, onMarkComplete, onAddNotes }: ActiveJobCardProps) {
  const [showNotes, setShowNotes] = useState(false)
  const [currentNotes, setCurrentNotes] = useState(job.notes || "")

  const handleSaveNotes = () => {
    onAddNotes(job.id, currentNotes)
    setShowNotes(false)
  }

  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">{job.serviceType}</CardTitle>
          <Badge className={`${statusColors[job.status]} px-2 py-0.5 text-xs`}>{job.status.replace("_", " ")}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">For: {job.customerName}</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {job.customerAddress && (
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" /> {job.customerAddress}
          </div>
        )}
        {job.customerPhone && (
          <div className="flex items-center text-muted-foreground">
            <Phone className="h-4 w-4 mr-2 text-primary" /> {job.customerPhone}
          </div>
        )}
        {job.scheduledDateTime && (
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            Scheduled: {format(parseISO(job.scheduledDateTime), "MMM d, yyyy 'at' h:mm a")}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Referral Fee Paid: <span className="font-medium text-foreground">${job.feePaid}</span>
        </p>

        {showNotes && (
          <div className="space-y-2 pt-2">
            <Textarea
              placeholder="Add notes about this job..."
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              className="min-h-[60px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowNotes(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveNotes}>
                Save Notes
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setShowNotes(!showNotes)}>
          <MessageSquare className="h-4 w-4 mr-2" /> {showNotes ? "Hide Notes" : job.notes ? "Edit Notes" : "Add Notes"}
        </Button>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => onMarkComplete(job.id, currentNotes)}
        >
          <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Complete
        </Button>
      </CardFooter>
    </Card>
  )
}
