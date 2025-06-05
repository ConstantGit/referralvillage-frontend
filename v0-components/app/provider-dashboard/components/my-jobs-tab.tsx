// app/provider-dashboard/components/my-jobs-tab.tsx
import type { ActiveJob } from "../types"
import { ActiveJobCard } from "./active-job-card"
import { Briefcase } from "lucide-react"

interface MyJobsTabProps {
  activeJobs: ActiveJob[]
  onMarkComplete: (jobId: string, notes?: string) => void
  onAddNotes: (jobId: string, notes: string) => void
}

export function MyJobsTab({ activeJobs, onMarkComplete, onAddNotes }: MyJobsTabProps) {
  if (activeJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-2 text-lg font-medium text-muted-foreground">No Active Jobs</h3>
        <p className="mt-1 text-sm text-muted-foreground/80">
          When you accept referrals, your active jobs will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activeJobs.map((job) => (
        <ActiveJobCard key={job.id} job={job} onMarkComplete={onMarkComplete} onAddNotes={onAddNotes} />
      ))}
    </div>
  )
}
