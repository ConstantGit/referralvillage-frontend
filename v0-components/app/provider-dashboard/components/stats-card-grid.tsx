// app/provider-dashboard/components/stats-card-grid.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, CalendarCheck2, DollarSign, Clock3 } from "lucide-react"
import type { ProviderStats } from "../types"

interface StatsCardGridProps {
  stats: ProviderStats
}

export function StatsCardGrid({ stats }: StatsCardGridProps) {
  const statItems = [
    {
      title: "Available Referrals",
      value: stats.availableReferrals.toString(),
      icon: Briefcase,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      subtext: stats.newReferralsToday > 0 ? `${stats.newReferralsToday} New Today` : "No new referrals today",
      showNewBadge: stats.newReferralsToday > 0,
    },
    {
      title: "Jobs This Month",
      value: stats.jobsCompletedThisMonth.toString(),
      icon: CalendarCheck2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      subtext: "Completed",
    },
    {
      title: "Earnings This Month",
      value: `$${stats.earningsThisMonth.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      subtext: "Based on completed jobs",
    },
    {
      title: "Avg. Response Time",
      value: `${stats.avgResponseTimeHours}h`,
      icon: Clock3,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      subtext: "To new opportunities",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            <div className={`p-1.5 rounded-md ${item.bgColor}`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {item.value}
              {item.showNewBadge && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  NEW
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{item.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
