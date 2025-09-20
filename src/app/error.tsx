"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
      <Icons.close className="h-10 w-10 text-destructive" />
      <h2 className="font-heading text-2xl font-bold">
        Oops! Something went wrong.
      </h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}