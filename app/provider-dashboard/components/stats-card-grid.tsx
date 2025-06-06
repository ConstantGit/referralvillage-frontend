import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/app/lib/utils";
import type { StatsCardGridProps } from "../types";

export function StatsCardGrid({ stats }: StatsCardGridProps) {
  const cards = [
    {
      title: "Total Earnings",
      value: formatCurrency(stats.totalEarnings),
      description: `${formatCurrency(stats.earningsThisMonth)} this month`,
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      description: `${stats.jobsCompletedThisMonth} completed this month`,
    },
    {
      title: "Available Referrals",
      value: stats.availableReferrals,
      description: `${stats.newReferralsToday} new today`,
    },
    {
      title: "Performance",
      value: `${stats.acceptanceRate}%`,
      description: `${stats.avgResponseTimeHours}h avg. response time`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <Card key={i} className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {card.title}
            </p>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
