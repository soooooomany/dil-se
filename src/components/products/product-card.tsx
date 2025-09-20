"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/lib/store/cart"
import { type Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { data: session } = useSession()
  const { addItem } = useCartStore()
  const { toast } = useToast()

  function addToCart() {
    // @ts-ignore - addItem supports optional quantity parameter
    addItem(product, 1)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
      >
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="font-heading text-lg font-medium">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
          <p className="font-medium text-primary">{formatPrice(product.price)}</p>
        </div>
      </Link>
    )
  }

  return (
    <div className="group relative rounded-lg border">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          width={500}
          height={500}
          className="aspect-square rounded-t-lg object-cover"
        />
      </Link>
      {product.featured && (
        <span className="absolute left-4 top-4 rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
          Featured
        </span>
      )}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-heading text-lg font-medium">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium text-primary">{formatPrice(product.price)}</p>
          <Button
            size="icon"
            onClick={addToCart}
            disabled={!product.inStock || !session?.user}
            title={
              !session?.user
                ? "Sign in to add to cart"
                : !product.inStock
                ? "Out of stock"
                : "Add to cart"
            }
          >
            <Icons.cart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}