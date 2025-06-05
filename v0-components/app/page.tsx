import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getSession } from "@/app/lib/session" // This will now use the mocked version
import { ArrowRight, LogIn, UserPlus, LayoutDashboard } from "lucide-react"

export default async function HomePage() {
  const session = await getSession() // Will receive mock data

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-bold text-lg">ReferralVillage</span>
          </Link>
          <nav className="flex items-center space-x-2">
            {session?.isAuth ? (
              <Button asChild variant="ghost">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Welcome to</span>
              <span className="block text-primary">ReferralVillage</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl md:text-2xl">
              The trusted platform for connecting service providers and customers through warm referrals. Grow your
              business, find reliable services.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              {session?.isAuth ? (
                <Button size="lg" asChild className="group">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild className="group">
                    <Link href="/auth/signup">
                      Get Started
                      <UserPlus className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="group">
                    <Link href="/auth/login">
                      Sign In
                      <LogIn className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background/70">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-card rounded-lg shadow-lg">
                <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sign Up & Connect</h3>
                <p className="text-muted-foreground">
                  Join our network as a customer or service provider. Build your profile and connect with others.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary mx-auto mb-4"
                >
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  <path d="M12 20h4" />
                  <path d="M12 4H8" />
                  <path d="M12 12h8" />
                  <path d="M12 8h6" />
                  <path d="M12 16h6" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Give & Get Referrals</h3>
                <p className="text-muted-foreground">
                  Easily refer trusted providers or find services based on recommendations from your network.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary mx-auto mb-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Build Trust & Grow</h3>
                <p className="text-muted-foreground">
                  Increase your Trust Score, gain visibility, and expand your business or find reliable help.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/40 bg-background/95">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ReferralVillage. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
