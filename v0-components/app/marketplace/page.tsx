"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Removed Input and Select imports as GlobalSearch will handle this
import { TrustScore } from "@/components/trust-score"
import { MapPin, Clock, Wrench, HomeIcon, AlertTriangle, Star, SearchSlash } from "lucide-react"
import { FastCheckout } from "@/components/fast-checkout"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Import GlobalSearch
import { GlobalSearch } from "@/components/global-search/global-search"
import type { SearchFilters, SearchResultItem } from "@/components/global-search/types" // Import types

// Import EmptyState
import { EmptyState } from "@/components/empty-state"

// Import NetworkError
import { NetworkError } from "@/components/network-error"

// Mock data for referrals (can be adapted from your existing allReferralsData)
const allReferralsData = [
  {
    id: "ref1",
    type: "referral",
    title: "Emergency Plumbing Repair",
    serviceType: "plumbing",
    location: "Downtown Austin, TX",
    fee: 150,
    timeLeftValue: 23.75,
    timeLeft: "23h 45m",
    isUrgent: true,
    isNew: false,
    agent: {
      name: "John Davis",
      company: "Keller Williams",
      trustScore: 4.8,
      totalReferrals: 156,
    },
    description: "Kitchen sink completely backed up, needs immediate attention",
    icon: Wrench,
    color: "text-blue-600 dark:text-blue-400",
    createdAt: new Date("2025-06-02T10:00:00Z"),
    tags: ["plumbing", "urgent", "kitchen"],
  },
  {
    id: "ref2",
    type: "referral",
    title: "Roof Inspection & Repair",
    serviceType: "roofing",
    location: "Cedar Park, TX",
    fee: 100,
    timeLeftValue: 60,
    timeLeft: "2d 12h",
    isUrgent: false,
    isNew: true,
    agent: {
      name: "Sarah Mitchell",
      company: "RE/MAX",
      trustScore: 4.6,
      totalReferrals: 89,
    },
    description: "Post-storm roof inspection needed, potential leak issues",
    icon: HomeIcon,
    color: "text-red-600 dark:text-red-400",
    createdAt: new Date("2025-06-03T09:00:00Z"),
    tags: ["roofing", "inspection", "leak"],
  },
  // ... more referral data
] as SearchResultItem[] // Cast to SearchResultItem for compatibility

