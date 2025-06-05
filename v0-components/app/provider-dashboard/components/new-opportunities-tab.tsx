// app/provider-dashboard/components/new-opportunities-tab.tsx
"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ReferralOpportunityCard } from "./referral-opportunity-card"
import type { ReferralOpportunity } from "../types"
import { Search, X, Briefcase } from "lucide-react"
import { differenceInSeconds, parseISO } from "date-fns"

interface NewOpportunitiesTabProps {
  opportunities: ReferralOpportunity[]
  serviceTypes: string[]
  locations: string[]
  priceRanges: string[]
  onQuickBuy: (opportunityId: string) => void
}

export function NewOpportunitiesTab({
  opportunities,
  serviceTypes,
  locations,
  priceRanges,
  onQuickBuy,
}: NewOpportunitiesTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServiceType, setSelectedServiceType] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")

  const parsePriceRange = (range: string): [number, number] => {
    if (range === "All") return [0, Number.POSITIVE_INFINITY]
    if (range.includes("+")) return [Number.parseInt(range.replace("$", "").replace("+", "")), Number.POSITIVE_INFINITY]
    const parts = range.replace(/\$/g, "").split("-")
    return [Number.parseInt(parts[0]), Number.parseInt(parts[1])]
  }

  const filteredOpportunities = opportunities.filter((opp) => {
    const [minPrice, maxPrice] = parsePriceRange(selectedPriceRange)
    const feeMatch = opp.fee >= minPrice && opp.fee <= maxPrice
    const serviceMatch =
      selectedServiceType === "All" || opp.serviceType.toLowerCase().includes(selectedServiceType.toLowerCase())
    const locationMatch =
      selectedLocation === "All" || opp.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const searchMatch =
      searchTerm === "" ||
      opp.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opp.description && opp.description.toLowerCase().includes(searchTerm.toLowerCase()))

    return feeMatch && serviceMatch && locationMatch && searchMatch && formatTimeLeft(opp.expiresAt) !== "Expired"
  })

  // Helper for card key in filter, not used in filter logic for time
  function formatTimeLeft(expiresAtISO: string): string {
    const expiresDate = parseISO(expiresAtISO)
    const now = new Date()
    const diffSeconds = differenceInSeconds(expiresDate, now)
    if (diffSeconds <= 0) return "Expired"
    return "Active" // Simplified for filtering
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedServiceType("All")
    setSelectedLocation("All")
    setSelectedPriceRange("All")
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="p-4 border border-border rounded-lg bg-card shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by keyword, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedServiceType} onValueChange={setSelectedServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Fee Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={resetFilters}
          variant="ghost"
          size="sm"
          className="mt-3 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="h-3 w-3 mr-1" /> Reset Filters
        </Button>
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOpportunities.map((opp) => (
            <ReferralOpportunityCard key={opp.id} opportunity={opp} onQuickBuy={onQuickBuy} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-2 text-lg font-medium text-muted-foreground">No Matching Opportunities</h3>
          <p className="mt-1 text-sm text-muted-foreground/80">
            Try adjusting your filters or check back later for new referrals.
          </p>
        </div>
      )}
    </div>
  )
}
