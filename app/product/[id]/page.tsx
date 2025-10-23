"use client"

import { Header } from "@/components/header"
import { mockProducts } from "@/lib/mock-data"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ShoppingCart } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ChevronLeft size={20} />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-muted rounded-lg overflow-hidden h-96 md:h-full">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <h1 className="text-4xl font-bold my-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">{product.description}</p>

              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-2">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-destructive font-semibold">Out of Stock</span>
                  )}
                </p>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold">Quantity:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-muted transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                  added
                    ? "bg-green-500 text-white"
                    : product.stock === 0
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                <ShoppingCart size={20} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
