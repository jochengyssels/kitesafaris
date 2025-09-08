import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { BookingForm } from "@/components/booking-form"
import { FloatingActionButtons } from "@/components/floating-action-buttons"
import { PolicySection } from "@/components/policy-section"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Book Kite Safari | Luxury Kitesurfing Vacation | KiteSafaris.com",
  description: "Book your luxury kitesurfing vacation today! Secure your spot on our premium kite safari adventures with instant confirmation & transparent pricing.",
  alternates: {
    canonical: "https://www.kitesafaris.com/booking"
  },
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-sand-beige">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <BreadcrumbNavigation items={[{ label: "Booking" }]} />
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-deep-navy font-montserrat mb-4">Book Your Safari</h1>
              <p className="text-lg text-deep-navy/80 font-open-sans max-w-2xl mx-auto">
                Complete your booking in just a few steps. Get instant confirmation and transparent pricing. 
                Explore our <Link href="/destinations" className="text-coral-orange hover:text-orange-500 font-semibold">kite safari destinations</Link> and 
                <Link href="/packages" className="text-coral-orange hover:text-orange-500 font-semibold"> luxury packages</Link>.
              </p>
            </div>
            <BookingForm />
            <PolicySection />
          </div>
        </div>
      </main>
      <FloatingActionButtons />
    
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KiteSafaris",
        "description": "Luxury Caribbean kite safari adventures",
        "url": "https://kitesafaris.com",
        "logo": "https://kitesafaris.com/logo.png"
      })
    }}
  />
</div>
  )
}
