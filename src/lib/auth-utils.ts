import { hash, compare } from "bcryptjs"
import { z } from "zod"

// Validation schemas
export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  phoneNumber: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6).max(100),
})

export const verifyEmailSchema = z.object({
  token: z.string(),
})

// Password utilities
export const hashPassword = async (password: string) => {
  return await hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

// Generate OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

// Generate expiry time (30 minutes from now)
export const generateExpiryTime = () => {
  return new Date(Date.now() + 30 * 60 * 1000)
}

// Error handling
export class AuthError extends Error {
  constructor(
    message: string,
    public code: "INVALID_CREDENTIALS" | "USER_NOT_FOUND" | "EMAIL_EXISTS" | "INVALID_TOKEN" | "TOKEN_EXPIRED"
  ) {
    super(message)
    this.name = "AuthError"
  }
}

// HOC for protecting admin routes
import { type Session } from "next-auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { type User } from "@prisma/client"

export function withAdmin<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return async function AdminComponent(props: T) {
    const session = await getServerSession()

    if (!session?.user || (session.user as User).role !== "ADMIN") {
      redirect("/")
    }

    return <WrappedComponent {...props} />
  }
}