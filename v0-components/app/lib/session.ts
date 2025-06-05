import "server-only"
import { cache } from "react"

// const secretKey = process.env.SESSION_SECRET // Temporarily commented out
// const encodedKey = new TextEncoder().encode(secretKey) // Temporarily commented out

// TEMPORARY: Mock value for previewing UI
const MOCK_AUTHENTICATED = true // Set to false to simulate logged-out user
const MOCK_USER_ID = "mockUserId123"

export async function encrypt(payload: any) {
  // TEMPORARY: Bypass encryption
  console.warn("TEMPORARY: Session encryption is bypassed for UI preview.")
  // if (!secretKey) {
  //   throw new Error("SESSION_SECRET environment variable is not set.")
  // }
  // return new SignJWT(payload)
  //   .setProtectedHeader({ alg: "HS256" })
  //   .setIssuedAt()
  //   .setExpirationTime("7d")
  //   .sign(encodedKey)
  return Promise.resolve("mockEncryptedPayload")
}

export async function decrypt(session: string | undefined = "") {
  // TEMPORARY: Bypass decryption and return mock data
  console.warn("TEMPORARY: Session decryption is bypassed for UI preview.")
  // if (!secretKey) {
  //   throw new Error("SESSION_SECRET environment variable is not set.")
  // }
  // if (!session) {
  //   return null
  // }
  // try {
  //   const { payload } = await jwtVerify(session, encodedKey, {
  //     algorithms: ["HS256"],
  //   })
  //   return payload
  // } catch (error) {
  //   console.error("Failed to decrypt session:", error)
  //   return null
  // }
  if (MOCK_AUTHENTICATED) {
    return Promise.resolve({ userId: MOCK_USER_ID, expiresAt: new Date(Date.now() + 3600 * 1000) })
  }
  return Promise.resolve(null)
}

export async function createSession(userId: string) {
  // TEMPORARY: Bypass session creation
  console.warn("TEMPORARY: Session creation is bypassed for UI preview.")
  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  // const session = await encrypt({ userId, expiresAt })

  // cookies().set("session", session, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   expires: expiresAt,
  //   sameSite: "lax",
  //   path: "/",
  // })
}

export const verifySession = cache(async () => {
  // TEMPORARY: Bypass actual verification, return mock session
  console.warn("TEMPORARY: verifySession is returning mock data for UI preview.")
  // const cookie = cookies().get("session")?.value
  // const session = await decrypt(cookie)

  // if (!session?.userId) {
  //   redirect("/auth/login") // Still might want to keep redirect logic if MOCK_AUTHENTICATED is false
  // }
  // return { isAuth: true, userId: session.userId }

  if (MOCK_AUTHENTICATED) {
    return { isAuth: true, userId: MOCK_USER_ID }
  } else {
    // If you want to test unauthenticated state for protected routes,
    // you might uncomment the redirect or handle it based on MOCK_AUTHENTICATED.
    // For now, to allow UI preview of protected pages, we'll assume auth.
    // redirect("/auth/login"); // Original redirect
    console.warn(
      "TEMPORARY: Simulating unauthenticated user for verifySession, but not redirecting to allow UI preview of protected pages.",
    )
    return { isAuth: false, userId: null } // Or throw error / redirect if you want to test that path
  }
})

export const getSession = cache(async () => {
  // TEMPORARY: Bypass actual session retrieval, return mock session
  console.warn("TEMPORARY: getSession is returning mock data for UI preview.")
  // const cookie = cookies().get("session")?.value
  // const session = await decrypt(cookie)

  // if (!session?.userId) {
  //   return null
  // }
  // return { isAuth: true, userId: session.userId }

  if (MOCK_AUTHENTICATED) {
    return { isAuth: true, userId: MOCK_USER_ID }
  }
  return null
})

export async function deleteSession() {
  // TEMPORARY: Bypass session deletion
  console.warn("TEMPORARY: Session deletion is bypassed for UI preview.")
  // cookies().delete("session")
  // redirect("/auth/login")
}
