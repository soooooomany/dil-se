import Link from "next/link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const footerLinks = [
  {
    title: "About",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    items: [
      { title: "All Products", href: "/products" },
      { title: "Categories", href: "/categories" },
      { title: "Featured", href: "/products?featured=true" },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "FAQs", href: "/faqs" },
      { title: "Shipping", href: "/shipping" },
      { title: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
      { title: "Cookies", href: "/cookies" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container grid grid-cols-2 gap-12 px-4 py-12 md:grid-cols-4 lg:px-8">
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="text-base font-medium">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 border-t py-10 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="hidden h-6 w-6 md:inline-block" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:text-pink-500"
            )}
          >
            <Icons.instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:text-sky-500"
            )}
          >
            <Icons.twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}