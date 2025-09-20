interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ProductGrid({ children, className }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  )
}