import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Management - KiteSafaris Admin",
  description: "KiteSafaris user management system",
}

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="font-montserrat text-4xl font-bold text-deep-navy mb-8">User Management</h1>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="font-open-sans text-gray-600 mb-6">Manage customer accounts, bookings, and user permissions.</p>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-3">Customer Accounts</h3>
              <p className="font-open-sans text-gray-700">View and manage customer profiles and booking history.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-3">Admin Users</h3>
              <p className="font-open-sans text-gray-700">Manage admin access and permissions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
