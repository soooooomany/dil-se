import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/prisma"
import { type Prisma } from '@prisma/client'
import { $Enums } from '@prisma/client'

import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductSort } from "@/components/products/product-sort"
import { type Product as FrontendProduct, type Category, type SortOption } from "@/lib/types"
import { PRODUCT_SORT } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our delicious selection of baked goods",
}

interface ProductsPageProps {
  searchParams: {
    category?: string[]
    sort?: string
    featured?: string
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  noStore()

  // Parse query params
  const { category, sort = PRODUCT_SORT.DATE_DESC, featured } = searchParams
  const categories = category ? (Array.isArray(category) ? category : [category]) : []
  const isFeatured = featured === "true"

  // Build the where clause
  const where = {
    ...(categories.length > 0 && {
      category: {
        in: categories,
      },
    }),
    ...(isFeatured && {
      featured: true,
    }),
  }

  // Build the orderBy clause
  const [field, order] = sort.split(":") as [keyof FrontendProduct, "asc" | "desc"]
  const orderBy = {
    [field]: order,
  }

  // Fetch products
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(categories.length > 0 && {
          category: {
            in: categories as $Enums.Category[]
          }
        }),
        ...(isFeatured && {
          featured: true
        })
      },
      orderBy: [
        {
          [field]: order.toLowerCase() as Prisma.SortOrder
        }
      ],
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        category: true,
        featured: true,
        stock: true,
        lowStockThreshold: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (products.length === 0) {
      notFound()
    }

    // Transform products to match our frontend type
    const transformedProducts: FrontendProduct[] = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: Number(product.price),
      category: product.category,
      featured: product.featured,
      inStock: product.stock > product.lowStockThreshold,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }))

    return (
      <div className="space-y-8 pb-10">
        <div className="grid gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="font-heading text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Browse our delicious selection of baked goods
            </p>
          </div>
          <div className="flex flex-col gap-8 md:flex-row">
            <aside className="md:w-64">
              <ProductFilters />
            </aside>
            <div className="flex-1 space-y-6">
              <ProductSort />
              <ProductGrid>
                {transformedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}