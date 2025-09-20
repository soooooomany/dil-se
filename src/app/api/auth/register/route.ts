import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { registerSchema, hashPassword, generateOTP, generateExpiryTime, AuthError } from "@/lib/auth-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password, phoneNumber } = registerSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new AuthError("Email already exists", "EMAIL_EXISTS")
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        role: 'USER',
      },
    })

    // Create verification token
    const verification = await prisma.verification.create({
      data: {
        email,
        otp: generateOTP(),
        scope: 'SIGNUP',
        expiresAt: generateExpiryTime(),
      },
    })

    // TODO: Send verification email

    return NextResponse.json(
      {
        message: "Registration successful. Please check your email for verification.",
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}