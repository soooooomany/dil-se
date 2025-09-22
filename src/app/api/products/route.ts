import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { productSchema } from "@/lib/validations"
import { AbortError } from "@/lib/errors"

const TIMEOUT = 10000; // 10 seconds

// GET /api/products - Get all products with pagination
export async function GET(req: Request) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")))
    const search = searchParams.get("search") || ""

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          category: true,
          featured: true,
          createdAt: true,
        },
      }),
      prisma.product.count({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    ])

    clearTimeout(timeoutId);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }, { status: 200 })
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    if (error instanceof AbortError) {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    const json = await req.json()
    const body = productSchema.parse(json)

    const product = await prisma.product.create({
      data: body,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("[PRODUCTS_POST]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}