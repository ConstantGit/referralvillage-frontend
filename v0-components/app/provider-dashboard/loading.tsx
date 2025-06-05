import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProviderDashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <div className="flex space-x-2 mb-6">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-5 w-4 rounded-md" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div>
            <Skeleton className="h-8 w-64 mb-2 rounded-md" />
            <Skeleton className="h-4 w-80 rounded-md" />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Skeleton className="h-10 w-40 rounded-md" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-5 w-5 rounded-sm" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-16 mb-1 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* TabsList Skeleton */}
          <div className="grid w-full grid-cols-3 gap-2 mb-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Tab Content Skeleton (e.g., for New Referrals) */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-1 rounded-md" />
              <Skeleton className="h-4 w-64 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <Skeleton className="h-6 w-40 mb-2 rounded-md" />
                      <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                        <Skeleton className="h-4 w-20 rounded-md" />
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                      <Skeleton className="h-5 w-20 mb-1 rounded-md" />
                      <Skeleton className="h-6 w-16 mb-1 rounded-md" />
                      <Skeleton className="h-3 w-24 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full mt-2 py-2 rounded-md" />
                  <div className="flex items-center justify-between mt-3">
                    <Skeleton className="h-3 w-28 rounded-md" />
                    <div className="space-x-2 flex">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Section Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-20 mb-1 rounded-md" />
              <Skeleton className="h-7 w-24 rounded-md" />
              <Skeleton className="h-4 w-20 mb-1 mt-2 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-2 w-full my-2 rounded-md" /> {/* Separator */}
              <Skeleton className="h-3 w-32 mb-1 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-10 w-full mt-2 rounded-md" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
