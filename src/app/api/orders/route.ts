import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { orderSchema } from "@/lib/validations"

// GET /api/orders - Get user's orders
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    const skip = (page - 1) * limit

    const where = {
      userId: session.user.id,
      ...(status && { status: status as any }),
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[ORDERS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const json = await req.json()
    const { items } = orderSchema.parse(json)

    // Start transaction
    const order = await prisma.$transaction(async (tx) => {
      // Get cart (optional, if creating order from cart)
      const cart = await tx.cart.findUnique({
        where: { userId: session.user.id },
        include: { items: true },
      })

      // Validate products and calculate total
      const orderItems = []
      let total = 0

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        })

        if (!product) {
          throw new Error(`Product ${item.productId} not found`)
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`)
        }

        // Update product stock
        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: product.stock - item.quantity,
          },
        })

        // Calculate item total
        const itemTotal = product.price.toNumber() * item.quantity
        total += itemTotal

        orderItems.push({
          productId: product.id,
          productName: product.name,
          productImage: product.imageUrl,
          price: product.price,
          quantity: item.quantity,
        })
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId: session.user.id,
          total,
          status: "PENDING",
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      })

      // Clear cart if it exists
      if (cart) {
        await tx.cart.delete({
          where: { id: cart.id },
        })
      }

      return order
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("[ORDERS_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}