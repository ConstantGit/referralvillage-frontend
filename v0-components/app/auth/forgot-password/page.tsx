"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast({
      title: "Password Reset Email Sent",
      description: "If an account exists for this email, you will receive reset instructions.",
    })
    // router.push("/auth/login") // Optionally redirect or show a success message on the page
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center mb-4">
            <Send className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-heading-xl">Forgot Password?</CardTitle>
          <CardDescription className="text-body-md text-muted">
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-body-md font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 py-1.5 px-2.5 text-sm"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-body-md text-muted">
            Remember your password?{" "}
            <Link href="/auth/login" legacyBehavior>
              <a className="font-medium text-purple-600 hover:underline">Sign in</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
