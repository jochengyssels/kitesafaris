import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import ApiManagementDashboard from "@/components/api-management-dashboard"

export const metadata: Metadata = {
  title: "API Management - KiteSafaris Admin",
  description: "Monitor, test, and manage all integrated API services for KiteSafaris.com",
}

export default function ApiManagementPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-turquoise-50 to-sand-beige-100 pt-20">
        <div className="container mx-auto px-4 py-12">
          <ApiManagementDashboard />
        </div>
      </main>
    </>
  )
}
