"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Add Lock icon for Privacy
import { User, Bell, CreditCard, Shield, CalendarDays, Lock, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Breadcrumbs, generateBreadcrumbsFromPath } from "@/components/breadcrumbs"
import { usePathname } from "next/navigation"
import { NetworkError } from "@/components/network-error"

// Import the new settings components
import { ProfileSettings } from "./components/profile-settings"
import { AccountSettings } from "./components/account-settings"
import { PaymentSettings } from "./components/payment-settings"
import { NotificationSettings } from "./components/notification-settings"
import { PrivacySettings } from "./components/privacy-settings"
import { ConnectedAccountsSettings } from "./components/connected-accounts-settings"
import { AvailabilitySettings } from "./components/availability-settings" // Kept for providers
import { useState } from "react"

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Mock initial data - in a real app, this would be fetched
const mockProfileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Experienced real estate agent specializing in residential properties.",
  avatarUrl: "/diverse-user-avatars.png", // Ensure this image exists in public
  specialties: "Residential, Luxury Homes, First-time Buyers",
  companyName: "Doe Realty",
  companyWebsite: "https://doerealty.com",
  companyAddress: "123 Main St, Anytown, USA",
}

const mockAccountData = {
  currentEmail: "john.doe@example.com",
  is2FAEnabled: false,
}

const mockPrivacyData = {
  profileVisibility: "public" as "public" | "connections" | "private",
  shareDataWithPartners: false,
  showActivityStatus: true,
}

const mockAvailabilityData = daysOfWeek.reduce(
  (acc, day) => {
    acc[day] = { enabled: day !== "Saturday" && day !== "Sunday", start: "09:00", end: "17:00" }
    return acc
  },
  {} as Record<string, { enabled: boolean; start: string; end: string }>,
)

// Placeholder for user role - in a real app, get this from session/context
const userRole = "provider" // or "agent" or "both"

export default function SettingsPage() {
  const { toast } = useToast()
  const pathname = usePathname()
  const breadcrumbItems = generateBreadcrumbsFromPath(pathname)

  const [loadingSettings, setLoadingSettings] = useState(true)
  const [settingsError, setSettingsError] = useState(false)

  // useEffect to fetch settings
  // On catch: setSettingsError(true);
  const retryFetchSettings = () => {
    setSettingsError(false)
    setLoadingSettings(true) /* fetch logic */
  }

  if (loadingSettings) {
    return <div className="p-10 text-center">Loading settings...</div> // Or a skeleton
  }

  if (settingsError) {
    return (
      <div className="max-w-5xl mx-auto p-3 md:p-4 space-y-4">
        <NetworkError
          onRetry={retryFetchSettings}
          title="Could Not Load Settings"
          message="There was a problem fetching your settings. Please check your connection."
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-0">
      <div className="max-w-5xl mx-auto p-3 md:p-4 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="py-4">
          <h1 className="text-heading-2xl text-gray-900 mb-1">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences.</p>
        </div>

        {/* Updated TabsList to accommodate 6 items. md:grid-cols-3 lg:grid-cols-6 */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-4 text-sm">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account">
              <Shield className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
              Account
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Lock className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="connected">
              <LinkIcon className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
              Connected
            </TabsTrigger>
            {(userRole === "provider" || userRole === "both") && (
              <TabsTrigger value="availability">
                <CalendarDays className="h-4 w-4 mr-2 inline-block md:hidden lg:inline-block" />
                Availability
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileSettings initialData={mockProfileData} />
          </TabsContent>
          <TabsContent value="account" className="mt-6">
            <AccountSettings initialData={mockAccountData} />
          </TabsContent>
          <TabsContent value="payments" className="mt-6">
            <PaymentSettings /> {/* Assuming it manages its own initial mock data or fetches */}
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings /> {/* Manages its own initial mock data */}
          </TabsContent>
          <TabsContent value="privacy" className="mt-6">
            <PrivacySettings initialData={mockPrivacyData} />
          </TabsContent>
          <TabsContent value="connected" className="mt-6">
            <ConnectedAccountsSettings /> {/* Manages its own initial mock data */}
          </TabsContent>
          {(userRole === "provider" || userRole === "both") && (
            <TabsContent value="availability" className="mt-6">
              <AvailabilitySettings initialData={mockAvailabilityData} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
