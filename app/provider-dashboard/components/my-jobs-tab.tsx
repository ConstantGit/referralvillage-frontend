"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatCurrency } from "@/app/lib/utils";
import type { MyJobsTabProps } from "../types";

const statusColors = {
  scheduled: "bg-blue-500",
  in_progress: "bg-yellow-500",
  on_hold: "bg-orange-500",
  completed: "bg-green-500",
};

export function MyJobsTab({ jobs, onUpdateStatus }: MyJobsTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card key={job.id} className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.customerName}</p>
            </div>
            <Badge variant="secondary" className={statusColors[job.status]}>
              {job.status.replace("_", " ")}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <p>{job.description}</p>
            <p>
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p>
              <span className="font-medium">Scheduled:</span>{" "}
              {formatDateTime(job.scheduledDateTime)}
            </p>
            <p>
              <span className="font-medium">Fee:</span>{" "}
              {formatCurrency(job.feePaid)}
            </p>
          </div>

          <div className="space-x-2">
            {job.status === "scheduled" && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onUpdateStatus(job.id, "in_progress")}
                >
                  Start Job
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(job.id, "on_hold")}
                >
                  Put on Hold
                </Button>
              </>
            )}
            {job.status === "in_progress" && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onUpdateStatus(job.id, "completed")}
              >
                Complete Job
              </Button>
            )}
            {job.status === "on_hold" && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onUpdateStatus(job.id, "in_progress")}
              >
                Resume Job
              </Button>
            )}
          </div>

          {job.notes && job.notes.length > 0 && (
            <div className="text-sm">
              <p className="font-medium">Notes:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                {job.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
