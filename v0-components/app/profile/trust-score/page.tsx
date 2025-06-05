"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, Zap, CheckCircle, MessageSquareWarning, ShieldCheck, Award, Star } from "lucide-react"
import { useTheme } from "next-themes" // Import useTheme

const scoreHistoryData = [
  { month: "Jan", score: 4.2 },
  { month: "Feb", score: 4.3 },
  { month: "Mar", score: 4.5 },
  { month: "Apr", score: 4.4 },
  { month: "May", score: 4.6 },
  { month: "Jun", score: 4.8 },
]

const scoreBreakdown = [
  {
    name: "Response Time",
    value: 95,
    icon: Zap,
    color: "text-blue-500 dark:text-blue-400",
    description: "Avg. 15 mins",
  },
  {
    name: "Job Completion",
    value: 92,
    icon: CheckCircle,
    color: "text-green-500 dark:text-green-400",
    description: "92% success rate",
  },
  {
    name: "Customer Satisfaction",
    value: 98,
    icon: Star,
    color: "text-yellow-500 dark:text-yellow-400",
    description: "4.9/5 stars",
  },
  {
    name: "Dispute Rate",
    value: 2,
    icon: MessageSquareWarning,
    color: "text-red-500 dark:text-red-400",
    description: "Low dispute rate",
  },
  {
    name: "Account Age Bonus",
    value: 100,
    icon: ShieldCheck,
    color: "text-purple-500 dark:text-purple-400",
    description: "Loyalty bonus",
  },
]

const earnedBadges = [
  {
    name: "100+ Referrals",
    icon: Award,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
  },
  { name: "Top Rated", icon: Star, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400" },
  { name: "Fast Responder", icon: Zap, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400" },
]

export default function TrustScoreDashboardPage() {
  const overallScore = 4.8
  const { theme } = useTheme() // Get current theme

  const chartLineColor = theme === "dark" ? "#A78BFA" : "#9333EA" // Lighter purple for dark, original for light
  const chartTextColor = theme === "dark" ? "#A1A1AA" : "#71717A" // zinc-400 for dark, zinc-500 for light
  const chartGridColor = theme === "dark" ? "#3F3F46" : "#E5E7EB" // zinc-700 for dark, gray-200 for light

  return (
    <div className="min-h-screen bg-background lg:pl-0">
      {" "}
      {/* Use bg-background */}
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Trust Score</h1> {/* Use text-foreground */}
          <p className="text-muted-foreground">Understand and improve your reputation on ReferralVillage</p>{" "}
          {/* Use text-muted-foreground */}
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-primary-foreground">
          {" "}
          {/* Gradient is fine, text-primary-foreground ensures contrast */}
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-center md:text-left">
                <p className="text-lg font-medium opacity-90">Overall Trust Score</p>
                <p className="text-6xl font-bold my-2">{overallScore.toFixed(1)}</p>
                <div className="flex justify-center md:justify-start items-center space-x-1 opacity-90">
                  {[...Array(Math.floor(overallScore))].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                  {overallScore % 1 >= 0.5 && <Star className="h-5 w-5 fill-current text-yellow-400 opacity-50" />}
                  <span className="ml-1">Excellent</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/3">
                <Progress value={overallScore * 20} className="h-3 [&>div]:bg-yellow-400" />
                <p className="text-sm text-center mt-2 opacity-90">Your score is higher than 92% of agents.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>How your Trust Score is calculated.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scoreBreakdown.map((item) => (
              <div key={item.name} className="p-4 bg-muted/50 dark:bg-muted/30 rounded-lg">
                {" "}
                {/* Use bg-muted for slight differentiation */}
                <div className="flex items-center space-x-3 mb-2">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                </div>
                <Progress
                  value={item.value}
                  className={`h-2 [&>div]:${item.color.replace("text-", "bg-").replace("dark:text-", "dark:bg-")}`}
                />
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Score History */}
        <Card>
          <CardHeader>
            <CardTitle>Score History</CardTitle>
            <CardDescription>Your Trust Score trend over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                <XAxis dataKey="month" stroke={chartTextColor} />
                <YAxis domain={[3.5, 5]} stroke={chartTextColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "hsl(var(--card))" : "hsl(var(--background))",
                    borderColor: theme === "dark" ? "hsl(var(--border))" : "hsl(var(--popover))",
                    color: "hsl(var(--foreground))",
                  }}
                  cursor={{ fill: theme === "dark" ? "rgba(167, 139, 250, 0.1)" : "rgba(147, 51, 234, 0.1)" }}
                />
                <Legend wrapperStyle={{ color: chartTextColor }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke={chartLineColor}
                  strokeWidth={2}
                  activeDot={{ r: 8, fill: chartLineColor, stroke: chartLineColor }}
                  dot={{ fill: chartLineColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tips to Improve Score */}
        <Card>
          <CardHeader>
            <CardTitle>Tips to Improve Your Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400 mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Respond to inquiries quickly.</h4>
                <p className="text-sm text-muted-foreground">Aim for under 30 minutes response time.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400 mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Ensure high-quality referrals.</h4>
                <p className="text-sm text-muted-foreground">Provide accurate details and set clear expectations.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-green-500 dark:text-green-400 mt-1" />
              <div>
                <h4 className="font-medium text-foreground">Maintain a high job completion rate.</h4>
                <p className="text-sm text-muted-foreground">Follow up to ensure services are rendered.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Earned Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {earnedBadges.map((badge) => (
              <Badge key={badge.name} className={`px-3 py-1.5 text-sm ${badge.color}`}>
                <badge.icon className="h-4 w-4 mr-2" />
                {badge.name}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
