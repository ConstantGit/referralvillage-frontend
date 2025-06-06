"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency } from "@/app/lib/utils";
import type { CompletedJobsTabProps } from "../types";

export function CompletedJobsTab({ jobs, onRequestReview }: CompletedJobsTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id} className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">
                {job.customerName}
              </p>
            </div>
            <Badge variant="secondary">
              {job.paymentStatus}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <p>{job.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <span className="font-medium">Fee:</span>{" "}
                  {formatCurrency(job.feePaid)}
                </p>
                <p>
                  <span className="font-medium">Total:</span>{" "}
                  {formatCurrency(job.totalAmount)}
                </p>
              </div>
              <div className="text-right">
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {job.duration}h
                </p>
                <p className="text-muted-foreground">
                  Completed {formatDateTime(job.completedAt)}
                </p>
              </div>
            </div>
          </div>

          {job.hasReview ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Rating: {job.review?.rating} / 5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {job.review?.comment}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {job.reviewRequested ? (
                <p className="text-sm text-muted-foreground">
                  Review requested on {formatDateTime(job.reviewRequestedAt!)}
                </p>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onRequestReview(job.id)}
                >
                  Request Review
                </Button>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
