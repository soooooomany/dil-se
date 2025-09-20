"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store/cart"
import { formatPrice } from "@/lib/utils"

interface SheetCartProps {
  children: React.ReactNode
}

export function SheetCart({ children }: SheetCartProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const cartTotal = getTotal()

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-hidden">
          {items.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b py-4 px-1"
                  >
                    <Link href={`/products/${item.id}`}>
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link href={`/products/${item.id}`}>
                        <span className="line-clamp-1 text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                      <span className="text-sm font-medium text-primary">
                        {formatPrice(item.price)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Icons.minus className="h-3 w-3" />
                          <span className="sr-only">Remove one</span>
                        </Button>
                        <span className="w-4 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Icons.plus className="h-3 w-3" />
                          <span className="sr-only">Add one</span>
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => removeItem(item.id)}
                    >
                      <Icons.trash className="h-3 w-3" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
              <SheetFooter className="px-1">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/checkout">Proceed to checkout</Link>
                  </Button>
                </div>
              </SheetFooter>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <Icons.cart className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Add items to your cart to checkout
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/products">Continue shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}