import type { Provider, ProviderStats, ActiveJob, CompletedJob, ReferralOpportunity } from "@/app/types/provider";

export const mockDashboardData = {
  provider: {
    id: "p1",
    name: "John Smith",
    businessName: "Smith's Plumbing & Heating",
    email: "john@smithplumbing.com",
    phone: "(512) 555-0123",
    avatar: "/plumber-logo.png",
    serviceTypes: ["Plumbing", "Water Heater Installation", "Drain Cleaning"],
    isAvailable: true,
    rating: 4.8,
    totalReviews: 156,
    joinedAt: "2024-01-15T08:00:00Z"
  } as Provider,

  stats: {
    totalEarnings: 85000,
    earningsThisMonth: 12500,
    activeJobs: 8,
    jobsCompletedThisMonth: 15,
    availableReferrals: 12,
    newReferralsToday: 3,
    acceptanceRate: 85,
    avgResponseTimeHours: 2,
    avgCompletionTimeDays: 3
  } as ProviderStats,

  activeJobs: [
    {
      id: "j1",
      title: "Water Heater Installation",
      description: "Install new 50-gallon water heater",
      customerName: "Alice Johnson",
      location: "Cedar Park, TX",
      scheduledDateTime: "2025-06-06T10:00:00Z",
      feePaid: 150,
      status: "scheduled",
      notes: ["Customer prefers morning appointment", "Has all materials on site"]
    },
    {
      id: "j2",
      title: "Kitchen Sink Repair",
      description: "Fix leaking pipes under kitchen sink",
      customerName: "Bob Wilson",
      location: "Round Rock, TX",
      scheduledDateTime: "2025-06-05T14:00:00Z",
      feePaid: 100,
      status: "in_progress"
    }
  ] as ActiveJob[],

  completedJobs: [
    {
      id: "j3",
      title: "Bathroom Remodel",
      description: "Complete bathroom plumbing renovation",
      customerName: "Carol Martinez",
      location: "Austin, TX",
      scheduledDateTime: "2025-06-01T09:00:00Z",
      feePaid: 250,
      completedAt: "2025-06-03T17:00:00Z",
      totalAmount: 3500,
      duration: 16,
      paymentStatus: "paid",
      hasReview: true,
      reviewRequested: false,
      review: {
        rating: 5,
        comment: "Excellent work, very professional and clean",
        createdAt: "2025-06-04T10:00:00Z"
      }
    },
    {
      id: "j4",
      title: "Pipe Repair",
      description: "Fix burst pipe in basement",
      customerName: "David Brown",
      location: "Austin, TX",
      scheduledDateTime: "2025-06-02T13:00:00Z",
      feePaid: 200,
      completedAt: "2025-06-02T15:00:00Z",
      totalAmount: 800,
      duration: 2,
      paymentStatus: "pending",
      hasReview: false,
      reviewRequested: true,
      reviewRequestedAt: "2025-06-03T09:00:00Z"
    }
  ] as CompletedJob[],

  opportunities: [
    {
      id: "r1",
      title: "New Construction Plumbing",
      description: "Complete plumbing installation for new home construction",
      location: "Cedar Park, TX",
      budget: 15000,
      fee: 450,
      estimatedJobValue: 12000,
      isHotLead: true,
      postedAt: "2025-06-05T08:00:00Z",
      agent: {
        name: "Sarah Lee",
        agency: "Austin Home Builders",
        trustScore: 4.9,
        totalReviews: 234
      }
    },
    {
      id: "r2",
      title: "Commercial Kitchen Installation",
      description: "Install plumbing for new restaurant kitchen",
      location: "Round Rock, TX",
      budget: 25000,
      fee: 750,
      estimatedJobValue: 20000,
      isHotLead: false,
      postedAt: "2025-06-04T15:00:00Z",
      agent: {
        name: "Mike Chen",
        agency: "Restaurant Solutions",
        trustScore: 4.7,
        totalReviews: 89
      }
    }
  ] as ReferralOpportunity[],

  recentReviews: [
    {
      id: "rev1",
      rating: 5,
      comment: "Outstanding service! Fixed our emergency leak quickly.",
      createdAt: "2025-06-04T16:00:00Z",
      customerName: "Emma Davis"
    },
    {
      id: "rev2",
      rating: 4,
      comment: "Good work, slightly delayed but communicated well.",
      createdAt: "2025-06-03T14:00:00Z",
      customerName: "Frank White"
    }
  ]
};
