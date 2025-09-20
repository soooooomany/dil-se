export const CATEGORIES = [
  "BREAD",
  "CAKE", 
  "PASTRY",
  "COOKIE",
  "BEVERAGE"
] as const

export type Category = typeof CATEGORIES[number]

export const PRODUCT_SORT = {
  NAME_ASC: "name:asc",
  NAME_DESC: "name:desc",
  PRICE_ASC: "price:asc", 
  PRICE_DESC: "price:desc",
  DATE_ASC: "createdAt:asc",
  DATE_DESC: "createdAt:desc"
} as const

export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
} as const

export const ITEM_LIMIT = 20