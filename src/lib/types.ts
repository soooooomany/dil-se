export type Product = {
  id: string
  name: string
  description: string | null
  imageUrl: string | null
  price: number
  category: Category
  featured: boolean
  stock: number
  lowStockThreshold: number
  inStock: boolean      // Computed from stock > lowStockThreshold
  createdAt: Date
  updatedAt: Date
}

export type ImagePath = {
  src: string
  width: number
  height: number
  alt: string
}

export type Category = "BREAD" | "CAKE" | "PASTRY" | "COOKIE" | "BEVERAGE"

export type SortField = "name" | "price" | "createdAt"
export type SortOrder = "asc" | "desc"
export type SortOption = `${SortField}:${SortOrder}`