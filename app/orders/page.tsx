"use client"

import { Header } from "@/components/header"
import { Package } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-10-20",
      total: 89.99,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2024-10-15",
      total: 234.98,
      status: "Shipped",
      items: 3,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground mb-8">You haven't placed any orders yet</p>
            <Link
              href="/"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  <p className="text-muted-foreground text-sm">
                    {order.date} • {order.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  <span
                    className={`text-sm font-semibold ${
                      order.status === "Delivered" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
