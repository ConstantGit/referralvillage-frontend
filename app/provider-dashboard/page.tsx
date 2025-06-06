"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderHeader } from "./components/provider-header";
import { StatsCardGrid } from "./components/stats-card-grid";
import { MyJobsTab } from "./components/my-jobs-tab";
import { NewOpportunitiesTab } from "./components/new-opportunities-tab";
import { CompletedJobsTab } from "./components/completed-jobs-tab";
import { mockDashboardData } from "./mock-data";
import PROVIDER_API from "@/app/lib/providers/api";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import type { ActiveJob } from "@/app/types/provider";

export default function ProviderDashboardPage() {
  const { provider, stats, activeJobs, opportunities, completedJobs } = mockDashboardData;
  const [isAvailable, setIsAvailable] = useState(provider.isAvailable);

  const handleAvailabilityChange = async (newAvailability: boolean) => {
    try {
      await PROVIDER_API.updateAvailability({ isAvailable: newAvailability });
      setIsAvailable(newAvailability);
      toast({
        title: newAvailability ? "You are now available" : "You are now unavailable",
        description: newAvailability
          ? "You will receive new referral opportunities"
          : "You won't receive new referral opportunities",
      });
    } catch (error) {
      toast({
        title: "Error updating availability",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handlePurchaseReferral = async (opportunityId: string) => {
    try {
      await PROVIDER_API.purchaseReferral({ opportunityId });
      toast({
        title: "Referral purchased successfully",
        description: "You can now contact the customer",
      });
    } catch (error) {
      toast({
        title: "Error purchasing referral",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleUpdateJobStatus = async (jobId: string, status: ActiveJob["status"]) => {
    try {
      await PROVIDER_API.updateJobStatus(jobId, { status });
      toast({
        title: "Job status updated",
        description: `Job status changed to ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error updating job status",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleRequestReview = async (jobId: string) => {
    try {
      await PROVIDER_API.requestReview({ jobId });
      toast({
        title: "Review requested",
        description: "The customer will be notified",
      });
    } catch (error) {
      toast({
        title: "Error requesting review",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <ProviderHeader
        provider={provider}
        isAvailable={isAvailable}
        onAvailabilityChange={handleAvailabilityChange}
      />

      <StatsCardGrid stats={stats} />

      <Tabs defaultValue="my-jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-jobs">
            My Jobs ({activeJobs.length})
          </TabsTrigger>
          <TabsTrigger value="opportunities">
            New Opportunities ({opportunities.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedJobs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-jobs" className="space-y-4">
          <MyJobsTab 
            jobs={activeJobs} 
            onUpdateStatus={handleUpdateJobStatus}
          />
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <NewOpportunitiesTab 
            opportunities={opportunities}
            onPurchaseReferral={handlePurchaseReferral}
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <CompletedJobsTab 
            jobs={completedJobs}
            onRequestReview={handleRequestReview}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
