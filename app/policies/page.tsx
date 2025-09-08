import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Policies - KiteSafaris",
  description: "Comprehensive policies and guidelines for KiteSafaris luxury kiteboarding adventures. Safety protocols, booking terms, cancellation policies, and participant requirements.",
  alternates: {
    canonical: "https://www.kitesafaris.com/policies"
  },
}

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="font-montserrat text-4xl font-bold text-deep-navy mb-8">Policies</h1>
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="font-open-sans text-gray-600 mb-6">
            Our comprehensive policies ensure safe and enjoyable kitesafari experiences.
          </p>
          <div className="space-y-6">
            <div>
              <h2 className="font-montserrat text-xl font-semibold text-deep-navy mb-3">Safety Policy</h2>
              <p className="font-open-sans text-gray-700">
                All participants must follow safety guidelines and use provided safety equipment.
              </p>
            </div>
            <div>
              <h2 className="font-montserrat text-xl font-semibold text-deep-navy mb-3">Booking Policy</h2>
              <p className="font-open-sans text-gray-700">
                Bookings require confirmation and adherence to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
