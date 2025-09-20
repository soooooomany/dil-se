import { Icons } from "@/components/icons"

export function Loader({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Icons.spinner className={className || "h-6 w-6 animate-spin"} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}