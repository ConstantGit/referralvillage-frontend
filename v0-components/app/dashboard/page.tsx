"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, DollarSign, TrendingUp, Users, Eye, Share, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation" // Ensure usePathname is imported

const statsCards = [
  {
    title: "Total Earnings",
    value: "$12,450",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Referrals",
    value: "23",
    change: "+3 this week",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2% this month",
    icon: Users,
    color: "text-purple-600",
  },
]

const activeReferrals = [
  {
    id: 1,
    service: "Emergency Plumbing",
    location: "Downtown Austin",
    fee: "$150",
    status: "active",
    views: 12,
    interested: 3,
    timeLeft: "2 days",
    isPrivate: false,
  },
  {
    id: 2,
    service: "Roof Inspection",
    location: "Cedar Park",
    fee: "$100",
    status: "purchased",
    views: 8,
    interested: 1,
    timeLeft: "Sold",
    isPrivate: true,
  },
  {
    id: 3,
    service: "HVAC Maintenance",
    location: "Round Rock",
    fee: "$75",
    status: "active",
    views: 15,
    interested: 5,
    timeLeft: "5 days",
    isPrivate: false,
  },
]

export default function DashboardPage() {
  const pathname = usePathname()
  // For the dashboard, breadcrumbs might be just "Dashboard" or not shown if it's the root after login.
  // Let's make it simple for now.
  const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard", isCurrent: true }]

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-0">
      <div className="max-w-7xl mx-auto p-3 md:p-4 space-y-4">
        {/* No breadcrumbs needed on the main dashboard page usually, or just "Dashboard" */}
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-heading-2xl text-gray-900">Dashboard</h1>
            <p className="text-body-md text-muted mt-0.5">Welcome back, John! Here's your referral activity.</p>
          </div>
          <Link href="/referrals/create">
            <Button className="bg-purple-600 hover:bg-purple-700 mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Create New Referral
            </Button>
          </Link>
        </div>

        {/* Trust Score Card */}
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-heading-md mb-1">Your Trust Score</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-heading-xl">4.8 ⭐</div>
                  <div className="text-body-sm opacity-90">
                    <p>156 total referrals</p>
                    <p>94% quality score</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/profile/trust-score">
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-md font-medium text-muted">{stat.title}</p>
                    <p className="text-heading-lg">{stat.value}</p>
                    <p className={`text-body-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Referrals Tabs */}
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-heading-lg">Your Referrals</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-1 xs:grid-cols-3 mb-3">
                <TabsTrigger value="all">All Referrals</TabsTrigger>
                <TabsTrigger value="private">Private</TabsTrigger>
                <TabsTrigger value="public">Public</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {activeReferrals.map((referral) => (
                  <div key={referral.id} className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0 lg:gap-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-body-lg font-medium">{referral.service}</h4>
                          <Badge
                            variant={referral.status === "active" ? "default" : "secondary"}
                            className={referral.status === "active" ? "bg-green-100 text-green-800" : ""}
                          >
                            {referral.status === "active" ? "Active" : "Purchased"}
                          </Badge>
                          {referral.isPrivate && <Badge variant="outline">Private</Badge>}
                        </div>
                        <p className="text-body-sm text-muted">{referral.location}</p>
                        <div className="flex items-center space-x-3 mt-1.5 text-body-sm text-muted">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{referral.views} views</span>
                          </span>
                          <span>{referral.interested} interested</span>
                          <span>{referral.timeLeft}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 mt-2 lg:mt-0">
                        <div className="text-right">
                          <p className="text-heading-md text-purple-600">{referral.fee}</p>
                          <p className="text-body-sm text-muted">Referral Fee</p>
                        </div>

                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          {referral.isPrivate && (
                            <Button variant="outline" size="sm">
                              <Share className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="private">
                <p className="text-body-md text-muted text-center py-8">Private referrals will appear here</p>
              </TabsContent>

              <TabsContent value="public">
                <p className="text-body-md text-muted text-center py-8">
                  Public marketplace referrals will appear here
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
