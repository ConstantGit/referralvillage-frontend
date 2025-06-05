export interface Provider {
  id: string
  businessName: string
  logoUrl?: string // Optional
  avatarFallback: string
  trustScore: number
  totalReferralsForTrustScore?: number // For the provider's own trust score display
  qualityRateForTrustScore?: number // For the provider's own trust score display
  isAvailable: boolean
  // other profile fields
}

export interface ProviderStats {
  availableReferrals: number
  newReferralsToday: number
  jobsCompletedThisMonth: number
  earningsThisMonth: number // Store as number, format as currency in UI
  avgResponseTimeHours: number // In hours
}

export interface ReferralOpportunity {
  id: string
  serviceType: string
  location: string // e.g., "Downtown Austin" or specific address part
  fee: number // Referral fee
  estimatedJobValue?: number // Optional
  description?: string
  expiresAt: string // ISO string for countdown
  agent: {
    id: string
    name: string
    agency?: string
    trustScore: number
    totalReferralsForTrustScore: number
    qualityRateForTrustScore: number
  }
  isHotLead?: boolean
  postedAt: string // ISO string
}

export type JobStatus = "accepted" | "scheduled" | "in_progress" | "pending_completion" | "payment_pending"

export interface ActiveJob {
  id: string
  referralId: string
  serviceType: string
  customerName: string
  customerPhone?: string // Available after purchase
  customerAddress?: string // Available after purchase
  scheduledDateTime?: string // ISO string
  status: JobStatus
  feePaid: number
  notes?: string
}

export interface CompletedJob {
  id: string
  referralId: string
  serviceType: string
  customerName: string
  completedDate: string // ISO string
  earnings: number
  reviewRequested: boolean
  reviewReceived?: {
    rating: number
    comment?: string
  }
}

export interface ProviderReview {
  id: string
  customerName: string
  jobType: string
  rating: number
  comment: string
  date: string // ISO string
}

export interface CalendarEvent {
  id: string
  title: string // e.g. "Job: Kitchen Sink Repair"
  start: string // ISO string
  end?: string // ISO string for duration, or assume fixed duration
  jobId?: string // Link to active job
}

export interface QuickStats {
  acceptanceRate: number // percentage
  avgCompletionTimeDays: number // in days
}
