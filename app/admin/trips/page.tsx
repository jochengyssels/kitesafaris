import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TripManagementDashboard } from "@/components/trip-management-dashboard"

export const metadata: Metadata = {
  title: "Manage Trips - Admin Dashboard - KiteSafaris.com",
  description: "Manage available trips and bookings for all KiteSafaris destinations",
  robots: "noindex, nofollow",
}

export default function TripsAdminPage() {
  return (
    <div className="min-h-screen bg-sand-beige-50">
      <header className="bg-navy-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-turquoise-400 hover:text-turquoise-300 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="font-montserrat font-bold text-xl">Manage Trips</h1>
                <p className="text-sm text-gray-300">Organize available trips across all destinations</p>
              </div>
            </div>
            <Link href="/" className="text-turquoise-400 hover:text-turquoise-300 transition-colors">
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TripManagementDashboard />
      </main>
    </div>
  )
}
