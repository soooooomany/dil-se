import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'BREAD' | 'CAKE' | 'PASTRY' | 'COOKIE' | 'BEVERAGE'
  featured: boolean
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProductStore {
  products: Product[]
  featured: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  filterByCategory: (category: Product['category']) => Product[]
  searchProducts: (query: string) => Product[]
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      featured: [],
      loading: false,
      error: null,

      fetchProducts: async () => {
        try {
          set({ loading: true, error: null })
          const res = await fetch('/api/products')
          const data = await res.json()
          
          set({ 
            products: data,
            featured: data.filter((p: Product) => p.featured),
            loading: false 
          })
        } catch (err) {
          set({ 
            error: err instanceof Error ? err.message : 'Failed to fetch products',
            loading: false 
          })
        }
      },

      filterByCategory: (category) => {
        return get().products.filter(p => p.category === category)
      },

      searchProducts: (query) => {
        const searchTerm = query.toLowerCase()
        return get().products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) || 
          p.description.toLowerCase().includes(searchTerm)
        )
      }
    }),
    {
      name: 'product-store',
      skipHydration: true
    }
  )
)