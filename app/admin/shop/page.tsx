import { ShopAdminDashboard } from "@/components/shop-admin-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Management - KiteSafaris Admin",
  description: "Manage KiteSafaris merchandise store, products, and orders",
  robots: "noindex, nofollow",
}

export default function ShopAdmin() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <ShopAdminDashboard />
      </div>
    </div>
  )
}
