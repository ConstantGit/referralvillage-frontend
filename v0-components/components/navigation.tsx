"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Plus, MessageSquare, DollarSign, User, Search, Bell, Menu, X, ListChecks } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggleButton } from "./theme-toggle-button" // Import the new component

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Referrals", href: "/my-referrals", icon: ListChecks },
  { name: "Create", href: "/referrals/create", icon: Plus },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Earnings", href: "/earnings", icon: DollarSign },
  { name: "Profile", href: "/profile", icon: User },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:fixed lg:inset-y-0 lg:z-50 lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r border-border bg-card px-4 pb-3 shadow-sm">
          {" "}
          {/* Use bg-card and border-border */}
          <div className="flex h-14 shrink-0 items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">RV</span>
              </div>
              <span className="text-xl font-bold text-card-foreground">ReferralVillage</span>{" "}
              {/* Use text-card-foreground */}
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="-mx-1.5 space-y-0.5">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            isActive
                              ? "bg-primary/10 text-primary" // Adjusted active state for better theme compatibility
                              : "text-muted-foreground hover:text-primary hover:bg-primary/5", // Adjusted default/hover
                            "group flex gap-x-2 rounded-md p-1.5 text-sm leading-5 font-semibold",
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                              "h-6 w-6 shrink-0",
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between border-b border-border bg-card px-3 shadow-sm">
          {" "}
          {/* Use bg-card and border-border */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">RV</span>
            </div>
            <span className="text-lg font-bold text-card-foreground">ReferralVillage</span>{" "}
            {/* Use text-card-foreground */}
          </Link>
          <div className="flex items-center space-x-1">
            {" "}
            {/* Reduced space for more icons */}
            <ThemeToggleButton />
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="px-2">
                <Bell className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="px-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card">
          {" "}
          {/* Use bg-card and border-border, z-40 to be below mobile menu overlay */}
          <div className="grid grid-cols-5 py-1.5">
            {navigation
              .filter((item) => ["Dashboard", "My Referrals", "Create", "Messages", "Profile"].includes(item.name))
              .slice(0, 5)
              .map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center py-1 px-0.5",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4 mb-0.5" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80" onClick={() => setMobileMenuOpen(false)} />{" "}
          {/* Adjusted overlay color */}
          <div className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-card px-6 py-6 sm:max-w-sm">
            {" "}
            {/* Use bg-card, higher z-index */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-card-foreground">Menu</span> {/* Use text-card-foreground */}
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium",
                        pathname.startsWith(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <div className="text-xs font-semibold uppercase text-muted-foreground/70 mb-1 px-3">Theme</div>
                  <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary">
                    <span>Switch Theme</span>
                    <ThemeToggleButton />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop content offset & Header */}
      <div className="lg:pl-72">
        {" "}
        {/* This div is for content offset by desktop nav */}
        <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4 shadow-sm lg:px-6">
          {" "}
          {/* Use bg-card and border-border */}
          <div className="flex items-center gap-x-4">
            {/* Mobile menu trigger for when sidebar is collapsible, not used in current fixed sidebar setup */}
            {/* <Button variant="ghost" size="icon" className="lg:hidden -ml-2">
              <Menu className="h-5 w-5" />
            </Button> */}
            {/* Separator */}
            {/* <div className="hidden h-6 w-px bg-gray-900/10 lg:block" /> */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search referrals..."
                className="pl-9 pr-3 py-1.5 border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background lg:w-80" // Use bg-background for input
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggleButton />
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="px-2">
                <Bell className="h-5 w-5" />
                <Badge className="ml-1 bg-orange-500 text-white">3</Badge> {/* Mock badge */}
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-foreground">John Doe</span> {/* Use text-foreground */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
