import { type StateCreator } from "zustand"

export type WithPersist<T> = {
  _hasHydrated: boolean
  _persist: {
    rehydrate: () => void
    hasHydrated: () => boolean
  }
} & T

export type StoreApi<T> = {
  setState: (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean
  ) => void
  getState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
  destroy: () => void
}

export type PersistOptions = {
  name: string
  skipHydration?: boolean
  version?: number
  storage?: any
  partialize?: (state: any) => any
  merge?: (persistedState: any, currentState: any) => any
  onRehydrateStorage?: (state: any) => ((state?: any) => any) | void
  migrate?: (persistedState: any, version: number) => any
}

export type StateCreatorWithPersist<T> = StateCreator<
  WithPersist<T>,
  [["zustand/persist", unknown], ["zustand/devtools", never]],
  [],
  T
>

export type ImagePath = {
  src: string
  width: number
  height: number
  alt: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "BREAD" | "CAKE" | "PASTRY" | "COOKIE" | "BEVERAGE"
  featured: boolean
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}