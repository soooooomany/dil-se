import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { cartItemSchema } from "@/lib/validations"

// PATCH /api/cart/[id] - Update cart item
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const json = await req.json()
    const { quantity } = cartItemSchema.pick({ quantity: true }).parse(json)

    // Verify item belongs to user's cart
    const item = await prisma.item.findFirst({
      where: {
        id: params.id,
        cart: {
          userId: session.user.id,
        },
      },
      include: {
        product: true,
      },
    })

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      )
    }

    // Check stock
    if (item.product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      )
    }

    // Update quantity
    const updatedItem = await prisma.item.update({
      where: { id: params.id },
      data: { quantity },
      include: {
        product: true,
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error("[CART_ITEM_PATCH]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/cart/[id] - Remove item from cart
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Verify item belongs to user's cart
    const item = await prisma.item.findFirst({
      where: {
        id: params.id,
        cart: {
          userId: session.user.id,
        },
      },
    })

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      )
    }

    await prisma.item.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: "Item removed successfully" }
    )
  } catch (error) {
    console.error("[CART_ITEM_DELETE]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}