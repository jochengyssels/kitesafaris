import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics - KiteSafaris Admin",
  description: "KiteSafaris analytics dashboard",
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="font-montserrat text-4xl font-bold text-deep-navy mb-8">Analytics Dashboard</h1>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="font-open-sans text-gray-600 mb-6">
            Analytics and performance metrics for KiteSafaris operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-sand-beige rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-2">Bookings</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">24</p>
            </div>
            <div className="bg-sand-beige rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-2">Revenue</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">€45,600</p>
            </div>
            <div className="bg-sand-beige rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-deep-navy mb-2">Satisfaction</h3>
              <p className="font-open-sans text-2xl font-bold text-coral-orange">5.0★</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
