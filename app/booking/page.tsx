import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { BookingForm } from "@/components/booking-form"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { PolicySection } from "@/components/policy-section"

export const metadata: Metadata = {
  title: "Book Your Safari | KiteSafaris.com",
  description: "Book your unforgettable kiteboarding safari with transparent pricing and instant confirmation.",
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-sand-beige">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-4">Book Your Safari</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans max-w-2xl mx-auto">
                Complete your booking in just a few steps. Get instant confirmation and transparent pricing.
              </p>
            </div>
            <BookingForm />
            <PolicySection />
          </div>
        </div>
      </main>
      <FloatingActionButtons />
    </div>
  )
}
