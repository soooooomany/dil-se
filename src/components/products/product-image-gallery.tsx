"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  mainImage: string
  name: string
  className?: string
}

export function ProductImageGallery({
  mainImage,
  name,
  className,
}: ProductImageGalleryProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative aspect-square h-full max-h-[500px] w-full overflow-hidden rounded-lg">
        <Image
          src={mainImage || "/placeholder.png"}
          alt={name}
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}