"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon, Download, DollarSign, TrendingUp, BarChart3, PieChartIcon, LineChart } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import type { DateRange } from "react-day-picker"

import { EarningsLineChart } from "./components/earnings-line-chart"
import { EarningsBySourcePieChart } from "./components/earnings-by-source-pie-chart"
import { TopReferralTypesBarChart } from "./components/top-referral-types-bar-chart"
import { ProviderPerformanceMetrics } from "./components/provider-performance-metrics"
import { EmptyState } from "@/components/empty-state" // Import EmptyState

import {
  mockLineChartData,
  mockPieChartData,
  mockBarChartData,
  mockProviderPerformance,
  mockEarningsSummary,
} from "./mock-chart-data"
import { aggregateDataByPeriod, type ChartTimePeriod } from "./utils"
import type { LineChartDataPoint, PieChartDataItem, BarChartDataItem } from "./types"

const datePresets = [
  { label: "Today", range: { from: new Date(), to: new Date() } },
  { label: "Last 7 Days", range: { from: subDays(new Date(), 6), to: new Date() } },
  { label: "This Month", range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
  {
    label: "Last Month",
    range: { from: startOfMonth(subDays(new Date(), 30)), to: endOfMonth(subDays(new Date(), 30)) },
  },
  { label: "This Year", range: { from: startOfYear(new Date()), to: endOfYear(new Date()) } },
]

export default function EarningsPage() {
  const { theme } = useTheme()
  const [lineChartPeriod, setLineChartPeriod] = useState<ChartTimePeriod>("monthly")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [monthlyGoal, setMonthlyGoal] = useState<number | undefined>(mockEarningsSummary.monthlyGoal)
  const [goalInput, setGoalInput] = useState(mockEarningsSummary.monthlyGoal?.toString() || "")

  // Simulate data fetching and processing based on dateRange
  const [currentEarningsSummary, setCurrentEarningsSummary] = useState(mockEarningsSummary)
  const [processedLineChartData, setProcessedLineChartData] = useState<LineChartDataPoint[]>([])
  const [comparisonLineChartData, setComparisonLineChartData] = useState<LineChartDataPoint[]>([])
  const [currentPieChartData, setCurrentPieChartData] = useState<PieChartDataItem[]>(mockPieChartData)
  const [currentBarChartData, setCurrentBarChartData] = useState<BarChartDataItem[]>(mockBarChartData)
  const [currentProviderPerformance, setCurrentProviderPerformance] = useState(mockProviderPerformance)

  useEffect(() => {
    // Simulate fetching/processing data when dateRange or lineChartPeriod changes
    // For line chart:
    const aggregated = aggregateDataByPeriod(mockLineChartData, lineChartPeriod, dateRange)
    setProcessedLineChartData(aggregated.current)
    setComparisonLineChartData(aggregated.previous)

    // For other charts and summary, you might filter mockLineChartData based on dateRange
    // and re-aggregate for pie/bar charts. For simplicity, we'll just use the static mock data
    // for pie and bar charts for now, but in a real app, this would be dynamic.
    setCurrentEarningsSummary(mockEarningsSummary) // This would also be filtered by dateRange
    setCurrentPieChartData(mockPieChartData)
    setCurrentBarChartData(mockBarChartData)
    setCurrentProviderPerformance(mockProviderPerformance)
  }, [dateRange, lineChartPeriod])

  const handleSetGoal = () => {
    const newGoal = Number.parseFloat(goalInput)
    if (!isNaN(newGoal) && newGoal > 0) {
      setMonthlyGoal(newGoal)
      // In a real app, save this to backend
    } else {
      setMonthlyGoal(undefined)
    }
  }

  const goalProgress =
    monthlyGoal && currentEarningsSummary.thisMonth > 0 ? (currentEarningsSummary.thisMonth / monthlyGoal) * 100 : 0

  const handleExport = (format: "png" | "csv" | "pdf") => {
    // Placeholder for actual export logic
    alert(`Exporting as ${format}... (Not implemented)`)
  }

  const noDataForCharts =
    processedLineChartData.length === 0 && currentPieChartData.length === 0 && currentBarChartData.length === 0

  return (
    <div className="min-h-screen bg-background text-foreground lg:pl-0">
      <div className="max-w-7xl mx-auto p-3 md:p-4 space-y-6">
        {/* Header & Date Range Picker */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-heading-2xl">Earnings Dashboard</h1>
            <p className="text-muted-foreground">Track your referral income and performance.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full sm:w-[280px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="flex flex-col sm:flex-row">
                  <div className="p-2 border-r">
                    <p className="text-sm font-medium px-2 py-1.5">Presets</p>
                    {datePresets.map((preset) => (
                      <Button
                        key={preset.label}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => setDateRange(preset.range)}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </div>
              </PopoverContent>
            </Popover>
            {/* Export Buttons Placeholder */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentEarningsSummary.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All-time earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentEarningsSummary.thisMonth.toLocaleString()}</div>
              <p
                className={`text-xs ${currentEarningsSummary.growth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {currentEarningsSummary.growth >= 0 ? "+" : ""}
                {currentEarningsSummary.growth.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentEarningsSummary.pending.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Awaiting payout</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Referral Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentEarningsSummary.avgReferralValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Based on completed referrals</p>
            </CardContent>
          </Card>
        </div>

        {noDataForCharts &&
          !dateRange && ( // Show only if no date range is picked and no data
            <div className="py-10">
              <EmptyState
                icon={<LineChart className="h-16 w-16 text-primary/70" />}
                title="No Earnings Data Yet"
                description="Once you start completing referrals, your earnings data will appear here. Try selecting a date range if you expect to see data."
              />
            </div>
          )}

        {(!noDataForCharts || dateRange) && ( // Render charts if there's data or a date range is selected
          <>
            {/* Earnings Over Time Line Chart */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Earnings Over Time</CardTitle>
                  <Tabs
                    value={lineChartPeriod}
                    onValueChange={(value) => setLineChartPeriod(value as ChartTimePeriod)}
                    className="mt-2 sm:mt-0"
                  >
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="h-[350px] sm:h-[400px]">
                {processedLineChartData.length > 0 ? (
                  <EarningsLineChart
                    data={processedLineChartData}
                    comparisonData={comparisonLineChartData}
                    timePeriod={lineChartPeriod}
                    theme={theme === "dark" ? "dark" : "light"}
                  />
                ) : (
                  <EmptyState
                    icon={<LineChart className="h-12 w-12 text-primary/60" />}
                    title="No Data for Selected Period"
                    description="Try adjusting the date range or time period to see your earnings."
                  />
                )}
              </CardContent>
            </Card>

            {/* Other Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings by Source</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] sm:h-[350px]">
                  {currentPieChartData.length > 0 ? (
                    <EarningsBySourcePieChart data={currentPieChartData} theme={theme === "dark" ? "dark" : "light"} />
                  ) : (
                    <EmptyState
                      icon={<PieChartIcon className="h-12 w-12 text-primary/60" />}
                      title="No Source Data"
                      description="Earnings source data will appear here as you receive payments."
                    />
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Referral Types</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] sm:h-[350px]">
                  {currentBarChartData.length > 0 ? (
                    <TopReferralTypesBarChart data={currentBarChartData} theme={theme === "dark" ? "dark" : "light"} />
                  ) : (
                    <EmptyState
                      icon={<BarChart3 className="h-12 w-12 text-primary/60" />}
                      title="No Referral Type Data"
                      description="Performance by referral type will be shown here."
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Provider Performance & Goal Setting */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Provider Performance Insights</CardTitle>
                  <CardDescription>Metrics on providers you've referred to.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProviderPerformanceMetrics
                    data={currentProviderPerformance}
                    theme={theme === "dark" ? "dark" : "light"}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Goal</CardTitle>
                  <CardDescription>Set a target for your monthly earnings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="e.g., 2000"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSetGoal}>Set</Button>
                    </div>
                    {monthlyGoal !== undefined && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>
                            Progress: ${currentEarningsSummary.thisMonth.toLocaleString()} / $
                            {monthlyGoal.toLocaleString()}
                          </span>
                          <span>{goalProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={goalProgress} className="w-full" />
                        {currentEarningsSummary.thisMonth >= monthlyGoal && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1 text-center">
                            🎉 Goal Achieved!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                    <Download className="mr-2 h-3 w-3" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("png")}>
                    <Download className="mr-2 h-3 w-3" />
                    Export PNG
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
