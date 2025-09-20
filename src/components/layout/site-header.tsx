"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SheetCart } from "@/components/cart/sheet-cart"
import { useCartStore } from "@/lib/store/cart"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const { getCount } = useCartStore()
  const cartCount = getCount()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Icons.sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <SheetCart>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={`${cartCount} items in cart`}
              >
                <Icons.cart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetCart>
            {session?.user ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                className="relative"
              >
                <Icons.user className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
              </Button>
            ) : (
              <Link
                href={`/sign-in?callbackUrl=${pathname}`}
                className={cn(
                  "flex items-center gap-2 text-lg font-medium transition-colors hover:text-foreground/80",
                  pathname === "/sign-in" ? "text-foreground" : "text-foreground/60"
                )}
              >
                <Icons.user className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}