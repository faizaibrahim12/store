"use client"

import { CartProvider } from "@/lib/cart-context"
import type { ReactNode } from "react"

export function PageWrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
