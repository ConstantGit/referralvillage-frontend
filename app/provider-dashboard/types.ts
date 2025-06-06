import type { Provider, ActiveJob, CompletedJob, ReferralOpportunity, ProviderStats } from "@/app/types/provider";

export interface ProviderHeaderProps {
  provider: Provider;
  isAvailable: boolean;
  onAvailabilityChange: (newAvailability: boolean) => Promise<void>;
}

export interface StatsCardGridProps {
  stats: ProviderStats;
}

export interface MyJobsTabProps {
  jobs: ActiveJob[];
  onUpdateStatus: (jobId: string, status: ActiveJob["status"]) => Promise<void>;
}

export interface NewOpportunitiesTabProps {
  opportunities: ReferralOpportunity[];
  onPurchaseReferral: (opportunityId: string) => Promise<void>;
}

export interface CompletedJobsTabProps {
  jobs: CompletedJob[];
  onRequestReview: (jobId: string) => Promise<void>;
}

export interface ProviderSidebarProps {
  quickStats: {
    acceptanceRate: number;
    avgCompletionTimeDays: number;
  };
  upcomingJobs: {
    id: string;
    title: string;
    start: string;
    end: string;
    type: "job";
    customerName: string;
    location: string;
    notes?: string;
  }[];
  recentReviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    customerName: string;
  }[];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
