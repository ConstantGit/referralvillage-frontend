// Import types directly instead of from module
export interface Provider {
  id: string;
  businessName: string;
  logoUrl?: string;
  avatarFallback: string;
  trustScore: number;
  totalReferralsForTrustScore?: number;
  qualityRateForTrustScore?: number;
  isAvailable: boolean;
}

export interface ProviderStats {
  availableReferrals: number;
  newReferralsToday: number;
  jobsCompletedThisMonth: number;
  earningsThisMonth: number;
  avgResponseTimeHours: number;
}

export interface ReferralOpportunity {
  id: string;
  serviceType: string;
  location: string;
  fee: number;
  estimatedJobValue?: number;
  description?: string;
  expiresAt: string;
  agent: {
    id: string;
    name: string;
    agency?: string;
    trustScore: number;
    totalReferralsForTrustScore: number;
    qualityRateForTrustScore: number;
  };
  isHotLead?: boolean;
  postedAt: string;
}

export type JobStatus = "accepted" | "scheduled" | "in_progress" | "pending_completion" | "payment_pending";

export interface ActiveJob {
  id: string;
  referralId: string;
  serviceType: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  scheduledDateTime?: string;
  status: JobStatus;
  feePaid: number;
  notes?: string;
}

export interface CompletedJob {
  id: string;
  referralId: string;
  serviceType: string;
  customerName: string;
  completedDate: string;
  earnings: number;
  reviewRequested: boolean;
  reviewReceived?: {
    rating: number;
    comment?: string;
  };
}

export interface ProviderReview {
  id: string;
  customerName: string;
  jobType: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  jobId?: string;
}

export interface QuickStats {
  acceptanceRate: number;
  avgCompletionTimeDays: number;
}

export interface UpdateAvailabilityRequest {
  isAvailable: boolean;
}

export interface UpdateJobStatusRequest {
  status: JobStatus;
  notes?: string;
}

export interface PurchaseReferralRequest {
  opportunityId: string;
}

export interface RequestReviewRequest {
  jobId: string;
}

export interface AddJobNotesRequest {
  jobId: string;
  notes: string;
}

export interface ProviderFilters {
  serviceTypes?: string[];
  locations?: string[];
  priceRange?: string;
  sortBy?: 'date' | 'price' | 'urgency';
}

// Response types
export interface ProviderDashboardData {
  provider: Provider;
  stats: ProviderStats;
  quickStats: QuickStats;
}

export interface OpportunitiesResponse {
  opportunities: ReferralOpportunity[];
  totalCount: number;
  serviceTypes: string[];
  locations: string[];
  priceRanges: string[];
}

export interface JobsResponse {
  activeJobs: ActiveJob[];
  completedJobs: CompletedJob[];
  upcomingEvents: CalendarEvent[];
}

export interface ReviewsResponse {
  reviews: ProviderReview[];
  totalCount: number;
  averageRating: number;
}
