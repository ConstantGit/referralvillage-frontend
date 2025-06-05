"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrustScore } from "@/components/trust-score"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Heart,
  MessageSquare,
  Briefcase,
  Wrench,
  HomeIcon,
  Zap,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Clock,
  TrendingUp,
  CheckCircle2,
  Award,
  CalendarDays,
} from "lucide-react"

import { Breadcrumbs, generateBreadcrumbsFromPath } from "@/components/breadcrumbs"
import { usePathname } from "next/navigation"

// Mock data for a provider
const mockProviderData = {
  id: "austin-plumbing-pro",
  name: "Austin Plumbing Pro",
  logoUrl: "/plumber-logo.png",
  tagline: "Your trusted local plumbing experts.",
  contact: {
    phone: "(512) 555-1234",
    email: "contact@austinplumbing.pro",
    website: "www.austinplumbing.pro",
  },
  location: "Austin, TX & Surrounding Areas",
  services: ["Emergency Plumbing", "Pipe Repair", "Drain Cleaning", "Water Heater Installation", "Fixture Replacement"],
  specialties: ["Residential Plumbing", "24/7 Emergency Service"],
  about:
    "Austin Plumbing Pro has been serving the Austin community for over 15 years. We pride ourselves on providing fast, reliable, and affordable plumbing solutions. Our team of certified plumbers is equipped to handle any job, big or small, with professionalism and care.",
  trustScoreData: {
    score: 4.9,
    totalReferrals: 234,
    qualityRate: 97,
  },
  customerReviews: [
    { rating: 5, comment: "Fast service and fixed my leak in no time!", author: "Jane D." },
    { rating: 5, comment: "Very professional and reasonably priced. Highly recommend.", author: "Mike S." },
  ],
  portfolioImages: [
    "/placeholder-9kz0o.png",
    "/kitchen-sink-installation.png",
    "/water-heater-setup.png",
    "/pipe-repair.png",
  ],
  memberSince: "2022-08-15",
  verified: true,
  averageResponseTime: "Within 1 hour",
  performanceHistory: {
    referralsCompleted: 234,
    acceptanceRate: 92,
    avgCompletionTime: "2.5 hours",
    customerSatisfactionTrend: [88, 90, 95, 94, 97],
    recentAchievements: [
      { date: "2024-05-15", description: "Completed 50 referrals in a single month." },
      { date: "2024-03-20", description: "Received 'Top Performer' badge for Q1." },
      { date: "2023-12-01", description: "Achieved 100% customer satisfaction for November." },
    ],
    monthlyPerformance: [
      { month: "January 2024", referrals: 18, satisfaction: 95 },
      { month: "February 2024", referrals: 22, satisfaction: 96 },
      { month: "March 2024", referrals: 25, satisfaction: 98 },
      { month: "April 2024", referrals: 20, satisfaction: 94 },
    ],
  },
}

const serviceIconsMap: { [key: string]: React.ElementType } = {
  plumbing: Wrench,
  roofing: HomeIcon,
  electrical: Zap,
  hvac: Settings2,
  default: Briefcase,
}

const generateSparklinePath = (data: number[], width: number, height: number): string => {
  if (!data || data.length < 2) return ""
  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1

  let path = `M 0 ${height - ((data[0] - minVal) / range) * height}`
  for (let i = 1; i < data.length; i++) {
    const x = (i / (data.length - 1)) * width
    const y = height - ((data[i] - minVal) / range) * height
    path += ` L ${x} ${y}`
  }
  return path
}

