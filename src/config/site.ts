export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Dil Se Bakery",
  description: "Artisanal baked goods made with love",
  keywords: ["bakery", "cakes", "pastries", "bread", "desserts"],
  url: "https://dilse-bakery.vercel.app",
  links: {
    twitter: "https://twitter.com/dilsebakery",
    instagram: "https://instagram.com/dilsebakery",
  },
  mainNav: [
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Categories",
      href: "/categories",
    },
  ],
  adminNav: [
    {
      title: "Products",
      href: "/admin/products",
    },
    {
      title: "Orders",
      href: "/admin/orders",
    },
    {
      title: "Users",
      href: "/admin/users",
    },
  ],
} as const