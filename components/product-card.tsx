"use client"

import Link from "next/link"
import type { Product } from "@/lib/types"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-muted overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition">{product.name}</h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-lg transition ${
              added ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {product.stock < 5 && product.stock > 0 && (
          <p className="text-xs text-destructive mt-2">Only {product.stock} left!</p>
        )}
        {product.stock === 0 && <p className="text-xs text-destructive mt-2">Out of stock</p>}
      </div>
    </div>
  )
}
