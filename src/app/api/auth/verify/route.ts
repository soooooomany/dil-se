import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { verifyEmailSchema, AuthError } from "@/lib/auth-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token } = verifyEmailSchema.parse(body)

    // Find verification record
    const verification = await prisma.verification.findFirst({
      where: {
        id: token,
        scope: 'SIGNUP',
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!verification) {
      throw new AuthError("Invalid or expired token", "TOKEN_EXPIRED")
    }

    // Update user
    await prisma.user.update({
      where: { email: verification.email },
      data: { emailVerified: new Date() },
    })

    // Delete verification
    await prisma.verification.delete({
      where: { id: verification.id },
    })

    return NextResponse.json({
      message: "Email verified successfully",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    console.error("Verification error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}