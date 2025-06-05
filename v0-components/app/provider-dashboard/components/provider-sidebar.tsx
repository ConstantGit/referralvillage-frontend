// app/provider-dashboard/components/provider-sidebar.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Star } from "lucide-react"
import type { ProviderReview, CalendarEvent, QuickStats } from "../types"
import { format, parseISO } from "date-fns"

interface ProviderSidebarProps {
  quickStats: QuickStats
  upcomingJobs: CalendarEvent[]
  recentReviews: ProviderReview[]
}

export function ProviderSidebar({ quickStats, upcomingJobs, recentReviews }: ProviderSidebarProps) {
  return (
    <div className="space-y-6 lg:col-span-1 hidden lg:block">
      {" "}
      {/* Hidden on mobile, shown on lg+ */}
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-semibold">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Acceptance Rate</span>
              <span className="font-medium text-foreground">{quickStats.acceptanceRate}%</span>
            </div>
            <Progress value={quickStats.acceptanceRate} className="h-2" indicatorClassName="bg-primary" />
          </div>
          <div>
            <p className="text-muted-foreground">Avg. Completion Time</p>
            <p className="font-medium text-foreground">{quickStats.avgCompletionTimeDays} days</p>
          </div>
        </CardContent>
      </Card>
      {/* Upcoming Jobs Calendar View (Simplified List) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-semibold flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            Upcoming Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {upcomingJobs.length > 0 ? (
            upcomingJobs.slice(0, 3).map(
              (
                job, // Show first 3
              ) => (
                <div key={job.id} className="p-2 rounded-md border border-border hover:bg-muted/50">
                  <p className="font-medium text-foreground">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{format(parseISO(job.start), "MMM d, h:mm a")}</p>
                </div>
              ),
            )
          ) : (
            <p className="text-xs text-muted-foreground text-center py-2">No upcoming jobs scheduled.</p>
          )}
        </CardContent>
      </Card>
      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-semibold flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
            Recent Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {recentReviews.length > 0 ? (
            recentReviews.slice(0, 2).map(
              (
                review, // Show first 2
              ) => (
                <div key={review.id} className="p-2 rounded-md border border-border">
                  <div className="flex items-center mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-medium text-foreground">{review.customerName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic line-clamp-2">
                    &quot;{review.comment}&quot; - <span className="text-foreground/80">{review.jobType}</span>
                  </p>
                </div>
              ),
            )
          ) : (
            <p className="text-xs text-muted-foreground text-center py-2">No reviews yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
