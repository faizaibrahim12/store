"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ShopHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:opacity-80 transition">
            Products
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/orders" className="hover:opacity-80 transition">
            Orders
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-primary/95 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="hover:opacity-80 transition">
            Products
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition">
            <ShoppingCart size={20} />
            <span>Cart ({cartCount})</span>
          </Link>
          <Link href="/orders" className="hover:opacity-80 transition">
            Orders
          </Link>
        </nav>
      )}
    </header>
  )
}
