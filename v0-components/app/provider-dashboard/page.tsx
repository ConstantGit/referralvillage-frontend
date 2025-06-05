// app/provider-dashboard/page.tsx
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile" // Assuming you have this hook

// Import Mock Data
import {
  mockProvider,
  mockProviderStats,
  mockReferralOpportunities,
  mockActiveJobs,
  mockCompletedJobs,
  mockProviderReviews,
  mockCalendarEvents,
  mockQuickStats,
  serviceTypes as mockServiceTypes,
  locations as mockLocations,
  priceRanges as mockPriceRanges,
} from "./mock-data"

// Import Components
import { ProviderHeader } from "./components/provider-header"
import { StatsCardGrid } from "./components/stats-card-grid"
import { NewOpportunitiesTab } from "./components/new-opportunities-tab"
import { MyJobsTab } from "./components/my-jobs-tab"
import { CompletedJobsTab } from "./components/completed-jobs-tab"
import { ProviderSidebar } from "./components/provider-sidebar"

// For Mobile Bottom Navigation
import { Briefcase, History, LayoutGrid } from "lucide-react" // Added LayoutGrid for Opportunities
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProviderDashboardPage() {
  const { toast } = useToast()
  const isMobile = useMobile() // Using the hook from messages page
  const [activeTab, setActiveTab] = useState("opportunities")

  // Mock handlers
  const handleAvailabilityChange = (isAvailable: boolean) => {
    // Update mockProvider data or make API call
    mockProvider.isAvailable = isAvailable
    toast({
      title: `Availability ${isAvailable ? "Enabled" : "Disabled"}`,
      description: isAvailable
        ? "You are now discoverable for new jobs."
        : "You will not be shown new job opportunities.",
    })
  }

  const handleQuickBuy = (opportunityId: string) => {
    toast({
      title: "Referral Purchased (Simulated)",
      description: `You've acquired opportunity ${opportunityId}. It's now in 'My Jobs'.`,
    })
    // Simulate moving opportunity to active jobs, remove from opportunities
  }

  const handleMarkComplete = (jobId: string, notes?: string) => {
    toast({
      title: "Job Marked Complete (Simulated)",
      description: `Job ${jobId} marked as complete. ${notes ? "Notes: " + notes : ""}`,
    })
    // Simulate moving job to completed, update earnings etc.
  }

  const handleAddNotes = (jobId: string, notes: string) => {
    toast({ title: "Notes Saved (Simulated)", description: `Notes for job ${jobId} have been updated.` })
    // Simulate saving notes
  }

  const handleRequestReview = (jobId: string) => {
    toast({ title: "Review Requested (Simulated)", description: `Review request sent for job ${jobId}.` })
    // Simulate sending review request
  }

  const mobileNavItems = [
    { name: "Opportunities", value: "opportunities", icon: LayoutGrid },
    { name: "My Jobs", value: "my-jobs", icon: Briefcase },
    { name: "Completed", value: "completed", icon: History },
    // Add more if sidebar items need to be tabs on mobile, or use a "More" menu
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-full mx-auto p-3 md:p-4 lg:p-6 space-y-6">
        <ProviderHeader provider={mockProvider} onAvailabilityChange={handleAvailabilityChange} />
        <StatsCardGrid stats={mockProviderStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {!isMobile && ( // Desktop TabsList
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted p-1 rounded-lg">
                  <TabsTrigger value="opportunities">New Opportunities</TabsTrigger>
                  <TabsTrigger value="my-jobs">My Jobs</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              )}

              <TabsContent value="opportunities">
                <NewOpportunitiesTab
                  opportunities={mockReferralOpportunities}
                  serviceTypes={mockServiceTypes}
                  locations={mockLocations}
                  priceRanges={mockPriceRanges}
                  onQuickBuy={handleQuickBuy}
                />
              </TabsContent>
              <TabsContent value="my-jobs">
                <MyJobsTab
                  activeJobs={mockActiveJobs}
                  onMarkComplete={handleMarkComplete}
                  onAddNotes={handleAddNotes}
                />
              </TabsContent>
              <TabsContent value="completed">
                <CompletedJobsTab completedJobs={mockCompletedJobs} onRequestReview={handleRequestReview} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Sidebar */}
          {!isMobile && (
            <ProviderSidebar
              quickStats={mockQuickStats}
              upcomingJobs={mockCalendarEvents}
              recentReviews={mockProviderReviews}
            />
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-top-lg">
          <div className="grid grid-cols-3 h-16">
            {mobileNavItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "flex flex-col items-center justify-center h-full rounded-none text-xs",
                  activeTab === item.value ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
                onClick={() => setActiveTab(item.value)}
              >
                <item.icon
                  className={cn("h-5 w-5 mb-0.5", activeTab === item.value ? "text-primary" : "text-muted-foreground")}
                />
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
