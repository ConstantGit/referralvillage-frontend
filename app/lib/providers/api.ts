import type { ActiveJob, CompletedJob, Provider, ReferralOpportunity } from "@/app/types/provider";

class ProviderAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/providers${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async updateAvailability({
    isAvailable,
  }: {
    isAvailable: boolean;
  }): Promise<Provider> {
    return this.request("/availability", {
      method: "PATCH",
      body: JSON.stringify({ isAvailable }),
    });
  }

  async updateJobStatus(
    jobId: string,
    { status }: { status: ActiveJob["status"] }
  ): Promise<ActiveJob> {
    return this.request(`/jobs/${jobId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async purchaseReferral({
    opportunityId,
  }: {
    opportunityId: string;
  }): Promise<ReferralOpportunity> {
    return this.request(`/referrals/${opportunityId}/purchase`, {
      method: "POST",
    });
  }

  async requestReview({ jobId }: { jobId: string }): Promise<CompletedJob> {
    return this.request(`/jobs/${jobId}/request-review`, {
      method: "POST",
    });
  }

  async getStats(): Promise<{
    totalEarnings: number;
    earningsThisMonth: number;
    activeJobs: number;
    jobsCompletedThisMonth: number;
    availableReferrals: number;
    newReferralsToday: number;
    acceptanceRate: number;
    avgResponseTimeHours: number;
  }> {
    return this.request("/stats");
  }

  async getActiveJobs(): Promise<ActiveJob[]> {
    return this.request("/jobs/active");
  }

  async getCompletedJobs(): Promise<CompletedJob[]> {
    return this.request("/jobs/completed");
  }

  async getReferralOpportunities(): Promise<ReferralOpportunity[]> {
    return this.request("/referrals/opportunities");
  }
}

const PROVIDER_API = new ProviderAPI();
export default PROVIDER_API;
