// app/provider-dashboard/mock-data.ts
import type {
  Provider,
  ProviderStats,
  ReferralOpportunity,
  ActiveJob,
  CompletedJob,
  ProviderReview,
  CalendarEvent,
  QuickStats,
} from "./types"
import { addHours, addDays, subDays, formatISO } from "date-fns"

export const mockProvider: Provider = {
  id: "provider-123",
  businessName: "ProPlumb Solutions",
  logoUrl: "/placeholder-fq647.png",
  avatarFallback: "PS",
  trustScore: 4.7,
  totalReferralsForTrustScore: 45,
  qualityRateForTrustScore: 92,
  isAvailable: true,
}

export const mockProviderStats: ProviderStats = {
  availableReferrals: 12,
  newReferralsToday: 3,
  jobsCompletedThisMonth: 8,
  earningsThisMonth: 6200,
  avgResponseTimeHours: 1.5,
}

const now = new Date()

export const mockReferralOpportunities: ReferralOpportunity[] = [
  {
    id: "ref-opp-1",
    serviceType: "Emergency Leak Repair",
    location: "Downtown Austin, 78701",
    fee: 75,
    estimatedJobValue: 300,
    description: "Customer reports a burst pipe under the kitchen sink. Needs immediate attention.",
    expiresAt: formatISO(addHours(now, 12)),
    agent: {
      id: "agent-1",
      name: "Sarah Miller",
      agency: "Realty Austin",
      trustScore: 4.9,
      totalReferralsForTrustScore: 120,
      qualityRateForTrustScore: 98,
    },
    isHotLead: true,
    postedAt: formatISO(subDays(now, 0)),
  },
  {
    id: "ref-opp-2",
    serviceType: "Water Heater Installation",
    location: "Cedar Park, 78613",
    fee: 120,
    estimatedJobValue: 800,
    description: "New tankless water heater installation for a residential property.",
    expiresAt: formatISO(addDays(now, 2)),
    agent: {
      id: "agent-2",
      name: "John Davis",
      agency: "Keller Williams",
      trustScore: 4.6,
      totalReferralsForTrustScore: 85,
      qualityRateForTrustScore: 90,
    },
    postedAt: formatISO(subDays(now, 1)),
  },
  {
    id: "ref-opp-3",
    serviceType: "Faucet Replacement",
    location: "Round Rock, 78664",
    fee: 50,
    estimatedJobValue: 200,
    description: "Leaky bathroom faucet, customer wants a modern replacement.",
    expiresAt: formatISO(addDays(now, 1)),
    agent: {
      id: "agent-3",
      name: "Linda Chen",
      agency: "Compass",
      trustScore: 4.8,
      totalReferralsForTrustScore: 95,
      qualityRateForTrustScore: 96,
    },
    postedAt: formatISO(subDays(now, 2)),
  },
]

export const mockActiveJobs: ActiveJob[] = [
  {
    id: "job-1",
    referralId: "ref-prev-101",
    serviceType: "Clogged Drain Clearing",
    customerName: "Mike Wheeler",
    customerPhone: "512-555-0101",
    customerAddress: "123 Oak Lane, Austin, TX 78704",
    scheduledDateTime: formatISO(addHours(now, 2)),
    status: "scheduled",
    feePaid: 60,
    notes: "Customer mentioned it's the main bathroom shower drain.",
  },
  {
    id: "job-2",
    referralId: "ref-prev-102",
    serviceType: "Toilet Repair",
    customerName: "Nancy Byers",
    customerPhone: "512-555-0102",
    customerAddress: "456 Pine St, Austin, TX 78702",
    status: "in_progress",
    feePaid: 80,
  },
]

export const mockCompletedJobs: CompletedJob[] = [
  {
    id: "job-comp-1",
    referralId: "ref-old-201",
    serviceType: "Garbage Disposal Repair",
    customerName: "Steve Harrington",
    completedDate: formatISO(subDays(now, 5)),
    earnings: 180,
    reviewRequested: true,
    reviewReceived: { rating: 5, comment: "Fast and efficient service!" },
  },
  {
    id: "job-comp-2",
    referralId: "ref-old-202",
    serviceType: "Pipe Insulation",
    customerName: "Dustin Henderson",
    completedDate: formatISO(subDays(now, 12)),
    earnings: 250,
    reviewRequested: false,
  },
]

export const mockProviderReviews: ProviderReview[] = [
  {
    id: "rev-1",
    customerName: "Joyce Byers",
    jobType: "Sump Pump Fix",
    rating: 5,
    comment: "ProPlumb was amazing! Quick response and fixed the issue in no time. Highly recommend.",
    date: formatISO(subDays(now, 3)),
  },
  {
    id: "rev-2",
    customerName: "Jim Hopper",
    jobType: "Outdoor Spigot Repair",
    rating: 4,
    comment: "Good work, a bit pricey but got the job done.",
    date: formatISO(subDays(now, 10)),
  },
]

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "Job: Clogged Drain (Mike W.)",
    start: formatISO(addHours(now, 2)),
    end: formatISO(addHours(now, 4)),
    jobId: "job-1",
  },
  { id: "cal-2", title: "Job: Follow-up (Nancy B.)", start: formatISO(addDays(now, 1)), jobId: "job-2" },
]

export const mockQuickStats: QuickStats = {
  acceptanceRate: 85, // percentage
  avgCompletionTimeDays: 1.2,
}

export const serviceTypes = [
  "All",
  "Emergency Leak Repair",
  "Water Heater Installation",
  "Faucet Replacement",
  "Drain Cleaning",
  "Toilet Repair",
]
export const locations = ["All", "Downtown Austin", "Cedar Park", "Round Rock", "North Austin", "South Austin"]
export const priceRanges = ["All", "$0-$50", "$51-$100", "$101-$200", "$200+"]
