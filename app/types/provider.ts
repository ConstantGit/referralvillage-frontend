export interface Provider {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  avatar?: string;
  serviceTypes: string[];
  isAvailable: boolean;
  rating: number;
  totalReviews: number;
  joinedAt: string;
}

export interface ProviderStats {
  totalEarnings: number;
  earningsThisMonth: number;
  activeJobs: number;
  jobsCompletedThisMonth: number;
  availableReferrals: number;
  newReferralsToday: number;
  acceptanceRate: number;
  avgResponseTimeHours: number;
  avgCompletionTimeDays: number;
}

export interface ActiveJob {
  id: string;
  title: string;
  description: string;
  customerName: string;
  location: string;
  scheduledDateTime: string;
  feePaid: number;
  status: "scheduled" | "in_progress" | "on_hold" | "completed";
  notes?: string[];
}

export interface CompletedJob extends Omit<ActiveJob, "status"> {
  completedAt: string;
  totalAmount: number;
  duration: number;
  paymentStatus: "paid" | "pending";
  hasReview: boolean;
  reviewRequested: boolean;
  reviewRequestedAt?: string;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export interface ReferralOpportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  fee: number;
  estimatedJobValue: number;
  isHotLead: boolean;
  postedAt: string;
  agent?: {
    name: string;
    agency: string;
    trustScore: number;
    totalReviews: number;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: "job" | "consultation" | "follow_up";
  customerName: string;
  location: string;
  notes?: string;
}
