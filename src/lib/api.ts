import axios from "axios"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export interface Product {
  id: string
  name: string
  description?: string
  imageUrl?: string
  price: number
  stock: number
  lowStockThreshold?: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  total: number
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
  items: Array<{
    id: string
    productId: string
    productName: string
    productImage?: string
    price: number
    quantity: number
  }>
  createdAt: string
  updatedAt: string
}

// Products API
export const getProducts = async (params?: {
  page?: number
  size?: number
  search?: string
  category?: string
}) => {
  const response = await api.get<{ products: Product[]; total: number }>(
    "/products",
    { params }
  )
  return response.data
}

export const getProduct = async (id: string) => {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}

// Admin Product API
export const createProduct = async (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
  const response = await api.post<Product>("/products", data)
  return response.data
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const response = await api.patch<Product>(`/products/${id}`, data)
  return response.data
}

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`)
}

// Orders API
export const createOrder = async (data: {
  items: Array<{ productId: string; quantity: number }>
}) => {
  const response = await api.post<Order>("/orders", data)
  return response.data
}

export const getOrders = async (params?: {
  page?: number
  size?: number
  userId?: string
}) => {
  const response = await api.get<{ orders: Order[]; total: number }>(
    "/orders",
    { params }
  )
  return response.data
}

export const getOrder = async (id: string) => {
  const response = await api.get<Order>(`/orders/${id}`)
  return response.data
}

export const updateOrderStatus = async (id: string, status: Order["status"]) => {
  const response = await api.patch<Order>(`/orders/${id}`, { status })
  return response.data
}

// Mock image upload
// In production, this should be integrated with S3, Cloudinary, or next/image remote loader
export const uploadImage = async (file: File) => {
  // This is a mock implementation
  return {
    url: URL.createObjectURL(file),
  }
}