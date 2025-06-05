import { type NextRequest, NextResponse } from "next/server"
// import { decrypt } from "@/app/lib/session" // Temporarily commented out
// import { cookies } from "next/headers" // Temporarily commented out

// TEMPORARY: Mock value for previewing UI
const MOCK_SESSION_EXISTS_IN_MIDDLEWARE = true // Set to false to simulate no session cookie

const protectedRoutes = [
  "/dashboard",
  "/marketplace",
  "/my-referrals",
  "/referrals",
  "/earnings",
  "/messages",
  "/notifications",
  "/profile",
  "/provider-dashboard",
  "/settings",
]
const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/"]

export default async function middleware(req: NextRequest) {
  console.warn("TEMPORARY: Middleware authentication checks are bypassed for UI preview.")
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix))
  const isPublicRoute = publicRoutes.includes(path)

  // TEMPORARY: Bypass all session decryption and auth logic in middleware
  // const cookie = cookies().get("session")?.value
  // const session = await decrypt(cookie) // This would be { userId: MOCK_USER_ID } or null based on MOCK_SESSION_EXISTS_IN_MIDDLEWARE if decrypt was active

  // Mock session based on a constant for middleware decision making if needed
  const mockSessionInMiddleware = MOCK_SESSION_EXISTS_IN_MIDDLEWARE ? { userId: "mockUserIdMiddleware" } : null

  // if (isProtectedRoute && !session?.userId) { // Original condition
  if (isProtectedRoute && !mockSessionInMiddleware?.userId) {
    // If you want to test the redirect for unauthenticated users on protected routes:
    // return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
    // For now, allowing access to preview UI:
    console.warn(`TEMPORARY: Allowing access to protected route ${path} without auth.`)
  }

  // if ( // Original condition
  //   isPublicRoute &&
  //   session?.userId &&
  //   (path.startsWith("/auth/login") || path.startsWith("/auth/signup"))
  // ) {
  if (
    isPublicRoute &&
    mockSessionInMiddleware?.userId &&
    (path.startsWith("/auth/login") || path.startsWith("/auth/signup"))
  ) {
    // If you want to test the redirect for authenticated users on login/signup:
    // return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    // For now, allowing access to preview UI:
    console.warn(`TEMPORARY: Allowing access to public auth route ${path} even if 'authenticated'.`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|favicon.ico).*)"],
}
