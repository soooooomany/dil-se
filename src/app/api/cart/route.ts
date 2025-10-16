import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/db"
import { cartItemSchema } from "@/lib/validations"

// GET /api/cart - Get user's cart
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get cart with items and products
    const cart = await db.query(`
      SELECT c.*, 
             json_agg(
               json_build_object(
                 'id', ci.id,
                 'quantity', ci.quantity,
                 'product', json_build_object(
                   'id', p.id,
                   'name', p.name,
                   'price', p.price,
                   'image_url', p.image_url,
                   'description', p.description
                 )
               )
             ) as items
      FROM carts c
      LEFT JOIN cart_items ci ON c.id = ci.cart_id
      LEFT JOIN products p ON ci.product_id = p.id
      WHERE c.user_id = $1
      GROUP BY c.id
    `, [session.user.id])

    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error("[CART_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
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
    const { productId, quantity } = cartItemSchema.parse(json)

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
        include: { items: true },
      })
    }

    // Get product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    )

    if (existingItem) {
      // Update quantity if item exists
      const updatedItem = await prisma.item.update({
        where: { id: existingItem.id },
        data: {
          quantity: quantity,
        },
        include: {
          product: true,
        },
      })

      return NextResponse.json(updatedItem)
    }

    // Create new item if it doesn't exist
    const newItem = await prisma.item.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl,
        price: product.price,
        quantity: quantity,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error("[CART_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await prisma.cart.delete({
      where: { userId: session.user.id },
    })

    return NextResponse.json(
      { message: "Cart cleared successfully" }
    )
  } catch (error) {
    console.error("[CART_DELETE]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}