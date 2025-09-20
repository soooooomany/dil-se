import Link from "next/link"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="flex h-[450px] flex-col items-center justify-center gap-4 text-center">
      <Icons.cake className="h-10 w-10" />
      <h2 className="font-heading text-2xl font-bold">Product not found</h2>
      <p className="text-muted-foreground">
        We couldn't find the product you were looking for.
      </p>
      <Button asChild>
        <Link href="/products">Back to products</Link>
      </Button>
    </div>
  )
}