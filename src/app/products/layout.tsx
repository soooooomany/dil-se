import { Shell } from "@/components/layout/shell"

interface ProductsLayoutProps {
  children: React.ReactNode
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <Shell>{children}</Shell>
}