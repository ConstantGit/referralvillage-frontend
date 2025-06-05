// app/provider-dashboard/components/completed-jobs-tab.tsx
import type { CompletedJob } from "../types"
import { CompletedJobCard } from "./completed-job-card"
import { BadgeCheckIcon as CheckBadge } from "lucide-react" // Or CheckCircle, History

interface CompletedJobsTabProps {
  completedJobs: CompletedJob[]
  onRequestReview: (jobId: string) => void
}

export function CompletedJobsTab({ completedJobs, onRequestReview }: CompletedJobsTabProps) {
  if (completedJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckBadge className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-2 text-lg font-medium text-muted-foreground">No Completed Jobs Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground/80">
          Your completed jobs and their earnings will appear here.
        </p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {completedJobs.map((job) => (
        <CompletedJobCard key={job.id} job={job} onRequestReview={onRequestReview} />
      ))}
    </div>
  )
}
