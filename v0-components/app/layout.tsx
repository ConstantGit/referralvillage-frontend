import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { CommandPalette } from "@/components/command-palette"
import { FloatingActionButton } from "@/components/floating-action-button"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReferralVillage - Connect Agents & Service Providers",
  description: "Platform where real estate agents create referrals and get paid by service providers",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        {" "}
        {/* Apply base bg/text to body */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* The main div wrapper is no longer strictly needed for bg/text if body has it, but can remain for structure */}
          <div className="min-h-screen">
            <Navigation />
            <main className="pb-16 lg:pb-0 lg:pl-72">{children}</main>
          </div>
          <Toaster />
          <CommandPalette />
          <FloatingActionButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
