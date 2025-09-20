import Link from "next/link"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
      <Icons.cake className="h-10 w-10" />
      <h2 className="font-heading text-2xl font-bold">Page not found</h2>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Go to home</Link>
      </Button>
    </div>
  )
}