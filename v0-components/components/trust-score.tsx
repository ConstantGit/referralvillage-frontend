import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustScoreProps {
  score: number
  totalReferrals: number
  qualityRate: number
  size?: "sm" | "md" | "lg"
  showDetails?: boolean
}

export function TrustScore({ score, totalReferrals, qualityRate, size = "md", showDetails = true }: TrustScoreProps) {
  const getScoreColorClasses = (score: number) => {
    if (score >= 4.5) {
      return "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/50 dark:text-green-400"
    }
    if (score >= 3.5) {
      return "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400"
    }
    return "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/50 dark:text-red-400"
  }

  const sizeClasses = {
    sm: "text-body-sm px-2 py-1",
    md: "text-body-md px-3 py-1.5",
    lg: "text-body-lg px-4 py-2",
  }

  const detailTextSizeClass = size === "sm" ? "text-body-sm" : "text-body-md"

  return (
    <div className="flex items-center space-x-2">
      <Badge
        variant="outline"
        className={cn(
          "font-semibold border", // Base border class, specific border colors will override
          getScoreColorClasses(score),
          sizeClasses[size],
        )}
      >
        <Star className="h-4 w-4 mr-1 fill-current" />
        {score.toFixed(1)}
      </Badge>
      {showDetails && (
        <span className={`${detailTextSizeClass} text-muted-foreground`}>
          {totalReferrals} referrals • {qualityRate}% quality
        </span>
      )}
    </div>
  )
}
