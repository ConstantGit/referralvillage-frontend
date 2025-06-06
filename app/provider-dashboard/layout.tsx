import { ProviderSidebar } from "./components/provider-sidebar";
import { mockDashboardData } from "./mock-data";

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Transform active jobs into calendar events
  const upcomingEvents = mockDashboardData.activeJobs.slice(0, 3).map((job) => ({
    id: job.id,
    title: job.title,
    start: job.scheduledDateTime,
    end: new Date(new Date(job.scheduledDateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours duration
    type: "job" as const,
    customerName: job.customerName,
    location: job.location,
    notes: job.notes?.join(", "),
  }));

  return (
    <div className="flex min-h-screen">
      <ProviderSidebar
        quickStats={{
          acceptanceRate: mockDashboardData.stats.acceptanceRate,
          avgCompletionTimeDays: mockDashboardData.stats.avgCompletionTimeDays,
        }}
        upcomingJobs={upcomingEvents}
        recentReviews={mockDashboardData.recentReviews}
      />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
