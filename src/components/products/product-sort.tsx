"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PRODUCT_SORT } from "@/lib/constants"

export function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sort = searchParams.get("sort") || PRODUCT_SORT.DATE_DESC

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <Select defaultValue={sort} onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={PRODUCT_SORT.DATE_DESC}>Latest</SelectItem>
          <SelectItem value={PRODUCT_SORT.DATE_ASC}>Oldest</SelectItem>
          <SelectItem value={PRODUCT_SORT.NAME_ASC}>A to Z</SelectItem>
          <SelectItem value={PRODUCT_SORT.NAME_DESC}>Z to A</SelectItem>
          <SelectItem value={PRODUCT_SORT.PRICE_ASC}>
            Price, low to high
          </SelectItem>
          <SelectItem value={PRODUCT_SORT.PRICE_DESC}>
            Price, high to low
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}