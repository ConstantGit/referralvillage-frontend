"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const HIDDEN_PATHS = ["/referrals/create", "/auth/login", "/auth/signup", "/auth/forgot-password"]

export function FloatingActionButton() {
  const pathname = usePathname()

  if (HIDDEN_PATHS.some((path) => pathname.startsWith(path))) {
    return null
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            className={cn(
              "fixed bottom-20 right-4 lg:bottom-18 lg:right-6", // Adjusted for CommandPalette
              "h-14 w-14 rounded-full p-0 shadow-lg",
              "bg-purple-600 hover:bg-purple-700 text-white",
              "z-40", // Ensure it's above most content but below modals/dialogs (z-50)
            )}
            aria-label="Create new referral"
          >
            <Link href="/referrals/create">
              <Plus className="h-7 w-7" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-800 text-white border-gray-800">
          <p>Create Referral</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
