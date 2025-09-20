"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isAdmin = session?.user?.role === "ADMIN"

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Dil Se Bakery</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/products"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/products" || pathname === "/"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Products
        </Link>
        <Link
          href="/categories"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/categories"
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Categories
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/admin" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Admin
          </Link>
        )}
      </nav>
    </div>
  )
}