"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

function formatPathSegment(segment: string): string {
  if (!segment) return ""
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function generateBreadcrumbsFromPath(
  pathname: string,
  customLabels: Record<string, string> = {},
): BreadcrumbItem[] {
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/dashboard", isCurrent: pathname === "/dashboard" },
  ]

  let currentPath = ""
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLastSegment = index === pathSegments.length - 1
    let label = customLabels[segment] || formatPathSegment(segment)

    if (pathSegments[index - 1] === "referrals" && segment !== "create" && segment !== "edit") {
      label = customLabels[segment] || "Referral Details"
    } else if (pathSegments[index - 1] === "providers") {
      label = customLabels[segment] || "Provider Profile"
    } else if (segment === "create" && pathSegments[index - 1] === "referrals") {
      label = "Create Referral"
    }

    breadcrumbs.push({
      label: label,
      href: currentPath,
      isCurrent: isLastSegment,
    })
  })

  if (breadcrumbs.length === 1 && pathname !== "/dashboard" && pathname !== "/") {
    const topLevelLabel = customLabels[pathSegments[0]] || formatPathSegment(pathSegments[0])
    if (topLevelLabel) {
      breadcrumbs[0].isCurrent = false
      breadcrumbs.push({ label: topLevelLabel, href: pathname, isCurrent: true })
    }
  } else if (pathname === "/dashboard") {
    return [{ label: "Dashboard", href: "/dashboard", isCurrent: true }]
  }

  return breadcrumbs
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol role="list" className="flex items-center space-x-1 text-body-md text-muted">
        <li>
          <Link
            href={items[0].href}
            className="hover:text-gray-700 flex items-center"
            aria-current={items[0].isCurrent ? "page" : undefined}
          >
            <Home className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className={cn(items[0].isCurrent && "font-semibold text-gray-700")}>{items[0].label}</span>
          </Link>
        </li>
        {items.slice(1).map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <Link
                href={item.href}
                className={cn(
                  "ml-1 hover:text-gray-700",
                  item.isCurrent && "font-semibold text-gray-700 pointer-events-none",
                )}
                aria-current={item.isCurrent ? "page" : undefined}
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
