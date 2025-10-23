"use client"

import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"
import { useState } from "react"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", ...new Set(mockProducts.map((p) => p.category))]
  const filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? mockProducts.filter((p) => p.category === selectedCategory)
      : mockProducts

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-lg opacity-90">Discover amazing products at great prices</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={`px-4 py-2 rounded-lg transition ${
                  (category === "All" && !selectedCategory) || selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
