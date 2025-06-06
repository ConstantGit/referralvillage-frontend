"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDateTime } from "@/app/lib/utils";
import type { ProviderSidebarProps } from "../types";

export function ProviderSidebar({
  quickStats,
  upcomingJobs,
  recentReviews,
}: ProviderSidebarProps) {
  return (
    <div className="w-80 border-r bg-muted/10 p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Acceptance Rate</span>
            <span className="font-medium">{quickStats.acceptanceRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Avg. Completion</span>
            <span className="font-medium">{quickStats.avgCompletionTimeDays} days</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Jobs</h2>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {upcomingJobs.map((job) => (
              <Card key={job.id} className="p-3">
                <h3 className="font-medium text-sm">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.customerName}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>{formatDateTime(job.start)}</p>
                  <p>{job.location}</p>
                  {job.notes && <p className="mt-1">{job.notes}</p>}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <Card key={review.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{review.customerName}</span>
                  <span className="text-sm">{review.rating} / 5</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDateTime(review.createdAt)}
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