export default function MarketplacePage() {
  const REFERRALS_PER_PAGE = 4
  // States for GlobalSearch integration
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    availableNow: false,
    topRated: false,
    nearMe: false,
    serviceType: "all",
    priceRange: [0, 500], // Default price range
  })
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>(allReferralsData.slice(0, REFERRALS_PER_PAGE))

  // Existing states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedReferralForCheckout, setSelectedReferralForCheckout] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([]) // Changed to string for id
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [showNotesInput, setShowNotesInput] = useState<string | null>(null)
  const [currentNote, setCurrentNote] = useState("")
  const [networkError, setNetworkError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Memoized filtered and sorted referrals based on GlobalSearch outputs
  const filteredAndSortedReferrals = useMemo(() => {
    let result = allReferralsData.filter((item) => item.type === "referral") as any[] // Filter only referrals for this page

    // Apply search query (simplified for this example)
    if (searchQuery) {
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (r.agent && r.agent.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (r.tags && r.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
    }

    // Apply filters (simplified)
    if (searchFilters.serviceType !== "all") {
      result = result.filter((r) => r.serviceType === searchFilters.serviceType)
    }
    if (searchFilters.priceRange) {
      result = result.filter((r) => r.fee >= searchFilters.priceRange![0] && r.fee <= searchFilters.priceRange![1])
    }
    // Add more filter logic for availableNow, topRated, nearMe if data supports it

    // For this page, we might not need additional sorting if GlobalSearch handles it,
    // or we can apply specific marketplace sorting.
    result = result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // Default sort: newest

    return result
  }, [searchQuery, searchFilters])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setNetworkError(false)
      await new Promise((resolve) => setTimeout(resolve, 500)) // Shorter delay for search updates
      if (Math.random() < 0.05 && searchQuery) {
        // Simulate error less frequently
        setNetworkError(true)
        setSearchResults([])
      } else {
        setSearchResults(filteredAndSortedReferrals.slice(0, REFERRALS_PER_PAGE))
        setCurrentPage(1)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [filteredAndSortedReferrals]) // Re-fetch when filters or query change

  const retryFetchData = () => {
    setIsLoading(true)
    setNetworkError(false)
    setTimeout(() => {
      if (Math.random() < 0.1) {
        setNetworkError(true)
        setSearchResults([])
      } else {
        setSearchResults(filteredAndSortedReferrals.slice(0, REFERRALS_PER_PAGE))
        setCurrentPage(1)
      }
      setIsLoading(false)
    }, 1000)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote(e.target.value)
  }

  const saveNote = (id: string) => {
    setNotes((prev) => ({ ...prev, [id]: currentNote }))
    setShowNotesInput(null)
    setCurrentNote("")
  }

  const openNotesInput = (id: string) => {
    setShowNotesInput(id)
    setCurrentNote(notes[id] || "")
  }

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      const nextPage = currentPage + 1
      const newReferralsToDisplay = filteredAndSortedReferrals.slice(0, nextPage * REFERRALS_PER_PAGE)
      setSearchResults(newReferralsToDisplay)
      setCurrentPage(nextPage)
      setIsLoadingMore(false)
    }, 1000)
  }

  const hasMoreReferrals = searchResults.length < filteredAndSortedReferrals.length

  // Handler for GlobalSearch updates
  const handleSearchUpdate = (query: string, filters: SearchFilters) => {
    setSearchQuery(query)
    setSearchFilters(filters)
    // The useEffect for filteredAndSortedReferrals will handle updating the results
  }

  const handleClearFilters = () => {
    // This function should ideally be passed to GlobalSearch or GlobalSearch should have its own clear
    handleSearchUpdate("", {
      availableNow: false,
      topRated: false,
      nearMe: false,
      serviceType: "all",
      priceRange: [0, 500],
    })
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background lg:pl-0">
        <div className="max-w-7xl mx-auto p-3 md:p-4 space-y-4">
          <div className="text-center py-4">
            <h1 className="text-heading-2xl text-foreground mb-2">Referral Marketplace</h1>
            <p className="text-body-lg text-muted-foreground">Find quality referrals from trusted real estate agents</p>
            <div className="mt-4 flex justify-center">
              <div className="bg-card rounded-lg px-4 py-2 shadow-sm border">
                <span className="text-body-sm text-muted-foreground mr-2">Your Provider Score:</span>
                <TrustScore score={4.7} totalReferrals={89} qualityRate={96} size="sm" />
              </div>
            </div>
          </div>

          {/* GlobalSearch Integration */}
          <GlobalSearch
            onSearchUpdate={handleSearchUpdate}
            initialQuery=""
            initialFilters={searchFilters}
            // Pass available service types and locations for filter dropdowns
            availableServiceTypes={[
              { value: "all", label: "All Services" },
              { value: "plumbing", label: "Plumbing" },
              { value: "roofing", label: "Roofing" },
              // ... more
            ]}
            // availableLocations (if needed for 'Near Me' or location filter)
          />

          {networkError && !isLoading && (
            <div className="col-span-full py-10">
              <NetworkError
                onRetry={retryFetchData}
                title="Failed to Load Referrals"
                message="We couldn't fetch the referrals at this time. Please check your connection and try again."
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading && searchResults.length === 0 && !networkError
              ? Array.from({ length: REFERRALS_PER_PAGE }).map((_, index) => (
                  <SkeletonLoader key={index} type="card" className="h-[420px]" />
                ))
              : !networkError && searchResults.length > 0
                ? searchResults.map((item) => {
                    // Assuming item is a referral for this page
                    const referral = item as any
                    return (
                      <Card key={referral.id} className="hover:shadow-lg transition-shadow flex flex-col bg-card">
                        <CardHeader className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-muted/50 dark:bg-muted/30 rounded-lg">
                                <referral.icon className={`h-6 w-6 ${referral.color}`} />
                              </div>
                              <div>
                                <CardTitle className="text-heading-md text-card-foreground">{referral.title}</CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-body-sm text-muted-foreground">{referral.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              {referral.isNew && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400 text-body-xs">
                                  New
                                </Badge>
                              )}
                              {referral.isUrgent && (
                                <Badge variant="destructive" className="flex items-center space-x-1 text-body-xs">
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>Urgent</span>
                                </Badge>
                              )}
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`hover:text-yellow-500 ${favorites.includes(referral.id) ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" : "text-muted-foreground dark:hover:text-yellow-400"}`}
                                    onClick={() => toggleFavorite(referral.id)}
                                  >
                                    <Star className="h-5 w-5" />
                                    <span className="sr-only">
                                      {favorites.includes(referral.id) ? "Remove from favorites" : "Add to favorites"}
                                    </span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {favorites.includes(referral.id) ? "Remove from favorites" : "Add to favorites"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 p-3 flex-grow flex flex-col">
                          <p className="text-body-md text-muted-foreground flex-grow">{referral.description}</p>
                          <div className="flex items-center justify-between p-2 bg-muted/50 dark:bg-muted/30 rounded-md">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary text-body-sm font-medium">
                                  {referral.agent.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-body-md text-foreground">{referral.agent.name}</p>
                                <p className="text-body-xs text-muted-foreground">{referral.agent.company}</p>
                              </div>
                            </div>
                            <Tooltip>
                              <TooltipTrigger>
                                <TrustScore
                                  score={referral.agent.trustScore}
                                  totalReferrals={referral.agent.totalReferrals}
                                  qualityRate={94}
                                  size="sm"
                                  showDetails={false}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {referral.agent.name}'s Trust Score: {referral.agent.trustScore.toFixed(1)}
                                </p>
                                <p>{referral.agent.totalReferrals} referrals completed.</p>
                                <p>94% referral quality rate.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-heading-lg text-primary">${referral.fee}</div>
                              <p className="text-body-sm text-muted-foreground">Referral Fee</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium text-body-md">{referral.timeLeft}</span>
                              </div>
                              <p className="text-body-sm text-muted-foreground">remaining</p>
                            </div>
                          </div>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-primary-hover"
                            size="lg"
                            onClick={() => {
                              setSelectedReferralForCheckout(referral)
                              setIsCheckoutOpen(true)
                            }}
                          >
                            Buy Now - ${referral.fee}
                          </Button>
                          <div className="mt-auto pt-3 border-t">
                            {showNotesInput === referral.id ? (
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`note-${referral.id}`}
                                  className="text-body-sm font-medium text-foreground"
                                >
                                  Private Note
                                </Label>
                                <Textarea
                                  id={`note-${referral.id}`}
                                  value={currentNote}
                                  onChange={handleNoteChange}
                                  placeholder="Add a private note for this referral/provider..."
                                  rows={2}
                                  className="text-body-md bg-background placeholder:text-muted-foreground"
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="xs" onClick={() => setShowNotesInput(null)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    size="xs"
                                    onClick={() => saveNote(referral.id)}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground btn-primary-hover"
                                  >
                                    Save Note
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <p className="text-body-sm text-muted-foreground italic truncate max-w-[calc(100%-100px)]">
                                  {notes[referral.id] ? `Note: ${notes[referral.id]}` : "No private notes yet."}
                                </p>
                                <Button variant="outline" size="sm" onClick={() => openNotesInput(referral.id)}>
                                  {notes[referral.id] ? "Edit Note" : "Add Note"}
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                : !isLoading && (
                    <div className="col-span-full py-10">
                      <EmptyState
                        icon={<SearchSlash className="h-16 w-16 text-primary/70" />}
                        title="No Referrals Found"
                        description="No referrals match your current filters. Try adjusting your search or filter criteria."
                        actionButton={
                          <Button variant="outline" onClick={handleClearFilters}>
                            Clear Filters
                          </Button>
                        }
                      />
                    </div>
                  )}
            {isLoadingMore &&
              Array.from({ length: 2 }).map((_, index) => (
                <SkeletonLoader key={`loading-more-${index}`} type="card" className="h-[420px]" />
              ))}
          </div>

          {!isLoading && hasMoreReferrals && (
            <div className="text-center py-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="btn-primary-hover"
              >
                {isLoadingMore ? "Loading..." : "Load More Referrals"}
              </Button>
            </div>
          )}
        </div>
        {selectedReferralForCheckout && (
          <FastCheckout
            isOpen={isCheckoutOpen}
            onOpenChange={setIsCheckoutOpen}
            referral={selectedReferralForCheckout}
          />
        )}
      </div>
    </TooltipProvider>
  )
}
