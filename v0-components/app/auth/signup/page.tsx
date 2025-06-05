"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Mail, Lock, UserPlus, Eye, EyeOff, AlertCircle, UserCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Placeholder for social icons
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
)
const GithubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-5 w-5 mr-2 fill-current">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

type SignupFormData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreedToTerms: boolean
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    },
  })

  const passwordValue = watch("password")

  const getPasswordStrength = (password: string) => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/)) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++ // Special character
    return strength
  }

  const passwordStrength = getPasswordStrength(passwordValue)
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"]
  const strengthText = ["Very Weak", "Weak", "Okay", "Good", "Strong"]

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast({
      title: "Account Created!",
      description: `Welcome, ${data.fullName}! Please check your email to verify your account.`,
    })
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center mb-4">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-heading-xl">Create an Account</CardTitle>
          <CardDescription className="text-body-md text-muted">
            Join ReferralVillage and start connecting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-body-md font-medium">
                Full Name
              </Label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <UserCircle2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input {...field} id="fullName" placeholder="John Doe" className="pl-10 py-1.5 px-2.5 text-sm" />
                  </div>
                )}
              />
              {errors.fullName && (
                <p className="text-body-sm text-red-500 flex items-center pt-1">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-body-md font-medium">
                Email
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 py-1.5 px-2.5 text-sm"
                    />
                  </div>
                )}
              />
              {errors.email && (
                <p className="text-body-sm text-red-500 flex items-center pt-1">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-body-md font-medium">
                Password
              </Label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                }}
                render={({ field }) => (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 py-1.5 px-2.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              />
              {passwordValue && passwordValue.length > 0 && (
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ease-in-out ${strengthColors[passwordStrength - 1] || "bg-gray-200"}`}
                      style={{ width: `${passwordStrength * 20}%` }}
                      aria-label={`Password strength: ${strengthText[passwordStrength - 1] || "Very Weak"}`}
                    />
                  </div>
                  <span className="text-body-sm text-muted">{strengthText[passwordStrength - 1] || ""}</span>
                </div>
              )}
              {errors.password && (
                <p className="text-body-sm text-red-500 flex items-center pt-1">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-body-md font-medium">
                Confirm Password
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) => value === passwordValue || "Passwords do not match",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="py-1.5 px-2.5 text-sm"
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-body-sm text-red-500 flex items-center pt-1">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Controller
                name="agreedToTerms"
                control={control}
                rules={{ required: "You must agree to the terms and conditions" }}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                    aria-invalid={errors.agreedToTerms ? "true" : "false"}
                  />
                )}
              />
              <Label htmlFor="terms" className="text-body-md font-medium">
                I agree to the{" "}
                <Link href="/terms" legacyBehavior>
                  <a className="font-medium text-purple-700 hover:underline">Terms of Service</a>
                </Link>{" "}
                and{" "}
                <Link href="/privacy" legacyBehavior>
                  <a className="font-medium text-purple-700 hover:underline">Privacy Policy</a>
                </Link>
                .
              </Label>
            </div>
            {errors.agreedToTerms && (
              <p className="text-body-sm text-red-500 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> {errors.agreedToTerms.message}
              </p>
            )}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <Separator className="my-6" />
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon /> Sign up with Google
            </Button>
            <Button variant="outline" className="w-full">
              <GithubIcon /> Sign up with GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-body-md text-muted">
            Already have an account?{" "}
            <Link href="/auth/login" legacyBehavior>
              <a className="font-medium text-purple-700 hover:underline">Sign in</a>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
