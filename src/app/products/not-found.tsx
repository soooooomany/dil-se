import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductsNotFound() {
  return (
    <div className="flex h-[450px] flex-col items-center justify-center gap-4 text-center">
      <Icons.cake className="h-10 w-10" />
      <h2 className="font-heading text-2xl font-bold">No products found</h2>
      <p className="text-muted-foreground">
        We couldn't find any products that match your criteria.
      </p>
      <Button asChild>
        <Link href="/products">View all products</Link>
      </Button>
    </div>
  )
}