export default function ProviderProfilePage({ params }: { params: { providerId: string } }) {
  const [provider] = useState(mockProviderData)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const pathname = usePathname()
  const breadcrumbItems = generateBreadcrumbsFromPath(pathname)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % provider.portfolioImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + provider.portfolioImages.length) % provider.portfolioImages.length,
    )
  }

  if (!provider) {
    return <div>Provider not found.</div>
  }

  const sparklinePath = generateSparklinePath(provider.performanceHistory.customerSatisfactionTrend, 100, 30)

  return (
    <div className="min-h-screen bg-gray-50 lg:pl-0">
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        <Breadcrumbs items={breadcrumbItems} />
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 md:mb-0 border-2 border-purple-200">
                <AvatarImage src={provider.logoUrl || "/placeholder.svg"} alt={provider.name} />
                <AvatarFallback>
                  {provider.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="text-heading-2xl text-gray-900">{provider.name}</h1>
                  <Button
                    variant={isFavorited ? "default" : "outline"}
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`mt-2 sm:mt-0 ${isFavorited ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-white" : ""}`} />
                    {isFavorited ? "Favorited" : "Add to Favorites"}
                  </Button>
                </div>
                <p className="text-body-md text-muted mt-1">{provider.tagline}</p>
                {provider.verified && <Badge className="mt-2 bg-green-100 text-green-700">Verified Provider</Badge>}
                <div className="mt-3">
                  <TrustScore
                    score={provider.trustScoreData.score}
                    totalReferrals={provider.trustScoreData.totalReferrals}
                    qualityRate={provider.trustScoreData.qualityRate}
                  />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-body-md">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span>{provider.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-600" />
                <a href={`tel:${provider.contact.phone}`} className="hover:underline">
                  {provider.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-600" />
                <a href={`mailto:${provider.contact.email}`} className="hover:underline">
                  {provider.contact.email}
                </a>
              </div>
              {provider.contact.website && (
                <div className="flex items-center space-x-2 md:col-span-1">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <a
                    href={`http://${provider.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {provider.contact.website}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>Avg. Response: {provider.averageResponseTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-purple-500" />
                <span>Member Since: {new Date(provider.memberSince).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
                <MessageSquare className="h-4 w-4 mr-2" /> Send Message
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Request a Quote
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-lg">About {provider.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-md whitespace-pre-line">{provider.about}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-lg">Services Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {provider.services.map((service) => {
                const ServiceIcon = serviceIconsMap[service.split(" ")[0].toLowerCase()] || serviceIconsMap.default
                return (
                  <div key={service} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                    <ServiceIcon className="h-5 w-5 text-purple-500" />
                    <span className="text-body-md">{service}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-lg">Specialties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {provider.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="mr-2 mb-2 px-3 py-1 text-body-md">
                  {specialty}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-heading-lg">
              <TrendingUp className="h-6 w-6 mr-2 text-purple-600" />
              Performance Overview
            </CardTitle>
            <CardDescription className="text-body-md text-muted">Key metrics and recent achievements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-heading-xl text-purple-700">{provider.performanceHistory.referralsCompleted}</p>
                <p className="text-body-sm text-muted">Referrals Done</p>
              </div>
              <div>
                <p className="text-heading-xl text-purple-700">{provider.performanceHistory.acceptanceRate}%</p>
                <p className="text-body-sm text-muted">Acceptance Rate</p>
              </div>
              <div>
                <p className="text-heading-xl text-purple-700">{provider.performanceHistory.avgCompletionTime}</p>
                <p className="text-body-sm text-muted">Avg. Job Time</p>
              </div>
              <div>
                <div className="flex flex-col items-center">
                  <p className="text-heading-xl text-purple-700">
                    {provider.performanceHistory.customerSatisfactionTrend.slice(-1)[0]}%
                  </p>
                  <p className="text-body-sm text-muted mb-1">Satisfaction</p>
                  <svg viewBox="0 0 100 30" width="100" height="30" className="overflow-visible">
                    <path d={sparklinePath} stroke="rgb(129 140 248)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-heading-md mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Recent Achievements
              </h4>
              <ul className="space-y-2">
                {provider.performanceHistory.recentAchievements.map((ach, index) => (
                  <li key={index} className="flex items-start space-x-2 text-body-md">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>
                      <span className="font-medium">{ach.description}</span>
                      <span className="text-muted ml-1">({new Date(ach.date).toLocaleDateString()})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="text-heading-md mb-3 flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
                Monthly Snapshot (Last 4 Months)
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-body-sm">Month</TableHead>
                    <TableHead className="text-right text-body-sm">Referrals</TableHead>
                    <TableHead className="text-right text-body-sm">Satisfaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provider.performanceHistory.monthlyPerformance.map((perf) => (
                    <TableRow key={perf.month}>
                      <TableCell className="font-medium text-body-md">{perf.month}</TableCell>
                      <TableCell className="text-right text-body-md">{perf.referrals}</TableCell>
                      <TableCell className="text-right text-body-md">
                        <div className="flex items-center justify-end">
                          <span className="mr-2">{perf.satisfaction}%</span>
                          <Progress
                            value={perf.satisfaction}
                            className="w-20 h-2"
                            indicatorClassName={perf.satisfaction > 90 ? "bg-green-500" : "bg-yellow-500"}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-lg">Portfolio / Examples of Work</CardTitle>
          </CardHeader>
          <CardContent>
            {provider.portfolioImages.length > 0 ? (
              <div className="relative">
                <img
                  src={provider.portfolioImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Work example ${currentImageIndex + 1}`}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                />
                {provider.portfolioImages.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                      {provider.portfolioImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"}`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-body-md text-muted">No portfolio images available yet.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-lg">Customer Reviews</CardTitle>
            <CardDescription className="text-body-md text-muted">
              What others are saying about {provider.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {provider.customerReviews.length > 0 ? (
              provider.customerReviews.map((review, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-body-md italic">"{review.comment}"</p>
                  <p className="text-body-sm text-muted mt-1 text-right">- {review.author}</p>
                </div>
              ))
            ) : (
              <p className="text-body-md text-muted">No reviews yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
