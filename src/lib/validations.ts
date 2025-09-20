import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  lowStockThreshold: z.number().int().min(0).optional(),
})

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
})

export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().min(1),
  })),
})

export const userUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  phoneNumber: z.string().optional(),
})