import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { resetPasswordSchema, hashPassword, AuthError } from "@/lib/auth-utils"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, password } = resetPasswordSchema.parse(body)

    // Find verification record
    const verification = await prisma.verification.findFirst({
      where: {
        id: token,
        scope: 'RESET',
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!verification) {
      throw new AuthError("Invalid or expired token", "TOKEN_EXPIRED")
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password
    await prisma.user.update({
      where: { email: verification.email },
      data: { password: hashedPassword },
    })

    // Delete verification
    await prisma.verification.delete({
      where: { id: verification.id },
    })

    return NextResponse.json({
      message: "Password reset successfully",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}