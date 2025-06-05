"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { NetworkError } from "@/components/network-error"

interface Referral {
  id: string
  referrerId: string
  referredEmail: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

const MyReferralsPage = () => {
  const searchParams = useSearchParams()
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [networkError, setNetworkError] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchData = useCallback(async () => {
    if (!session?.user?.email) {
      return
    }

    setIsLoading(true)
    setNetworkError(false)

    try {
      const response = await fetch(`/api/referrals?email=${session.user.email}`)

      if (!response.ok) {
        setNetworkError(true)
        console.error("Failed to fetch referrals:", response.status, response.statusText)
        return
      }

      const data = await response.json()
      setReferrals(data)
    } catch (error) {
      console.error("Error fetching referrals:", error)
      setNetworkError(true)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.email])

  useEffect(() => {
    if (status === "authenticated") {
      fetchData()
    }
  }, [status, fetchData])

  useEffect(() => {
    const success = searchParams.get("success")
    if (success) {
      toast.success("Referral sent successfully!")
      router.replace("/my-referrals", { scroll: false })
    }
  }, [searchParams, router])

  const retryFetchData = () => {
    fetchData()
  }

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div className="text-center py-10">Please sign in to view your referrals.</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">My Referrals</h1>

      {networkError && !isLoading && (
        <div className="col-span-full py-10">
          {" "}
          {/* Ensure consistent layout if it's in a grid */}
          <NetworkError
            onRetry={retryFetchData}
            title="Failed to Load Your Referrals"
            message="We couldn't fetch your referrals right now. Please check your connection and try again."
          />
        </div>
      )}

      {isLoading && !networkError && <div className="text-center py-10">Loading referrals...</div>}

      {!isLoading && !networkError && referrals.length === 0 && (
        <div className="text-center py-10">No referrals found.</div>
      )}

      {!isLoading && !networkError && referrals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {referrals.map((referral) => (
            <div key={referral.id} className="bg-white shadow rounded-lg p-4">
              <p>
                <strong>Email:</strong> {referral.referredEmail}
              </p>
              <p>
                <strong>Status:</strong> {referral.status}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(referral.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyReferralsPage
